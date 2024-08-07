package com.support_App.controller;


import com.support_App.model.SupportTicket;
import com.support_App.service.SupportTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ticket")
@CrossOrigin(origins = "*")
public class SupportTicketController {

    @Autowired
    private SupportTicketService supportTicketService;

//    @PreAuthorize("hasRole('UserU')")
//    @PostMapping
//    public ResponseEntity<SupportTicket> addTicket(@RequestBody SupportTicket supportTicket) {
//        SupportTicket newTicket = supportTicketService.saveTicket(supportTicket);
//        return ResponseEntity.ok(newTicket);
//    }
@PreAuthorize("hasRole('UserU')")
@PostMapping("/{breakdownId}")
public ResponseEntity<SupportTicket> addTicket(@RequestBody SupportTicket supportTicket, @PathVariable Long breakdownId) {
    SupportTicket newTicket = supportTicketService.saveTicket(supportTicket, breakdownId);
    return ResponseEntity.ok(newTicket);
}


}
