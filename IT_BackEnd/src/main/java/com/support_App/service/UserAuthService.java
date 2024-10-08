package com.support_App.service;


import com.support_App.dto.AuthRequestDTO;
import com.support_App.dto.JwtResponseDTO;
import com.support_App.enums.Role;
import com.support_App.model.User;
import com.support_App.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserAuthService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Lazy
    @Autowired
    private AuthenticationManager authenticationManager;

    @Lazy
    @Autowired
    private JwtService jwtService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
    }
//@Override
//public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//    User user = userRepository.findByEmail(email);
//    if (user == null) {
//        throw new UsernameNotFoundException("User not found with email: " + email);
//    }
//    return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
//}

    //    public JwtResponseDTO signUp(User userRequest) {
//        if (userRepository.findByEmail(userRequest.getName()) != null) {
//            throw new RuntimeException("Username is already taken.");
//        }
//        if (userRequest.getRole() == null) {
//            userRequest.setRole(Role.UserU);
//        }
//        userRequest.setPassword(passwordEncoder.encode(userRequest.getPassword()));
//
//        User savedUser = userRepository.save(userRequest);
//        String token = jwtService.generateToken(savedUser.getName(),savedUser.getRole());
//
//        return JwtResponseDTO.builder()
//                .accessToken(token)
//                .user(savedUser)
//                .build();
//    }
public JwtResponseDTO signUp(User userRequest) {
    if (userRepository.findByEmail(userRequest.getEmail()) != null) {
        throw new RuntimeException("Email is already taken.");
    }
    if (userRequest.getRole() == null) {
        userRequest.setRole(Role.Admin);
    } else {
        try {
            userRequest.setRole(Role.valueOf(userRequest.getRole().name()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role: " + userRequest.getRole().name());
        }
    }
    userRequest.setPassword(passwordEncoder.encode(userRequest.getPassword()));
    User savedUser = userRepository.save(userRequest);

    String token = jwtService.generateToken(savedUser.getEmail(), savedUser.getRole());

    return JwtResponseDTO.builder()
            .accessToken(token)
            .user(savedUser)
            .build();
}

    public JwtResponseDTO login(AuthRequestDTO authRequestDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequestDTO.getEmail(), authRequestDTO.getPassword())
        );

        if (authentication.isAuthenticated()) {
            User user =userRepository.findByEmail(authRequestDTO.getEmail());
            String token = jwtService.generateToken(user.getEmail(), user.getRole());
            return JwtResponseDTO.builder()
                    .accessToken(token)
                    .user(user)
                    .build();
        } else {
            throw new UsernameNotFoundException("Invalid user request.");
        }
    }
}
