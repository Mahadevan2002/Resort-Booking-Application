package com.devaworks.DevaRessort.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                                .requestMatchers("/rooms/**").permitAll()  // Allow room-related 
//                              .requestMatchers("/api/users/login", "/api/users/register").permitAll() // Allow login & register
                                .requestMatchers("/bookings/**").permitAll()  // Allow booking-related
                                .requestMatchers("/bookings/room/{roomId}/booking", "/bookings/all-bookings", "/bookings/confirmation/{confirmationCode}", "/bookings/booking/{bookingId}/delete").permitAll() 
                                .requestMatchers("/update/**").hasRole("ADMIN") // ✅ Only ADMIN can update
                                .requestMatchers("/update/**").permitAll()
                                .requestMatchers("/auth/**").permitAll()
                                .requestMatchers("/auth/register", "/auth/login").permitAll()
                                .anyRequest().authenticated()
                )
                .exceptionHandling(ex -> 
                ex.accessDeniedHandler(accessDeniedHandler()) // Custom Access Denied Handler
                  .authenticationEntryPoint(new Http403ForbiddenEntryPoint()) // Handle 403 errors properly
            );
        return http.build();
    }
    
    
    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        return (request, response, accessDeniedException) -> {
            System.out.println("403 Forbidden - Access Denied: " + accessDeniedException.getMessage());
            response.sendError(403, "Forbidden: " + accessDeniedException.getMessage());
        };
    }
}







