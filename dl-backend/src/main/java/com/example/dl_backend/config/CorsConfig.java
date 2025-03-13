package com.example.dl_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Apply CORS to all endpoints
                        .allowedOrigins("https://digital-library-1-wd96.onrender.com", "http://localhost:3000") // Allow frontend URLs
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow methods
                        .allowedHeaders("*"); // Allow all headers
            }
        };
    }
}
