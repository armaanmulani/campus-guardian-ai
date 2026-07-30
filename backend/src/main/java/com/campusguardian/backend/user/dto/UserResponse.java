package com.campusguardian.backend.user.dto;

import com.campusguardian.backend.user.enums.Role;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class UserResponse {

    private UUID id;
    private String fullName;
    private String email;
    private Role role;
    private LocalDateTime createdAt;
}