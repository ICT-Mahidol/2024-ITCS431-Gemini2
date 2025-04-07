package ict.mahidol.gemini.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ict.mahidol.gemini.model.Astronomer;
import ict.mahidol.gemini.model.AuthRequestDto;
import ict.mahidol.gemini.model.ScienceObserver;
import ict.mahidol.gemini.model.UserDto;
import ict.mahidol.gemini.repository.UserRepository;

@Controller
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @CrossOrigin
	@PostMapping("/auth")
	public @ResponseBody 
    ResponseEntity<Map<String, String>> authUser(@RequestBody AuthRequestDto authReq) {
        String username = authReq.getUsername();
        String password = authReq.getPassword();
        if(username.isEmpty() || password.isEmpty()) return new ResponseEntity<>(Map.of("message", "missing credentails"), HttpStatus.BAD_REQUEST);
        return !userRepository.findByUsernameAndPassword(username, password).isEmpty() ? new ResponseEntity<>(Map.of("message", "authorized"), HttpStatus.OK) : new ResponseEntity<>(Map.of("message", "unauthorized"), HttpStatus.UNAUTHORIZED);
	}

    @CrossOrigin
	@PostMapping("/add")
	public @ResponseBody 
    ResponseEntity<Map<String, String>> addUser(@RequestBody UserDto userDto) {
        String firstName = userDto.getFirstName();
        String lastName = userDto.getLastName();
        String username = userDto.getUsername();
        String password = userDto.getPassword();
        String role = userDto.getRole();

        switch(role)
        {
            case "astronomer":
                userRepository.save(new Astronomer(firstName, lastName, username, password, role));
            break;

            case "scienceObserver":
                userRepository.save(new ScienceObserver(firstName, lastName, username, password, role));
            break;

            default:
                return new ResponseEntity<>(Map.of("message", "invalid user role"), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(Map.of("message", "user added"), HttpStatus.OK);
	}
    
}
