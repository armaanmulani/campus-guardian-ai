package com.campusguardian.backend.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI campusGuardianOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Campus Guardian API")
                        .description("Offline-First AI Campus Safety Platform Backend APIs")
                        .version("v1.0")
                        .contact(new Contact()
                                .name("Campus Guardian Team")
                                .email("team@campusguardian.dev"))
                        .license(new License()
                                .name("MIT")))
                .externalDocs(new ExternalDocumentation()
                        .description("Project Documentation"));
    }
}