package ict.mahidol.gemini.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ict.mahidol.gemini.model.DataProcessingRequirement;
import ict.mahidol.gemini.model.SciencePlan;
import ict.mahidol.gemini.model.User;
import ict.mahidol.gemini.model.dto.SciencePlanDto;
import ict.mahidol.gemini.repository.SciencePlanRepository;
import ict.mahidol.gemini.repository.UserRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
@RequestMapping("/api/v1/scienceplan")
public class SciencePlanController {

    @Autowired
    private SciencePlanRepository sciencePlanRepository;
    @Autowired
    private UserRepository userRepository;

    @CrossOrigin
    @PostMapping("/create")
    public @ResponseBody
    ResponseEntity<Map<String, String>> createSciencePlan(
            @RequestBody SciencePlanDto sciencePlan, HttpServletRequest request) {

        // Handle missing authorization header
        if (request.getHeader("Authorization") == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "There's no authorization header attached"));
        }

        // Accessing JWT-authenticated user info
        Claims claims = (Claims) request.getAttribute("claims");
        String username = claims.get("username", String.class);
        String role = claims.get("role", String.class);

        // Handle unauthorized access
        if (!role.equals("astronomer")) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

        String planName = sciencePlan.getPlanName();
        Double funding = sciencePlan.getFunding();
        String objective = sciencePlan.getObjective();
        String starSystem = sciencePlan.getStarSystem();
        Date startDate = sciencePlan.getStartDate();
        Date endDate = sciencePlan.getEndDate();
        String telescopeLocation = sciencePlan.getTelescopeLocation();
        DataProcessingRequirement dataProcessingRequirement = sciencePlan.getDataProcessingReq();

        // Handle missing fields
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

    @CrossOrigin
    @PutMapping("/test")
    public @ResponseBody
    ResponseEntity<Map<String, String>> testSciencePlan(
            HttpServletRequest request,
            @RequestParam("planId") Integer planId
    ) {
        Claims claims = (Claims) request.getAttribute("claims");
        String role = claims.get("role", String.class);
        if (role.equals("scienceObserver")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Access denied"));
        }
        if (planId == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Missing/Invalid parameters"));
        }
        // Science plan not found temp
        if (false) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "No science plan record with id: " + planId + " found"));
        }
        // scienceplan found
        return ResponseEntity.ok(Map.of("message", "successfully tested science plan"));

    }

    @CrossOrigin
    @PutMapping("/submit")
    public ResponseEntity<Map<String, String>> submitSciencePlan(@RequestParam Integer planId,
            HttpServletRequest request) {        
        
        if(planId == null) return ResponseEntity.badRequest().body(Map.of("message", "Missing/Invalid parameters"));

        // Accessing JWT-authenticated user info
        Claims claims = (Claims) request.getAttribute("claims");
        String username = claims.get("username", String.class);
        String role = claims.get("role", String.class);

        // Handle unauthorized access
        if (!role.equals("astronomer")) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

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

        // Update the science plan status and submitter
        sciencePlan.get().setPlanStatus("submitted");
        sciencePlan.get().setSubmitter(submitter);

        // Save the updated science plan to the database
        sciencePlanRepository.save(sciencePlan.get());

        return ResponseEntity.ok(Map.of("message", "Suceessfully submitted science plan."));
    }

    @CrossOrigin
    @DeleteMapping("/delete")
    public @ResponseBody ResponseEntity<Map<String, String>> deleteSciencePlanById(
            @RequestParam(value = "planId", required = false) Integer planId,
            HttpServletRequest request) {
                
        if (planId == null) {
            return new ResponseEntity<>(Map.of("message", "Missing required parameter"), HttpStatus.BAD_REQUEST);
        }
        
        Claims claims = (Claims) request.getAttribute("claims");
        if (claims == null) {
            // This case should ideally be handled by the middleware sending a 400/401, but added as a safeguard.
            return new ResponseEntity<>(Map.of("message", "Authorization token is missing or invalid"), HttpStatus.UNAUTHORIZED);
        }

        String role = claims.get("role", String.class);
        if (role == null || !role.equals("astronomer")) {
            return new ResponseEntity<>(Map.of("message", "Access denied"), HttpStatus.FORBIDDEN);
        }

        Optional<SciencePlan> planOptional = sciencePlanRepository.findById(planId);
        if (planOptional.isPresent()) {
            sciencePlanRepository.deleteById(planId);
            return new ResponseEntity<>(Map.of("message", "Successfully deleted science plan"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Map.of("message", "No science plan record with id: " + planId + " found"), HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin
    @GetMapping("/list")
    public @ResponseBody ResponseEntity<List<Map<String, Object>>> getSciencePlanList(@RequestParam(value = "status", required = false) String status,
    HttpServletRequest request) {
        List<Map<String, Object>> planList = new ArrayList<>();

        if(status == null || "".equals(status))
        {
            Iterable<SciencePlan> plans = sciencePlanRepository.findAll();

            if (!plans.iterator().hasNext()) {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
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
        else
        {
            List<SciencePlan> plans = sciencePlanRepository.findByPlanStatus(status);

            if (plans.isEmpty()) {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
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
    }
    @PutMapping("/test")
    public @ResponseBody
    ResponseEntity<Map<String, String>> testEndpoint(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam("planId") String planId) {
        if (authHeader == null) {
            return new ResponseEntity<>(Map.of("error", "Authorization header is missing"), HttpStatus.UNAUTHORIZED);
        }
        if(planId == null || planId.isEmpty()) {
            return new ResponseEntity<>(Map.of("error", "Missing/Invalid parameters"), HttpStatus.BAD_REQUEST);
        }
        SciencePlan sciencePlan = SciencePlanRepository.find
        return new ResponseEntity<>(Map.of("message", "Successfully tested science plan"), HttpStatus.OK);
    }
}