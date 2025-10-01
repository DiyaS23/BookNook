package com.booknook.booknook_backend.config;

import com.booknook.booknook_backend.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    private final CustomUserDetailsService customUserDetailsService; // 💡 NEW FIELD

    @Autowired
    public SecurityConfig(CustomUserDetailsService customUserDetailsService) { // 💡 NEW CONSTRUCTOR
        this.customUserDetailsService = customUserDetailsService;
    }
    // 1. Define how passwords are encoded (Crucial for storing passwords securely)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // ✅ CRITICAL FIX: List the allowed origin explicitly
        configuration.setAllowedOrigins(List.of("http://localhost:3002"));

        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));

        // ✅ CRITICAL FIX: Allow credentials for cookies/sessions/Basic Auth
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Apply this configuration to all paths
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    // 2. Configure the Security Filter Chain (The core of Spring Security setup)
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)

                // Define authorization rules:
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(authorize -> authorize

                        // --- PUBLIC ACCESS (Read-Only) ---
                        .requestMatchers(HttpMethod.GET, "/api/books", "/api/books/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/reviews", "/api/reviews/{id}", "/api/reviews/book/{bookId}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/quotes", "/api/quotes/{id}", "/api/quotes/book/{bookId}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/readinglists", "/api/readinglists/{id}", "/api/readinglists/user/{userId}").permitAll()

                        // --- PUBLIC ACCESS (Registration) ---
                        .requestMatchers(HttpMethod.POST, "/api/users").permitAll() // Allow new user creation
                        .requestMatchers(HttpMethod.GET, "/api/users/current").authenticated()
                        // --- ADMIN-ONLY ENDPOINTS ---
                        // Admin can view all users
                        .requestMatchers(HttpMethod.GET, "/api/users").hasRole("ADMIN")
                        // Admin can delete any resource
                        .requestMatchers(HttpMethod.DELETE, "/api/users/{id}", "/api/books/{id}", "/api/reviews/{id}", "/api/quotes/{id}", "/api/readinglists/{id}").hasRole("ADMIN")
                        // Admin has full control over Books (Create/Update)
                        .requestMatchers(HttpMethod.POST, "/api/books").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/books/{id}").hasRole("ADMIN")

                        // --- AUTHENTICATED USER ENDPOINTS (All other actions) ---
                        // Any authenticated user can perform all remaining actions (including CRUD on their own data)
                        .anyRequest().authenticated()
                )
                .httpBasic(basic -> {}); // Use HTTP Basic for initial testing

        return http.build();
    }

    // NOTE: In a real application, you would configure a UserDetailsService here
    // to load user details from your database for authentication.
}