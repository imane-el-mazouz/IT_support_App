package com.support_App.controller;

import com.support_App.dto.UserDTO;
import com.support_App.model.Technician;
import com.support_App.model.User;
import com.support_App.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")

public class UserController {

    @Autowired
    private UserService userService;

    @PreAuthorize("hasRole('Admin')")
    @PostMapping("/addTechnician")
    public User addTechnician(@RequestBody UserDTO userDTO) {
        return userService.addTechnician(userDTO);
    }

    @PreAuthorize("hasRole('Admin')")
    @PostMapping("/addUserU")
    public User addUserU(@RequestBody UserDTO userDTO) {
        return userService.addUserU(userDTO);
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping("/technicians")
    public List<Technician> getAllTechnicians() {
        return userService.getAllTechnicians();
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping("/technician/{id}")
    public Technician getTechById(@PathVariable Long id) {
        return userService.getTechById(id);
    }

    @PreAuthorize("hasRole('Admin')")
    @PutMapping("/update/{id}")
    public User updateUser(@RequestBody UserDTO userDTO, @PathVariable Long id) {
        return userService.updateUser(userDTO, id);
    }

    @PreAuthorize("hasRole('Admin')")
    @PutMapping("/updateTechnician/{id}")
    public Technician updateTechnician(@RequestBody UserDTO userDTO, @PathVariable Long id) {
        return userService.updateTechnician(userDTO, id);
    }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/deleteTechnician/{id}")
    public void deleteTechnician(@PathVariable Long id) {
        userService.deleteTechnician(id);
    }
}
