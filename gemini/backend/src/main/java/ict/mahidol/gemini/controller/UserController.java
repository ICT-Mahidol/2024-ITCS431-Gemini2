package ict.mahidol.gemini.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ict.mahidol.gemini.model.dto.AuthRequestDto;
import ict.mahidol.gemini.model.dto.UserDto;
import ict.mahidol.gemini.services.UserServices;

@Controller
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    private UserServices userServices;

    @CrossOrigin
	@PostMapping("/auth")
	public @ResponseBody 
    ResponseEntity<Map<String, String>> authUser(@RequestBody AuthRequestDto authReq) {
        return userServices.AuthenUser(authReq);
	}

    @CrossOrigin
	@PostMapping("/add")
	public @ResponseBody 
    ResponseEntity<Map<String, String>> addUser(@RequestBody UserDto userDto) {
        return userServices.AddUser(userDto);
	}
    
}
