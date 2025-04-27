package ict.mahidol.gemini.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import ict.mahidol.gemini.model.DataProcessingRequirement;
import ict.mahidol.gemini.model.SciencePlan;
import ict.mahidol.gemini.model.User;
import ict.mahidol.gemini.model.dto.SciencePlanDto;
import ict.mahidol.gemini.repository.SciencePlanRepository;
import ict.mahidol.gemini.repository.UserRepository;

@Service
public class SciencePlanServices {

    @Autowired
    private SciencePlanRepository sciencePlanRepository;
    @Autowired
    private UserRepository userRepository;
    
    public @ResponseBody ResponseEntity<Map<String, String>> CreateSciencePlan(String username, String role, SciencePlanDto sciencePlan)
    {
        String planName = sciencePlan.getPlanName();
        Double funding = sciencePlan.getFunding();
        String objective = sciencePlan.getObjective();
        String starSystem = sciencePlan.getStarSystem();
        Date startDate = sciencePlan.getStartDate();
        Date endDate = sciencePlan.getEndDate();
        String telescopeLocation = sciencePlan.getTelescopeLocation();
        DataProcessingRequirement dataProcessingRequirement = sciencePlan.getDataProcessingReq();

        if (!role.equals("astronomer")) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

        if (planName == null || funding == null || funding == -1 || objective == null || starSystem == null
                || startDate == null
                || endDate == null || telescopeLocation == null || dataProcessingRequirement == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Missing/Invalid parameters"));
        }

        // Fetch the first and last name using the username
        Optional<User> user = userRepository.findByUsername(username);
        String firstName = user.get().getFirstName();
        String lastName = user.get().getLastName();
        String creator = firstName + " " + lastName;
        String submitter = "";

        // Create a new SciencePlan object
        SciencePlan newSciencePlan = new SciencePlan(
                planName, creator, submitter, funding, objective, starSystem, startDate, endDate,
                telescopeLocation, "SAVED", dataProcessingRequirement);

        // Save the new science plan to the database
        sciencePlanRepository.save(newSciencePlan);

        return ResponseEntity.ok(Map.of("message", "Science plan created successfully"));
    }

    public @ResponseBody ResponseEntity<Map<String, String>> TestSciencePlan(String role, Integer planId)
    {
        if (!role.equals("astronomer")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Access denied"));
        }

        if (planId == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Missing/Invalid parameters"));
        }

        Optional<SciencePlan> sciencePlan = sciencePlanRepository.findById(planId);

        if (!sciencePlan.isPresent()) {
            return ResponseEntity.status(404)
                    .body(Map.of("message", "No science plan record with id: " + planId + " found"));
        }

        if(!"SAVED".equals(sciencePlan.get().getPlanStatus())) return ResponseEntity.badRequest().body(Map.of("message", "This plan is already tested"));

        sciencePlan.get().setPlanStatus("TESTED");
        sciencePlanRepository.save(sciencePlan.get());

        return ResponseEntity.ok(Map.of("message", "successfully tested science plan"));
    }

    public ResponseEntity<Map<String, String>> SubmitSciencePlan(String username, String role, Integer planId)
    {
        // Handle unauthorized access
        if (!role.equals("astronomer")) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

        if(planId == null) return ResponseEntity.badRequest().body(Map.of("message", "Missing/Invalid parameters"));

        // Fetch the first and last name using the username
        Optional<User> user = userRepository.findByUsername(username);
        String firstName = user.get().getFirstName();
        String lastName = user.get().getLastName();
        String submitter = firstName + " " + lastName;

        // Find the science plan by ID
        Optional<SciencePlan> sciencePlan = sciencePlanRepository.findById(planId);

        // Handle science plan not found
        if (!sciencePlan.isPresent()) {
            return ResponseEntity.status(404)
                    .body(Map.of("message", "No science plan record with id: " + planId + " found"));
        }

        if(!"TESTED".equals(sciencePlan.get().getPlanStatus())) return ResponseEntity.badRequest().body(Map.of("message", "Unable to submit untested Science Plan/This plan is already submitted"));

        // Update the science plan status and submitter
        sciencePlan.get().setPlanStatus("SUBMITTED");
        sciencePlan.get().setSubmitter(submitter);

        // Save the updated science plan to the database
        sciencePlanRepository.save(sciencePlan.get());

        return ResponseEntity.ok(Map.of("message", "Suceessfully submitted science plan."));
    }

    public @ResponseBody ResponseEntity<Map<String, String>> ValidateSciencePlan(String role, Integer planId)
    {
        if (!role.equals("scienceObserver")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Access denied"));
        }

        if (planId == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Missing/Invalid parameters"));
        }

        Optional<SciencePlan> sciencePlan = sciencePlanRepository.findById(planId);

        if (!sciencePlan.isPresent()) {
            return ResponseEntity.status(404)
                    .body(Map.of("message", "No science plan record with id: " + planId + " found"));
        }

        if(!"SUBMITTED".equals(sciencePlan.get().getPlanStatus())) return ResponseEntity.badRequest().body(Map.of("message", "Unable to validate unsubmitted Science Plan/This plan is already validated"));

        sciencePlan.get().setPlanStatus("VALIDATED");
        sciencePlanRepository.save(sciencePlan.get());

        return ResponseEntity.ok(Map.of("message", "successfully tested science plan"));
    }

    public @ResponseBody ResponseEntity<Map<String, String>> DeleteSciencePlan(String role, Integer planId)
    {
        if (role == null || !role.equals("astronomer")) {
            return new ResponseEntity<>(Map.of("message", "Access denied"), HttpStatus.FORBIDDEN);
        }

        if (planId == null) {
            return new ResponseEntity<>(Map.of("message", "Missing required parameter"), HttpStatus.BAD_REQUEST);
        }

        Optional<SciencePlan> planOptional = sciencePlanRepository.findById(planId);
        if (planOptional.isPresent()) {
            sciencePlanRepository.deleteById(planId);
            return new ResponseEntity<>(Map.of("message", "Successfully deleted science plan"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Map.of("message", "No science plan record with id: " + planId + " found"), HttpStatus.NOT_FOUND);
        }
    }

    public @ResponseBody ResponseEntity<?> GetSciencePlanList()
    {
        List<Map<String, Object>> planList = new ArrayList<>();

        Iterable<SciencePlan> plans = sciencePlanRepository.findAll();

        if (!plans.iterator().hasNext()) {
            return new ResponseEntity<>(Map.of("message", "No science plan record(s) found"), HttpStatus.NOT_FOUND);
        }
        else {
            for (SciencePlan plan : plans) {
                Map<String, Object> planMap = new HashMap<>();
                planMap.put("planId", plan.getPlanId());
                planMap.put("planName", plan.getPlanName());
                planMap.put("planStatus", plan.getPlanStatus());
                planList.add(planMap);
            }
            return ResponseEntity.ok(planList);
        }
    }

    public @ResponseBody ResponseEntity<?> GetSciencePlanListByStatus(String status)
    {
        List<Map<String, Object>> planList = new ArrayList<>();

        List<SciencePlan> plans = sciencePlanRepository.findByPlanStatus(status);

        if (plans.isEmpty()) {
            return new ResponseEntity<>(Map.of("message", "No science plan record(s) found"), HttpStatus.NOT_FOUND);
        } else {
            // Build a simple map from your results
            for (SciencePlan plan : plans) {
                Map<String, Object> planMap = new HashMap<>();
                planMap.put("planId", plan.getPlanId());
                planMap.put("planName", plan.getPlanName());
                planMap.put("planStatus", plan.getPlanStatus());
                planList.add(planMap);
            }
            return ResponseEntity.ok(planList);
        }
    }

    public @ResponseBody ResponseEntity<?> GetSciencePlanDetail(Integer planId)
    {
        if (planId == null) {
            return new ResponseEntity<>(Map.of("message", "Missing required parameter"), HttpStatus.BAD_REQUEST);
        }

        Optional<SciencePlan> sciencePlan = sciencePlanRepository.findById(planId);

        if(!sciencePlan.isPresent()) return ResponseEntity.status(404).body(Map.of("message", "No science plan record with id: " + planId + " found"));

        return ResponseEntity.ok(sciencePlan.get());
    }
}
