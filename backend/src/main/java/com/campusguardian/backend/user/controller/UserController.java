package com.campusguardian.backend.user.controller;

import com.campusguardian.backend.common.response.ApiResponse;
import com.campusguardian.backend.common.util.ApiResponseUtil;
import com.campusguardian.backend.user.dto.RegisterUserRequest;
import com.campusguardian.backend.user.dto.UserResponse;
import com.campusguardian.backend.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ApiResponse<UserResponse> register(
            @Valid @RequestBody RegisterUserRequest request
    ) {

        UserResponse response = userService.register(request);

        return ApiResponseUtil.success(
                "User registered successfully",
                response
        );
    }
}