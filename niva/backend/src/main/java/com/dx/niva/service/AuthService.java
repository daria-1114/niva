package com.dx.niva.service;

import com.dx.niva.EmailAlreadyExists;
import com.dx.niva.InvalidAccountException;
import com.dx.niva.dto.auth.LoginRequest;
import com.dx.niva.dto.auth.RegisterRequest;
import com.dx.niva.entity.User;
import com.dx.niva.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }
    public void register(RegisterRequest request){ // takes a register request object and turns it into a db row, hashing the password
        String email = request.getEmail().trim().toLowerCase();
        if(userRepository.existsByEmail(email)){
            throw new EmailAlreadyExists("Email already exists.");
        }
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        userRepository.save(user);
    }
    public String login(LoginRequest loginRequest){
        String email = loginRequest.getEmail().trim().toLowerCase();
        User user = userRepository.findByEmail(email).orElseThrow(()->new InvalidAccountException("Invalid email or password"));
        String storedHash = user.getPassword();

        if(!passwordEncoder.matches(loginRequest.getPassword(), storedHash)){
            throw new InvalidAccountException("Invalid email or password");
        }
        return jwtService.generateToken(user.getEmail());
    }
}
