package com.campusguardian.backend.user.service;

import com.campusguardian.backend.user.dto.RegisterUserRequest;
import com.campusguardian.backend.user.dto.UserResponse;

public interface UserService {

    UserResponse register(RegisterUserRequest request);

}