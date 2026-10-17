package com.dx.niva.controller;

import com.dx.niva.dto.UserResponse;
import com.dx.niva.dto.auth.LoginRequest;
import com.dx.niva.dto.auth.RegisterRequest;
import com.dx.niva.entity.User;
import com.dx.niva.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@Valid @RequestBody RegisterRequest request){
        authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> login(@Valid @RequestBody LoginRequest request){
        String token = authService.login(request);
        return ResponseEntity.ok(Map.of("token",token));
    }
    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(@AuthenticationPrincipal User user) {
        UserResponse response = new UserResponse(user.getEmail(), user.getFirstName(), user.getLastName());
        return ResponseEntity.ok(response);
    }


}
