package com.support_App.service;

import com.support_App.exception.BreakdownNotFoundException;
import com.support_App.model.Breakdown;
import com.support_App.model.Equipment;
import com.support_App.model.SupportTicket;
import com.support_App.repository.BreakdownRepository;
import com.support_App.repository.SupportTicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class SupportTicketService {
    @Autowired
    private SupportTicketRepository supportTicketRepository;


    @Autowired
    private BreakdownRepository breakdownRepository;


//    public SupportTicket saveTicket(SupportTicket supportTicket){
//
//        return supportTicketRepository.save(supportTicket);
//    }
public SupportTicket saveTicket(SupportTicket supportTicket, Long breakdownId) {
    Breakdown breakdown = breakdownRepository.findById(breakdownId)
            .orElseThrow(() -> new BreakdownNotFoundException("Breakdown not found with ID " + breakdownId));
    supportTicket.setBreakdown(breakdown);
    return supportTicketRepository.save(supportTicket);
}

}
