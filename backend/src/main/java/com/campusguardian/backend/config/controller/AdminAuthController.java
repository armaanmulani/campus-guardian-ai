package com.campusguardian.backend.config.controller;

import com.campusguardian.backend.config.dto.AdminLoginRequest;
import com.campusguardian.backend.auth.dto.AuthResponse;
import com.campusguardian.backend.config.service.AdminAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth/admin")
@RequiredArgsConstructor
public class AdminAuthController {

    private final AdminAuthService adminAuthService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AdminLoginRequest request) {
        AuthResponse response = adminAuthService.authenticateAdmin(request);
        return ResponseEntity.ok(response);
    }
}