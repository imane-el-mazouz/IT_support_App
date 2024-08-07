package com.support_App.controller;

import com.support_App.dto.BreakdownReportDTO;
import com.support_App.enums.RepairStatus;
import com.support_App.model.Breakdown;
import com.support_App.model.Equipment;
import com.support_App.model.User;
import com.support_App.model.UserU;
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
import com.support_App.model.Breakdown;
import com.support_App.service.BreakdownService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/breakdowns")
public class BreakdownController {

    @Autowired
    private BreakdownService breakdownService;

    @PreAuthorize("hasRole('Admin')")
    @PostMapping
    public ResponseEntity<Breakdown> addBreakdown(@RequestBody Breakdown breakdown) {
        Breakdown newBreakdown = breakdownService.addBreakdown(breakdown);
        return ResponseEntity.ok(newBreakdown);
    }


    @PreAuthorize("hasRole('Admin')")
    @PostMapping("/{equipmentId}")
    public ResponseEntity<Breakdown> addBreakdownToEquipment(@PathVariable Long equipmentId, @RequestBody Breakdown breakdown) {
        Breakdown newBreakdown = breakdownService.addBreakdownToEquipment(equipmentId, breakdown);
        return ResponseEntity.ok(newBreakdown);
    }

    @PreAuthorize("hasRole('Admin')")
    @PutMapping("/{id}")
    public ResponseEntity<Breakdown> updateBreakdown(@PathVariable Long id, @RequestBody Breakdown breakdownDetails) {
        Breakdown updatedBreakdown = breakdownService.updateBreakdown(id, breakdownDetails);
        return ResponseEntity.ok(updatedBreakdown);
    }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBreakdown(@PathVariable Long id) {
        breakdownService.deleteBreakdown(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping("/equipment/{equipmentId}/breakdowns")
    public ResponseEntity<List<Breakdown>> getBreakdownsByEquipmentId(@PathVariable Long equipmentId) {
        List<Breakdown> breakdowns = breakdownService.getBreakdownsByEquipmentId(equipmentId);
        return ResponseEntity.ok(breakdowns);
    }
}



//    @PreAuthorize("hasAnyRole('Admin', 'UserU')")
//    @PostMapping("/report")
//    public ResponseEntity<?> reportBreakdown(@Valid @RequestBody BreakdownReportDTO breakdownReportDTO) {
//        try {
//            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//            User user = userRepository.findByEmail(auth.getName());
//            if (user == null) {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
//            }
//            if (!(user instanceof UserU)) {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not of type UserU");
//            }
//            Breakdown breakdown = breakdownService.reportBreakdown(user.getId(), breakdownReportDTO.getEquipmentId(), breakdownReportDTO.getDescription());
//            return ResponseEntity.ok(breakdown);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
//
//    @PostMapping("/report")
//    public ResponseEntity<?> reportBreakdown(@Valid @RequestBody BreakdownReportDTO breakdownReportDTO) {
//        try {
//            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//            User user = userRepository.findByEmail(auth.getName());
//            if (user == null || !(user instanceof UserU)) {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found or not of type UserU");
//            }
//            Breakdown breakdown = breakdownService.reportBreakdown(user.getId(), breakdownReportDTO.getEquipmentId(), breakdownReportDTO.getDescription());
//            return ResponseEntity.ok(breakdown);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }

//
//
//    @PreAuthorize("hasRole('Admin')")
//    @PutMapping("/{id}/status")
//    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody RepairStatus newStatus) {
//        try {
//            Breakdown updatedBreakdown = breakdownService.updateStatus(id, newStatus);
//            return ResponseEntity.ok(updatedBreakdown);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
//
//    @PreAuthorize("hasRole('Admin')")
//    @GetMapping("/equipment/{equipmentId}")
//    public ResponseEntity<?> getBreakdownsByEquipment(@PathVariable Long equipmentId) {
//        try {
//            List<Breakdown> breakdowns = breakdownService.findByEquipment(equipmentId);
//            return ResponseEntity.ok(breakdowns);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

