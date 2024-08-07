package com.support_App.service;

import com.support_App.exception.BreakdownNotFoundException;
import com.support_App.model.Breakdown;
import com.support_App.model.SupportTicket;
import com.support_App.model.User;
import com.support_App.model.UserU;
import com.support_App.repository.BreakdownRepository;
import com.support_App.repository.SupportTicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
public SupportTicket saveTicket(SupportTicket supportTicket, Long breakdownId, User user) {
    Breakdown breakdown = breakdownRepository.findById(breakdownId)
            .orElseThrow(() -> new BreakdownNotFoundException("Breakdown not found with ID " + breakdownId));

    supportTicket.setBreakdown(breakdown);
    supportTicket.setUserU((UserU) user);
    return supportTicketRepository.save(supportTicket);
}

}
