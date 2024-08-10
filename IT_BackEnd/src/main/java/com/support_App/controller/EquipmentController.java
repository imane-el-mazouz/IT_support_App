package com.support_App.controller;

import com.support_App.model.Equipment;
import com.support_App.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/equipment")
public class EquipmentController {

    @Autowired
    private EquipmentService equipmentService;


    @PreAuthorize("hasRole('Admin')")
    @PostMapping
    public ResponseEntity<Equipment> addEquipment(@RequestBody Equipment equipment) {
        Equipment newEquipment = equipmentService.addEquipment(equipment);
        return ResponseEntity.ok(newEquipment);
    }


    @PreAuthorize("hasRole('Admin')")
    @PutMapping("/{id}")
    public ResponseEntity<Equipment> updateEquipment(@PathVariable Long id, @RequestBody Equipment equipmentDetails) {
        Equipment updatedEquipment = equipmentService.updateEquipment(id, equipmentDetails);
        return ResponseEntity.ok(updatedEquipment);
    }


    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipment(@PathVariable Long id) {
        equipmentService.deleteEquipment(id);
        return ResponseEntity.noContent().build();
    }


    @PreAuthorize("hasRole('Admin')")
    @GetMapping
    public ResponseEntity<List<Equipment>> getAllEquipments() {
        List<Equipment> equipments = equipmentService.getAllEquipments();
        return ResponseEntity.ok(equipments);
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Equipment>> getEquipmentById(@PathVariable Long id) {
        Optional<Equipment> equipment1 = equipmentService.getEquipmentById(id);
        return ResponseEntity.ok(equipment1);
    }
}


//        public ResponseEntity<Equipment> save(@Valid @RequestBody Equipment equipment) {
//            Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
//            String email = loggedInUser.getName();
//            Admin admin = (Admin) userRepository.findByEmail(email);
//            try {
//                equipment.setAdmin(admin);
//                equipment savedReservation = equipmentService.save(equipment);
//                return ResponseEntity.ok(savedReservation);
//            } catch (Exception e) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
//            }
//        }






//@RestController
//@RequestMapping("/api/equipment")
//@CrossOrigin(origins = "*")
//public class EquipmentController {
//
//    private final EquipmentService equipmentService;
//    private final UserRepository userRepository;
//
//    @Autowired
//    public EquipmentController(EquipmentService equipmentService, UserRepository userRepository) {
//        this.equipmentService = equipmentService;
//        this.userRepository = userRepository;
//    }
//
//    @PreAuthorize("hasRole('Admin')")
//    @GetMapping("/all")
//    public ResponseEntity<List<Equipment>> getAllEquipments() {
//        List<Equipment> equipments = equipmentService.findAll();
//        return ResponseEntity.ok(equipments);
//    }
//
//    @PreAuthorize("hasRole('Admin')")
//    @PostMapping("/add")
//    public ResponseEntity<Equipment> addEquipment(@RequestBody Equipment equipment, Authentication authentication) {
//        String email = authentication.getName();
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
//    public ResponseEntity<Equipment> getEquipmentById(@PathVariable Long id) {
//        Equipment equipment = equipmentService.getEquipmentById(id);
//        return ResponseEntity.ok(equipment);
//    }
//
//    @PreAuthorize("hasRole('Admin')")
//    @PutMapping("/{id}")
//    public ResponseEntity<Equipment> updateEquipment(@PathVariable Long id, @RequestBody Equipment updatedEquipment) {
//        Equipment equipment = equipmentService.updateEquipment(id, updatedEquipment);
//        return ResponseEntity.ok(equipment);
//    }
//
//    @PreAuthorize("hasRole('Admin')")
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteEquipment(@PathVariable Long id) {
//        equipmentService.deleteEquipment(id);
//        return ResponseEntity.noContent().build();
//    }
//}
//


//@RestController
//@RequestMapping("/api/equipment")
//@CrossOrigin(origins = "*")
//public class EquipmentController {
//
//    private final EquipmentService equipmentService;
//    private final UserRepository userRepository;
//
//    @Autowired
//    public EquipmentController(EquipmentService equipmentService, UserRepository userRepository) {
//        this.equipmentService = equipmentService;
//        this.userRepository = userRepository;
//    }
//
//    @PreAuthorize("hasRole('Admin')")
//    @GetMapping("/all")
//    public ResponseEntity<List<Equipment>> getAllEquipments() {
//        List<Equipment> equipments = equipmentService.findAll();
//        return ResponseEntity.ok(equipments);
//    }
//
//    @PreAuthorize("hasRole('Admin')")
//    @PostMapping("/add")
//    public ResponseEntity<Equipment> addEquipment(@RequestBody Equipment equipment, Authentication authentication) {
//        User user = (User) authentication.getPrincipal();
//        if (user.getRole() != Role.Admin) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
//        }
//        Equipment savedEquipment = equipmentService.save(equipment);
//        return ResponseEntity.status(HttpStatus.CREATED).body(savedEquipment);
//    }
//
//    @PreAuthorize("hasRole('Admin')")
//    @GetMapping("/{id}")
//    public ResponseEntity<Equipment> getEquipmentById(@PathVariable Long id) {
//        Equipment equipment = equipmentService.getEquipmentById(id);
//        return equipment != null ? ResponseEntity.ok(equipment) : ResponseEntity.notFound().build();
//    }
//
//    @PreAuthorize("hasRole('Admin')")
//    @PutMapping("/{id}")
//    public ResponseEntity<Equipment> updateEquipment(@PathVariable Long id, @RequestBody Equipment updatedEquipment) {
//        Equipment equipment = equipmentService.updateEquipment(id, updatedEquipment);
//        return equipment != null ? ResponseEntity.ok(equipment) : ResponseEntity.notFound().build();
//    }
//
//    @PreAuthorize("hasRole('Admin')")
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteEquipment(@PathVariable Long id) {
//        boolean deleted = equipmentService.deleteEquipment(id);
//        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
//    }
//}
