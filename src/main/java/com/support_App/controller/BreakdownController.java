package com.support_App.controller;

import com.support_App.model.Breakdown;
import com.support_App.model.Equipment;
import com.support_App.model.User;
import com.support_App.repository.UserRepository;
import com.support_App.service.BreakdownService;
import com.support_App.service.EquipmentService;
import com.support_App.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/breakdown")
@CrossOrigin(origins = "*")
public class BreakdownController {

    @Autowired
    private BreakdownService breakdownService;
    @Autowired
    private UserRepository userRepository;


    @PreAuthorize("hasRole('Admin')")
    @GetMapping("/all")
    public ResponseEntity<List<Breakdown>> getAllBreakdowns() {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String email = loggedInUser.getName();
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        List<Breakdown> breakdowns = breakdownService.findAll();
        return ResponseEntity.ok(breakdowns);
    }



}
