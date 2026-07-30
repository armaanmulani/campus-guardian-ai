package com.campusguardian.backend.common.util;

import com.campusguardian.backend.common.response.ApiResponse;

import java.time.LocalDateTime;

public class ApiResponseUtil {

    private ApiResponseUtil() {
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(
                true,
                message,
                data,
                LocalDateTime.now()
        );
    }

    public static <T> ApiResponse<T> success(T data) {
        return success("Request successful", data);
    }

    public static ApiResponse<Void> success(String message) {
        return success(message, null);
    }
}