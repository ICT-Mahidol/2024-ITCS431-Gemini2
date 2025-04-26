package ict.mahidol.gemini.controller;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
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

        // Accessing JWT-authenticated user info
        Claims claims = (Claims) request.getAttribute("claims");
        String username = claims.get("username", String.class);
        String role = claims.get("role", String.class);
        // return ResponseEntity.ok(Map.of("message", "Found user: " + username + " with
        // role: " + role));

        // Handle missing authorization header
        if (request.getHeader("Authorization") == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Missing authorization header"));
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
        if (planName == null || funding == null || objective == null || starSystem == null || startDate == null
                || endDate == null || telescopeLocation == null || dataProcessingRequirement == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Missing required parameter"));
        }

        // Handle unauthorized access
        if (!role.equals("astronomer")) {
            return ResponseEntity.badRequest().body(Map.of("message", "Access denied"));
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
}
