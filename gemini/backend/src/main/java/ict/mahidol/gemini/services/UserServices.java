package ict.mahidol.gemini.services;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import ict.mahidol.gemini.model.Astronomer;
import ict.mahidol.gemini.model.ScienceObserver;
import ict.mahidol.gemini.model.User;
import ict.mahidol.gemini.model.dto.AuthRequestDto;
import ict.mahidol.gemini.model.dto.UserDto;
import ict.mahidol.gemini.repository.UserRepository;
import ict.mahidol.gemini.utils.JwtUtil;

@Service
public class UserServices {
    @Autowired
    private UserRepository userRepository;
    private final JwtUtil jwtUtil = new JwtUtil();

    public @ResponseBody ResponseEntity<Map<String, String>> AuthenUser(@RequestBody AuthRequestDto authReq)
    {
        String username = authReq.getUsername();
        String password = authReq.getPassword();

        if (username == null || password == null || username.isEmpty() || password.isEmpty()) {
            return new ResponseEntity<>(Map.of("message", "Missing credentials"), HttpStatus.BAD_REQUEST);
        }

        Optional<User> users = userRepository.findByUsernameAndPassword(username, password);

        if (users.isPresent()) {
            User user = users.get();
            Map<String, Object> claims = new HashMap<>();
            claims.put("username", user.getUsername());
            claims.put("role", user.getRole());

            String token = jwtUtil.generateToken(claims);
            return ResponseEntity.ok(Map.of(
                "message", "Authorized",
                "token", token
            ));
        } else {
            return new ResponseEntity<>(Map.of("message", "Unauthorized"), HttpStatus.UNAUTHORIZED);
        }
    }

    public @ResponseBody ResponseEntity<Map<String, String>> AddUser(@RequestBody UserDto userDto)
    {
        String firstName = userDto.getFirstName();
        String lastName = userDto.getLastName();
        String username = userDto.getUsername();
        String password = userDto.getPassword();
        String role = userDto.getRole();

        switch(role)
        {
            case "astronomer" -> userRepository.save(new Astronomer(firstName, lastName, username, password, role));

            case "scienceObserver" -> userRepository.save(new ScienceObserver(firstName, lastName, username, password, role));

            default -> {
                return new ResponseEntity<>(Map.of("message", "Invalid user role"), HttpStatus.BAD_REQUEST);
            }
        }

        return new ResponseEntity<>(Map.of("message", "Successfully added user"), HttpStatus.OK);
    }
}
