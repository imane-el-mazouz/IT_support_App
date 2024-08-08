package com.support_App;

import com.support_App.enums.Status;
import com.support_App.model.Breakdown;
import com.support_App.model.SupportTicket;
import com.support_App.model.Technician;
import com.support_App.model.User;
import com.support_App.repository.BreakdownRepository;
import com.support_App.repository.SupportTicketRepository;
import com.support_App.repository.UserRepository;
import com.support_App.service.SupportTicketService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@SpringBootTest
class SupportTicketTest {
    @Mock
    private SupportTicketRepository supportTicketRepository;

    @Mock
    private BreakdownRepository breakdownRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private SupportTicketService supportTicketService;

    private SupportTicket supportTicket;
    private Breakdown breakdown;
    private Technician technician;
    private User user;

    @BeforeEach
    void setUp() {
        supportTicket = new SupportTicket();
        supportTicket.setId(1L);
        supportTicket.setDescription("Ticket Description");
        supportTicket.setCreatedDate(LocalDate.now());
        supportTicket.setTicketStatus(Status.Confirmed);

        breakdown = new Breakdown();
        breakdown.setId(1L);

        technician = new Technician();
        technician.setId(2L);

        user = new Technician();
        ((Technician) user).setId(2L);
    }

    @Test
    void testSaveTicket() {
        when(breakdownRepository.findById(anyLong())).thenReturn(Optional.of(breakdown));
        when(supportTicketRepository.save(any(SupportTicket.class))).thenReturn(supportTicket);

        SupportTicket savedTicket = supportTicketService.saveTicket(supportTicket, 1L, user);

        assertNotNull(savedTicket);
        assertEquals(supportTicket, savedTicket);
        verify(breakdownRepository, times(1)).findById(1L);
        verify(supportTicketRepository, times(1)).save(supportTicket);
    }

    @Test
    void testAssignTicketToTechnician() {
        when(supportTicketRepository.findById(anyLong())).thenReturn(Optional.of(supportTicket));
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(technician));
        when(supportTicketRepository.save(any(SupportTicket.class))).thenReturn(supportTicket);

        SupportTicket updatedTicket = supportTicketService.assignTicketToTechnician(1L, 2L);

        assertNotNull(updatedTicket);
        assertEquals(technician, updatedTicket.getTechnician());
        verify(supportTicketRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).findById(2L);
        verify(supportTicketRepository, times(1)).save(updatedTicket);
    }

    @Test
    void testGetTicketById() {
        when(supportTicketRepository.findById(anyLong())).thenReturn(Optional.of(supportTicket));

        SupportTicket foundTicket = supportTicketService.getTicketById(1L);

        assertNotNull(foundTicket);
        assertEquals(supportTicket, foundTicket);
        verify(supportTicketRepository, times(1)).findById(1L);
    }

    @Test
    void testGetTicketsByTechnicianId() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(technician));
        when(supportTicketRepository.findByTechnician(any(Technician.class))).thenReturn(List.of(supportTicket));

        List<SupportTicket> tickets = supportTicketService.getTicketsByTechnicianId(2L);

        assertNotNull(tickets);
        assertEquals(1, tickets.size());
        assertEquals(supportTicket, tickets.get(0));
        verify(userRepository, times(1)).findById(2L);
        verify(supportTicketRepository, times(1)).findByTechnician(technician);
    }

    @Test
    void testGetTicketStatusById() {
        when(supportTicketRepository.findById(anyLong())).thenReturn(Optional.of(supportTicket));

        Status status = supportTicketService.getTicketStatusById(1L);

        assertEquals(Status.Cancelled, status);
        verify(supportTicketRepository, times(1)).findById(1L);
    }

    @Test
    void testUpdateTicketStatus() {
        when(supportTicketRepository.findById(anyLong())).thenReturn(Optional.of(supportTicket));
        when(supportTicketRepository.save(any(SupportTicket.class))).thenReturn(supportTicket);

        supportTicket.setTicketStatus(Status.Pending);
        SupportTicket updatedTicket = supportTicketService.updateTicketStatus(1L, Status.Cancelled);

        assertNotNull(updatedTicket);
        assertEquals(Status.Cancelled, updatedTicket.getTicketStatus());
        verify(supportTicketRepository, times(1)).findById(1L);
        verify(supportTicketRepository, times(1)).save(supportTicket);
    }

}
