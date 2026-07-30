package com.campusguardian.backend.user.service.impl;

import com.campusguardian.backend.common.exception.DuplicateResourceException;
import com.campusguardian.backend.user.dto.RegisterUserRequest;
import com.campusguardian.backend.user.dto.UserResponse;
import com.campusguardian.backend.user.entity.User;
import com.campusguardian.backend.user.mapper.UserMapper;
import com.campusguardian.backend.user.repository.UserRepository;
import com.campusguardian.backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse register(RegisterUserRequest request) {

        if (repository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists.");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        repository.save(user);

        log.info("User registered successfully: {}", user.getEmail());

        return UserMapper.toResponse(user);
    }
}