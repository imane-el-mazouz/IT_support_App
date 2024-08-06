//package com.support_App.controller;
//
//
//import com.support_App.model.Admin;
//import com.support_App.model.Equipment;
//import com.support_App.model.User;
//import com.support_App.repository.UserRepository;
//import com.support_App.service.EquipmentService;
//import com.support_App.service.UserService;
//import jakarta.validation.Valid;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/equipment")
//@CrossOrigin(origins = "*")
//public class EquipmentController {
//
//    @Autowired
//    private EquipmentService equipmentService ;
//
//
//    @Autowired
//    private UserService userService;
//
//    @Autowired
//    private UserRepository userRepository;
//
//
//    @PreAuthorize("hasRole('Admin')")
//    @GetMapping("/all")
//    public ResponseEntity<List<Equipment>> getAllEquipments(){
////        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
////        String email = (String) loggedInUser.getPrincipal();
////        User admin = userRepository.findByEmail(email);
//        List<Equipment> equipments = equipmentService.findAll();
//        return ResponseEntity.of(Optional.ofNullable(equipments));
//    }
//
//
//    @PreAuthorize("hasRole('Admin')")
//    @PostMapping("/add")
//    public ResponseEntity<Equipment> addEquipment(@RequestBody Equipment equipment) {
//        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
//        String email = loggedInUser.getName();
//        User user = userRepository.findByEmail(email);
//        if (user == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//        Equipment savedEquipment = equipmentService.save(equipment);
//        return ResponseEntity.status(HttpStatus.CREATED).body(savedEquipment);
//    }
//
//    @PreAuthorize("hasRole('Admin')")
//    @GetMapping("/{id}")
//    public ResponseEntity<Equipment> getEquipmentById(@PathVariable Long id){
//        Equipment equipment = equipmentService.getEquipmentBydId(id);
//        return ResponseEntity.ok(equipment);
//    }
//
//    @PreAuthorize("hasRole('Admin')")
//    @PutMapping("/{id}")
//    public ResponseEntity<Equipment> updateEquipment(@PathVariable Long id , @RequestBody Equipment updatedEquipment){
//        Equipment equipment = equipmentService.updateEquipment(id, updatedEquipment);
//        return ResponseEntity.ok(equipment);
//    }
//
//
//    @PreAuthorize("hasRole('Admin')")
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteEquipment(@PathVariable Long id){
//        equipmentService.deleteEquipment(id);
//        return ResponseEntity.noContent().build();
//    }
//
////        public ResponseEntity<Equipment> save(@Valid @RequestBody Equipment equipment) {
////            Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
////            String email = loggedInUser.getName();
////            Admin admin = (Admin) userRepository.findByEmail(email);
////            try {
////                equipment.setAdmin(admin);
////                equipment savedReservation = equipmentService.save(equipment);
////                return ResponseEntity.ok(savedReservation);
////            } catch (Exception e) {
////                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
////            }
////        }
//
//    }
//
//
package com.support_App.controller;

import com.support_App.model.Equipment;
import com.support_App.model.User;
import com.support_App.repository.UserRepository;
import com.support_App.service.EquipmentService;
import com.support_App.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/equipment")
@CrossOrigin(origins = "*")
public class EquipmentController {

    private final EquipmentService equipmentService;
    private final UserRepository userRepository;

    @Autowired
    public EquipmentController(EquipmentService equipmentService, UserRepository userRepository) {
        this.equipmentService = equipmentService;
        this.userRepository = userRepository;
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping("/all")
    public ResponseEntity<List<Equipment>> getAllEquipments() {
        List<Equipment> equipments = equipmentService.findAll();
        return ResponseEntity.ok(equipments);
    }

    @PreAuthorize("hasRole('Admin')")
    @PostMapping("/add")
    public ResponseEntity<Equipment> addEquipment(@RequestBody Equipment equipment, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Equipment savedEquipment = equipmentService.save(equipment);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEquipment);
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping("/{id}")
    public ResponseEntity<Equipment> getEquipmentById(@PathVariable Long id) {
        Equipment equipment = equipmentService.getEquipmentById(id);
        return ResponseEntity.ok(equipment);
    }

    @PreAuthorize("hasRole('Admin')")
    @PutMapping("/{id}")
    public ResponseEntity<Equipment> updateEquipment(@PathVariable Long id, @RequestBody Equipment updatedEquipment) {
        Equipment equipment = equipmentService.updateEquipment(id, updatedEquipment);
        return ResponseEntity.ok(equipment);
    }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipment(@PathVariable Long id) {
        equipmentService.deleteEquipment(id);
        return ResponseEntity.noContent().build();
    }
}

