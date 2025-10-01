package com.booknook.booknook_backend.service;

import com.booknook.booknook_backend.model.User;
import com.booknook.booknook_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Spring Security calls this method during login to find the user
    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        // Assuming we can look up by either username or email (common practice)
        User user = userRepository.findByUsername(usernameOrEmail)
                .orElseGet(() -> userRepository.findByEmail(usernameOrEmail)
                        .orElseThrow(() ->
                                new UsernameNotFoundException("User not found with username or email: " + usernameOrEmail)));

        // We use Spring Security's built-in UserDetails object for authentication.
        // The role must be prefixed with "ROLE_" (e.g., "ROLE_USER", "ROLE_ADMIN").
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(), // This is the HASHED password
                Collections.singleton(new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + user.getRole()))
        );
    }
}