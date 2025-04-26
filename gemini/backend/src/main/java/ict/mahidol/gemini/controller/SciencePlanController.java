package ict.mahidol.gemini.controller;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ict.mahidol.gemini.model.DataProcessingRequirement;
import ict.mahidol.gemini.model.SciencePlan;
import ict.mahidol.gemini.model.User;
import ict.mahidol.gemini.model.dto.SciencePlanDto;
import ict.mahidol.gemini.repository.SciencePlanRepository;
import ict.mahidol.gemini.repository.UserRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/api/v1/scienceplan")
public class SciencePlanController {
    @Autowired
    private SciencePlanRepository sciencePlanRepository;
    @Autowired
    private UserRepository userRepository;

    @CrossOrigin
    @PostMapping("/create")
    public @ResponseBody ResponseEntity<Map<String, String>> createSciencePlan(
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
                telescopeLocation, "pending", dataProcessingRequirement);

        // Save the new science plan to the database
        sciencePlanRepository.save(newSciencePlan);

        return ResponseEntity.ok(Map.of("message", "Science plan created successfully"));
    }

    @CrossOrigin
    @PutMapping("/submit")
    public ResponseEntity<Map<String, String>> invalidSubmission1() {
        return ResponseEntity.badRequest().body(Map.of("message", "Missing/Invalid parameters"));
    }

    @CrossOrigin
    @PutMapping("/submit/")
    public ResponseEntity<Map<String, String>> invalidSubmission2() {
        return ResponseEntity.badRequest().body(Map.of("message", "Missing/Invalid parameters"));
    }

    @CrossOrigin
    @PutMapping("/submit/{planId}")
    public ResponseEntity<Map<String, String>> submitSciencePlan(@PathVariable int planId,
            HttpServletRequest request) {

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
}
