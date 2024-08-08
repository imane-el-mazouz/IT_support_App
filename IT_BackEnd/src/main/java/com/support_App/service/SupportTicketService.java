package com.support_App.service;

import com.support_App.enums.Status;
import com.support_App.exception.BreakdownNotFoundException;
import com.support_App.exception.EquipmentNotFoundException;
import com.support_App.exception.SupportTicketNotFoundException;
import com.support_App.exception.TechnicianNotFoundException;
import com.support_App.model.*;
import com.support_App.repository.BreakdownRepository;
import com.support_App.repository.EquipmentRepository;
import com.support_App.repository.SupportTicketRepository;
import com.support_App.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupportTicketService {
    @Autowired
    private SupportTicketRepository supportTicketRepository;


    @Autowired
    private BreakdownRepository breakdownRepository;

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private UserRepository userRepository;


//    public SupportTicket saveTicket(SupportTicket supportTicket){
//
//        return supportTicketRepository.save(supportTicket);
//    }
public SupportTicket saveTicket(SupportTicket supportTicket, Long breakdownId, Long equipmentId, User user) {
    Breakdown breakdown = breakdownRepository.findById(breakdownId)
            .orElseThrow(() -> new BreakdownNotFoundException("Breakdown not found with ID " + breakdownId));

    Equipment equipment = equipmentRepository.findById(equipmentId)
            .orElseThrow(() -> new EquipmentNotFoundException("Equipment not found with ID " + equipmentId));

    supportTicket.setBreakdown(breakdown);
    supportTicket.setEquipment(equipment);
    supportTicket.setTicketStatus(Status.Cancelled);
    supportTicket.setUserU((UserU) user);
    return supportTicketRepository.save(supportTicket);
}

    public SupportTicket assignTicketToTechnician(Long ticketId, Long technicianId) {
        SupportTicket ticket = supportTicketRepository.findById(ticketId)
                .orElseThrow(() -> new SupportTicketNotFoundException("Ticket not found with ID " + ticketId));
        User user = userRepository.findById(technicianId)
                .orElseThrow(() -> new TechnicianNotFoundException("Technician not found with ID " + technicianId));
        if (user instanceof Technician) {
            Technician technician = (Technician) user;
            ticket.setTechnician(technician);
            return supportTicketRepository.save(ticket);
        } else {
            throw new TechnicianNotFoundException("User with ID " + technicianId + " is not a technician");
        }
    }

    public SupportTicket getTicketById(Long ticketId) {
        return supportTicketRepository.findById(ticketId)
                .orElseThrow(() -> new SupportTicketNotFoundException("Ticket not found with ID " + ticketId));
    }


    public List<SupportTicket> getTicketsByTechnicianId(Long technicianId) {
        User user = userRepository.findById(technicianId)
                .orElseThrow(() -> new TechnicianNotFoundException("Technician not found with ID " + technicianId));
        if (user instanceof Technician) {
            Technician technician = (Technician) user;
            return supportTicketRepository.findByTechnician(technician);
        } else {
            throw new TechnicianNotFoundException("User with ID " + technicianId + " is not a technician");
        }
    }

    public Status getTicketStatusById(Long ticketId) {
        SupportTicket ticket = supportTicketRepository.findById(ticketId)
                .orElseThrow(() -> new SupportTicketNotFoundException("Ticket not found with ID " + ticketId));
        return ticket.getTicketStatus();
    }

    public SupportTicket updateTicketStatus(Long ticketId, Status status) {
        SupportTicket ticket = supportTicketRepository.findById(ticketId)
                .orElseThrow(() -> new SupportTicketNotFoundException("Ticket not found with ID " + ticketId));
        ticket.setTicketStatus(status);
        return supportTicketRepository.save(ticket);
    }


}
