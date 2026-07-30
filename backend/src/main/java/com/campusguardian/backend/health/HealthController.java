package com.campusguardian.backend.health;

import com.campusguardian.backend.common.response.ApiResponse;
import com.campusguardian.backend.common.util.ApiResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    private static final Logger log =
            LoggerFactory.getLogger(HealthController.class);

    @GetMapping("/api/v1/health")
    public ApiResponse<String> health() {

        log.info("Health check endpoint invoked.");

        return ApiResponseUtil.success(
                "Backend is running successfully.",
                "UP"
        );
    }
}