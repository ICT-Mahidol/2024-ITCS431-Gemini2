package ict.mahidol.gemini.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ict.mahidol.gemini.model.dto.SciencePlanDto;
import ict.mahidol.gemini.services.SciencePlanServices;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;


@Controller
@RequestMapping("/api/v1/scienceplan")
public class SciencePlanController {

    @Autowired
    private SciencePlanServices sciencePlanServices;

    @CrossOrigin
    @PostMapping("/create")
    public @ResponseBody
    ResponseEntity<Map<String, String>> createSciencePlan(
            @RequestBody SciencePlanDto sciencePlan, HttpServletRequest request) {

        // Accessing JWT-authenticated user info
        Claims claims = (Claims) request.getAttribute("claims");
        String username = claims.get("username", String.class);
        String role = claims.get("role", String.class);

        return sciencePlanServices.CreateSciencePlan(username, role, sciencePlan);
    }

    @CrossOrigin
    @PutMapping("/test")
    public @ResponseBody
    ResponseEntity<Map<String, String>> testSciencePlan(@RequestParam(value = "planId", required = false) Integer planId, HttpServletRequest request) 
    {
        Claims claims = (Claims) request.getAttribute("claims");
        String role = claims.get("role", String.class);
        
        return sciencePlanServices.TestSciencePlan(role, planId);
    }

    @CrossOrigin
    @PutMapping("/submit")
    public ResponseEntity<Map<String, String>> submitSciencePlan(@RequestParam(value = "planId", required = false) Integer planId,
            HttpServletRequest request) {        

        // Accessing JWT-authenticated user info
        Claims claims = (Claims) request.getAttribute("claims");
        String username = claims.get("username", String.class);
        String role = claims.get("role", String.class);

        return sciencePlanServices.SubmitSciencePlan(username, role, planId);
    }

    @CrossOrigin
    @PutMapping("/validate")
    public @ResponseBody
    ResponseEntity<Map<String, String>> validateSciencePlan(@RequestParam(value = "planId", required = false) Integer planId, HttpServletRequest request) 
    {
        Claims claims = (Claims) request.getAttribute("claims");
        String role = claims.get("role", String.class);
        
        return sciencePlanServices.ValidateSciencePlan(role, planId);
    }

    @CrossOrigin
    @PutMapping("/validate")
    public @ResponseBody
    ResponseEntity<Map<String, String>> validateSciencePlan(@RequestParam(value = "planId", required = false) Integer planId, HttpServletRequest request) 
    {
        Claims claims = (Claims) request.getAttribute("claims");
        String role = claims.get("role", String.class);
        
        return sciencePlanServices.ValidateSciencePlan(role, planId);
    }

    @CrossOrigin
    @DeleteMapping("/delete")
    public @ResponseBody ResponseEntity<Map<String, String>> deleteSciencePlan(
            @RequestParam(value = "planId", required = false) Integer planId,
            HttpServletRequest request) {
        
        Claims claims = (Claims) request.getAttribute("claims");
        String role = claims.get("role", String.class);

        return sciencePlanServices.DeleteSciencePlan(role, planId);
    }

    @CrossOrigin
    @GetMapping("/list")
    public @ResponseBody ResponseEntity<?> getSciencePlanList(@RequestParam(value = "status", required = false) String status,
    HttpServletRequest request) {
        if(status == null || "".equals(status)) return sciencePlanServices.GetSciencePlanList();
        else return sciencePlanServices.GetSciencePlanListByStatus(status);
    }

    @CrossOrigin
    @GetMapping("")
    public @ResponseBody ResponseEntity<?> getSciencePlan(@RequestParam(value = "planId", required = false) Integer planId,
    HttpServletRequest request) {
        return sciencePlanServices.GetSciencePlanDetail(planId);
    }
}