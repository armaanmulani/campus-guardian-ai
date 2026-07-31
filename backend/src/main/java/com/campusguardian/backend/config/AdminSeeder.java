package com.campusguardian.backend.config;

import com.campusguardian.backend.user.entity.User; // Or Admin entity
import com.campusguardian.backend.user.enums.Role;
import com.campusguardian.backend.user.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminSeeder {

    @Bean
    CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String adminEmail = "admin@campusguardian.com";

            // Check if admin already exists so we don't recreate on every restart
            if (userRepository.findByEmail(adminEmail).isEmpty()) {
                User admin = User.builder()
                        .fullName("System Administrator")
                        .email(adminEmail)
                        .password(passwordEncoder.encode("Admin@12345")) // Hashes password automatically
                        .role(Role.ADMIN)
                        .build();

                userRepository.save(admin);
                System.out.println(">>> Initial Admin user seeded successfully!");
            }
        };
    }
}