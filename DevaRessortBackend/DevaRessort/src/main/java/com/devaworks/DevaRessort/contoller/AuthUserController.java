package com.devaworks.DevaRessort.contoller;

import java.util.Optional;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devaworks.DevaRessort.model.AuthUser;
import com.devaworks.DevaRessort.service.AuthUserService;


@CrossOrigin(origins = "http://localhost:5173") // Allow frontend to access API
@RestController
@RequestMapping("/auth")
public class AuthUserController {
    @Autowired
    private AuthUserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthUser user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthUser user) {
        if (user.getEmail() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email and Password are required");
        }

        Optional<AuthUser> authenticatedUser = userService.authenticate(user.getEmail(), user.getPassword());

        return authenticatedUser
                .map(authUser -> ResponseEntity.ok().body(authUser))  // Ensure consistent ResponseEntity<AuthUser>
                .orElse(ResponseEntity.status(401).body(null));  // Ensure it returns ResponseEntity<AuthUser>
    }


}









