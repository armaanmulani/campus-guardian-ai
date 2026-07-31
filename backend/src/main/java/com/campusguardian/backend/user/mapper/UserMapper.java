package com.campusguardian.backend.user.mapper;

import com.campusguardian.backend.user.dto.UserResponse;
import com.campusguardian.backend.user.entity.User;

public class UserMapper {

    private UserMapper() {}

    public static UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .build();
    }
}