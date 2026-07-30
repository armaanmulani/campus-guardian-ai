package com.campusguardian.backend.auth.service.impl;

import com.campusguardian.backend.auth.dto.AuthResponse;
import com.campusguardian.backend.auth.dto.LoginRequest;
import com.campusguardian.backend.auth.dto.RegisterRequest;
import com.campusguardian.backend.auth.service.AuthService;
import com.campusguardian.backend.common.exception.DuplicateResourceException;
import com.campusguardian.backend.security.jwt.JwtService;
import com.campusguardian.backend.security.model.CustomUserDetails;
import com.campusguardian.backend.user.dto.UserResponse;
import com.campusguardian.backend.user.entity.User;
import com.campusguardian.backend.user.mapper.UserMapper;
import com.campusguardian.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    public UserResponse register(RegisterRequest request) {
        if(userRepository.existsByEmail(request.getEmail())){
            throw new DuplicateResourceException("Email already exists.");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        userRepository.save(user);

        return UserMapper.toResponse(user);
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        String token = jwtService.generateToken(new CustomUserDetails(user));

        System.out.println("Generated Token = " + token);

        AuthResponse response = AuthResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .expiresIn(jwtService.getAccessTokenExpiration())
                .build();

        System.out.println("Response = " + response);

        return response;
    }
}