package com.campusguardian.backend.auth.service;

import com.campusguardian.backend.auth.dto.AuthResponse;
import com.campusguardian.backend.auth.dto.LoginRequest;
import com.campusguardian.backend.auth.dto.RegisterRequest;
import com.campusguardian.backend.user.dto.UserResponse;

public interface AuthService {

    UserResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}