package com.campusguardian.backend.config.service;

import com.campusguardian.backend.config.dto.AdminLoginRequest;
import com.campusguardian.backend.auth.dto.AuthResponse;
import com.campusguardian.backend.security.jwt.JwtService; // Your JWT provider
import com.campusguardian.backend.user.entity.User;
import com.campusguardian.backend.user.enums.Role;
import com.campusguardian.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminAuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse authenticateAdmin(AdminLoginRequest request) {
        // 1. Authenticate credentials via Spring Security
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // 2. Retrieve user record
        User admin = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        // 3. Ensure the user holds the ADMIN role
        if (admin.getRole() != Role.ADMIN && !"ROLE_ADMIN".equalsIgnoreCase(admin.getRole().name())) {
            throw new SecurityException("Access denied: User is not authorized as an Admin.");
        }

        // 4. Generate JWT
        String token = jwtService.generateToken(admin);

        return AuthResponse.builder()
                .token(token)
                .expiresIn(jwtService.getAccessTokenExpiration())
                .email(admin.getEmail())
                .role(admin.getRole().name())
                .message("Admin authenticated successfully.")
                .build();
    }
}