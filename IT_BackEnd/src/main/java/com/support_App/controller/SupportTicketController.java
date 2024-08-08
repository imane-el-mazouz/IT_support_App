package com.support_App.controller;


import com.support_App.enums.Status;
import com.support_App.model.SupportTicket;
import com.support_App.model.User;
import com.support_App.service.SupportTicketService;
import com.support_App.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ticket")
@CrossOrigin(origins = "*")
public class SupportTicketController {

    @Autowired
    private SupportTicketService supportTicketService;


    @Autowired
    private UserService userService;
//    @PreAuthorize("hasRole('UserU')")
//    @PostMapping
//    public ResponseEntity<SupportTicket> addTicket(@RequestBody SupportTicket supportTicket) {
//        SupportTicket newTicket = supportTicketService.saveTicket(supportTicket);
//        return ResponseEntity.ok(newTicket);
//    }
@PreAuthorize("hasRole('UserU')")
@PostMapping("/{breakdownId}/{equipmentId}")
public ResponseEntity<SupportTicket> addTicket(@RequestBody SupportTicket supportTicket, @PathVariable Long breakdownId, @PathVariable Long equipmentId) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String email = authentication.getName();
    User user = userService.findByEmail(email);
    SupportTicket newTicket = supportTicketService.saveTicket(supportTicket, breakdownId, equipmentId, user);
    return ResponseEntity.ok(newTicket);
}

//@PreAuthorize("hasRole('UserU')")
//@PostMapping("/{breakdownId}")
//public ResponseEntity<SupportTicket> addTicket(@RequestBody SupportTicket supportTicket, @PathVariable Long breakdownId) {
//    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//    String email = authentication.getName();
//    User user = userService.findByEmail(email);
//    SupportTicket newTicket = supportTicketService.saveTicket(supportTicket, breakdownId , user);
//    return ResponseEntity.ok(newTicket);
//}

//    @PreAuthorize("hasRole('Admin')")
//    @PatchMapping("/{ticketId}/assign/{technicianId}")
//    public ResponseEntity<SupportTicket> assignTicketToTechnician(@PathVariable Long ticketId, @PathVariable Long technicianId) {
//        SupportTicket updatedTicket = supportTicketService.assignTicketToTechnician(ticketId, technicianId);
//        return ResponseEntity.ok(updatedTicket);
//    }
@PreAuthorize("hasRole('Admin')")
@PutMapping("/{ticketId}/assign/{technicianId}")
public ResponseEntity<SupportTicket> assignTicketToTechnician(@PathVariable Long ticketId, @PathVariable Long technicianId) {
    SupportTicket updatedTicket = supportTicketService.assignTicketToTechnician(ticketId, technicianId);
    return ResponseEntity.ok(updatedTicket);
}


    @PreAuthorize("hasRole('UserU') or hasRole('Admin') or hasRole('Technician')")
    @GetMapping("/{ticketId}")
    public ResponseEntity<SupportTicket> getTicketById(@PathVariable Long ticketId) {
        SupportTicket ticket = supportTicketService.getTicketById(ticketId);
        return ResponseEntity.ok(ticket);
    }

    @PreAuthorize("hasRole('Technician')")
    @GetMapping("/technician/{technicianId}")
    public ResponseEntity<List<SupportTicket>> getTicketsByTechnicianId(@PathVariable Long technicianId) {
        List<SupportTicket> tickets = supportTicketService.getTicketsByTechnicianId(technicianId);
        return ResponseEntity.ok(tickets);
    }

    @PreAuthorize("hasRole('Technician')")
    @PutMapping("/{ticketId}/status")
    public ResponseEntity<SupportTicket> updateTicketStatus(@PathVariable Long ticketId, @RequestParam Status status) {
        SupportTicket updatedTicket = supportTicketService.updateTicketStatus(ticketId, status);
        return ResponseEntity.ok(updatedTicket);
    }

    @PreAuthorize("hasRole('UserU') ")
    @GetMapping("/{ticketId}/status")
    public ResponseEntity<String> getTicketStatusById(@PathVariable Long ticketId) {
        String status = String.valueOf(supportTicketService.getTicketStatusById(ticketId));
        return ResponseEntity.ok(status);
    }

}
