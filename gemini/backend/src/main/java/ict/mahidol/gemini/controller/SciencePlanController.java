package ict.mahidol.gemini.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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

import ict.mahidol.gemini.model.dto.SciencePlanDto;
import ict.mahidol.gemini.services.SciencePlanServices;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;



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
    public @ResponseBody ResponseEntity<Map<String, String>> testSciencePlan(
        HttpServletRequest request,
        @RequestParam("planId") int planId
    ) {
        String authHeader = request.getHeader("Authorization");
        Claims claims = (Claims) request.getAttribute("claims");
        String role = claims.get("role", String.class);
        if(authHeader == null){
            return ResponseEntity.badRequest().body(Map.of("message","There's no authorization header attached"));
        }
        if(role.equals("scienceObserver")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message","Access denied"));
        }
        // Science plan not found temp
        if(false){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message","No science plan record with id: " + planId + " found"));
        }
        //sciene plan found temp
        if(false){
            //update science plan to tested or idk
            return ResponseEntity.ok(Map.of("message","successfully tested science plan"));
        }
        return ResponseEntity.badRequest().body(Map.of("message", "Missing/Invalid parameters"));
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
    @PutMapping("/test")
    public @ResponseBody
    ResponseEntity<Map<String, String>> testSciencePlan(@RequestParam(value = "planId", required = false) Integer planId, HttpServletRequest request) 
    {
        Claims claims = (Claims) request.getAttribute("claims");
        String role = claims.get("role", String.class);
        
        return sciencePlanServices.TestSciencePlan(role, planId);
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
    public @ResponseBody ResponseEntity<List<Map<String, Object>>> getSciencePlanList(@RequestParam(value = "status", required = false) String status,
    HttpServletRequest request) {
        if(status == null || "".equals(status)) return sciencePlanServices.GetSciencePlanList();
        else return sciencePlanServices.GetSciencePlanListByStatus(status);
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