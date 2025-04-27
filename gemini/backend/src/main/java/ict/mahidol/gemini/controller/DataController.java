package ict.mahidol.gemini.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.gemini.app.ocs.model.StarSystem;
import edu.gemini.app.ocs.model.SciencePlan;

@Controller
@RequestMapping("/api/v1/data")
public class DataController {

    @CrossOrigin
    @GetMapping("/starsystem")
    public @ResponseBody ResponseEntity<?> getStarSystem() {
        return new ResponseEntity<>(StarSystem.CONSTELLATIONS.values(), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/telescopelocation")
    public @ResponseBody ResponseEntity<?> getTelescopeLocation() {
        return new ResponseEntity<>(SciencePlan.TELESCOPELOC.values(), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/scienceplanstatus")
    public @ResponseBody ResponseEntity<?> getSciencePlanStatus() {
        return new ResponseEntity<>(SciencePlan.STATUS.values(), HttpStatus.OK);
    }
}
