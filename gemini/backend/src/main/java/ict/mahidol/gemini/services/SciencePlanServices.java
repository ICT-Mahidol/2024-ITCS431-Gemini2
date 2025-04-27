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

import edu.gemini.app.ocs.OCS;
import edu.gemini.app.ocs.model.DataProcRequirement;
import edu.gemini.app.ocs.model.SciencePlan;
import edu.gemini.app.ocs.model.StarSystem;
import ict.mahidol.gemini.model.User;
import ict.mahidol.gemini.model.dto.DataProcessingRequirementDto;
import ict.mahidol.gemini.model.dto.SciencePlanDto;
import ict.mahidol.gemini.repository.UserRepository;

@Service
public class SciencePlanServices {

    @Autowired
    private UserRepository userRepository;
    
    public @ResponseBody ResponseEntity<Map<String, String>> CreateSciencePlan(String username, String role, SciencePlanDto sciencePlan)
    {
        OCS ocs = new OCS();
        Double funding = sciencePlan.getFunding();
        String objective = sciencePlan.getObjective();
        String starSystem = sciencePlan.getStarSystem();
        Date startDate = sciencePlan.getStartDate();
        Date endDate = sciencePlan.getEndDate();
        String telescopeLocation = sciencePlan.getTelescopeLocation();

        DataProcessingRequirementDto dataProcessingRequirement = sciencePlan.getDataProcessingReq();
        String fileType = dataProcessingRequirement.getFileType();
        String fileQuality = dataProcessingRequirement.getFileQuality();
        String colorType = dataProcessingRequirement.getColorType();
        double contrast = dataProcessingRequirement.getContrast();
        double brightness = dataProcessingRequirement.getBrightness();
        double highlight = dataProcessingRequirement.getHighlight();
        double exposure = dataProcessingRequirement.getExposure();
        double whites = dataProcessingRequirement.getWhites();
        double blacks = dataProcessingRequirement.getBlacks();
        double luminance = dataProcessingRequirement.getLuminance();
        double hue = dataProcessingRequirement.getHue();

        if (!role.equals("astronomer")) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

        if (funding == null || funding == -1 || objective == null || starSystem == null
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
        SciencePlan newSciencePlan = new SciencePlan(creator, submitter, funding, objective, StarSystem.CONSTELLATIONS.valueOf(starSystem), 
        startDate, endDate, SciencePlan.TELESCOPELOC.valueOf(telescopeLocation), 
        new DataProcRequirement(fileType, fileQuality, colorType, contrast, brightness, brightness, highlight, exposure, exposure, whites, blacks, luminance, hue));

        String response = ocs.createSciencePlan(newSciencePlan);

        return ResponseEntity.ok(Map.of("message", response));
    }

    public @ResponseBody ResponseEntity<Map<String, String>> TestSciencePlan(String role, Integer planId)
    {
        OCS ocs = new OCS();
        if (!role.equals("astronomer")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Access denied"));
        }

        if (planId == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Missing/Invalid parameters"));
        }

        SciencePlan sciencePlan = ocs.getSciencePlanByNo(planId);

        // Handle science plan not found
        if (sciencePlan == null) {
            return ResponseEntity.status(404)
                    .body(Map.of("message", "No science plan record with id: " + planId + " found"));
        }

        if(!SciencePlan.STATUS.SAVED.equals(sciencePlan.getStatus())) return ResponseEntity.badRequest().body(Map.of("message", "This Science Plan is already tested"));

        String response = ocs.testSciencePlan(sciencePlan);
        boolean updateResult = ocs.updateSciencePlanStatus(planId, SciencePlan.STATUS.TESTED);

        return updateResult ? ResponseEntity.ok(Map.of("message", response)) : ResponseEntity.badRequest().body(Map.of("message", response));
    }

    public ResponseEntity<Map<String, String>> SubmitSciencePlan(String username, String role, Integer planId)
    {
        OCS ocs = new OCS();
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
        SciencePlan sciencePlan = ocs.getSciencePlanByNo(planId);

        // Handle science plan not found
        if (sciencePlan == null) {
            return ResponseEntity.status(404)
                    .body(Map.of("message", "No science plan record with id: " + planId + " found"));
        }

        if(!SciencePlan.STATUS.TESTED.equals(sciencePlan.getStatus())) return ResponseEntity.badRequest().body(Map.of("message", "Unable to submit untested science plan/This plan is already submitted"));

        sciencePlan.setSubmitter(submitter);
        String response = ocs.submitSciencePlan(sciencePlan);

        return ResponseEntity.ok(Map.of("message", response));
    }

    public @ResponseBody ResponseEntity<Map<String, String>> ValidateSciencePlan(String role, Integer planId)
    {
        OCS ocs = new OCS();
        if (!role.equals("scienceObserver")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Access denied"));
        }

        if (planId == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Missing/Invalid parameters"));
        }

        SciencePlan sciencePlan = ocs.getSciencePlanByNo(planId);

        // Handle science plan not found
        if (sciencePlan == null) {
            return ResponseEntity.status(404)
                    .body(Map.of("message", "No science plan record with id: " + planId + " found"));
        }

        // Validate logics
        if(!SciencePlan.STATUS.SUBMITTED.equals(sciencePlan.getStatus())) return ResponseEntity.badRequest().body(Map.of("message", "Science Plan must be submitted before validation"));
        
        boolean updateResult = ocs.updateSciencePlanStatus(planId, SciencePlan.STATUS.VALIDATED);

        return updateResult ? ResponseEntity.ok(Map.of("message", "successfully validated science plan")) : ResponseEntity.badRequest().body(Map.of("message", "Invalid Science Plan"));
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

        if(!"TESTED".equals(sciencePlan.get().getPlanStatus())) return ResponseEntity.badRequest().body(Map.of("message", "Unable to validate untested Science Plan/This plan is already validated"));

        sciencePlan.get().setPlanStatus("VALIDATED");
        sciencePlanRepository.save(sciencePlan.get());

        return ResponseEntity.ok(Map.of("message", "successfully tested science plan"));
    }

    public @ResponseBody ResponseEntity<Map<String, String>> DeleteSciencePlan(String role, Integer planId)
    {
        OCS ocs = new OCS();
        if (role == null || !role.equals("astronomer")) {
            return new ResponseEntity<>(Map.of("message", "Access denied"), HttpStatus.FORBIDDEN);
        }

        if (planId == null) {
            return new ResponseEntity<>(Map.of("message", "Missing required parameter"), HttpStatus.BAD_REQUEST);
        }

        SciencePlan sciencePlan = ocs.getSciencePlanByNo(planId);
        if (sciencePlan != null) {
            boolean deleteResult = ocs.deleteSciencePlanByNo(planId);
            return deleteResult ? new ResponseEntity<>(Map.of("message", "Successfully deleted science plan"), HttpStatus.OK):
            ResponseEntity.badRequest().body(Map.of("message", "Unable to delete science plan"));
        } else {
            return new ResponseEntity<>(Map.of("message", "No science plan record with id: " + planId + " found"), HttpStatus.NOT_FOUND);
        }
    }

    public @ResponseBody ResponseEntity<?> GetSciencePlanList()
    {
        OCS ocs = new OCS();
        List<Map<String, Object>> planList = new ArrayList<>();

        List<SciencePlan> plans = ocs.getAllSciencePlans();

        if (plans.isEmpty()) {
            return new ResponseEntity<>(Map.of("message", "No science plan record(s) found"), HttpStatus.NOT_FOUND);
        }
        else {
            for (SciencePlan plan : plans) {
                Map<String, Object> planMap = new HashMap<>();
                planMap.put("planId", plan.getPlanNo());
                planMap.put("planStatus", plan.getStatus());
                planList.add(planMap);
            }
            return ResponseEntity.ok(planList);
        }
    }

    public @ResponseBody ResponseEntity<?> GetSciencePlanListByStatus(String status)
    {
        OCS ocs = new OCS();
        List<Map<String, Object>> planList = new ArrayList<>();

        List<SciencePlan> plans = ocs.getAllSciencePlans();

        if (plans.isEmpty()) {
            return new ResponseEntity<>(Map.of("message", "No science plan record(s) found"), HttpStatus.NOT_FOUND);
        } else {
            // Build a simple map from your results
            for (SciencePlan plan : plans) {
                if(SciencePlan.STATUS.valueOf(status).equals(plan.getStatus()))
                {
                    Map<String, Object> planMap = new HashMap<>();
                    planMap.put("planId", plan.getPlanNo());
                    planMap.put("planStatus", plan.getStatus());
                    planList.add(planMap);
                }
            }
            return ResponseEntity.ok(planList);
        }
    }

    public @ResponseBody ResponseEntity<?> GetSciencePlanDetail(Integer planId)
    {
        OCS ocs = new OCS();
        if (planId == null) {
            return new ResponseEntity<>(Map.of("message", "Missing required parameter"), HttpStatus.BAD_REQUEST);
        }

        SciencePlan sciencePlan = ocs.getSciencePlanByNo(planId);

        if(sciencePlan == null) return ResponseEntity.status(404).body(Map.of("message", "No science plan record with id: " + planId + " found"));

        return ResponseEntity.ok(sciencePlan);
    }
}
