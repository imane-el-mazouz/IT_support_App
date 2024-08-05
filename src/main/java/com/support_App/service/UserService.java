package com.support_App.service;


import com.support_App.enums.Role;
import com.support_App.exception.EmailNotFoundException;
import com.support_App.exception.UserNotFoundException;
import com.support_App.model.User;
import com.support_App.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
@RequiredArgsConstructor

public class UserService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new EmailNotFoundException("User not found with username: " + email);
        }
        return org.springframework.security.core.userdetails.User
                .withUsername(email)
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
    }

    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.UserU);
        return userRepository.save(user);
    }


    public User updateUser(User user, Long id) {
        logger.info("Updating user with ID: {}", id);
        logger.info("New data: {}", user);

        User userToUpdate = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("user not found : " + id));

        userToUpdate.setName(user.getName());
        userToUpdate.setPassword(user.getEmail());

        User updatedUser = userRepository.save(userToUpdate);
        logger.info("Updated user: {}", updatedUser);

        return updatedUser;
    }


    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found!");
        }
        userRepository.deleteById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }
}
