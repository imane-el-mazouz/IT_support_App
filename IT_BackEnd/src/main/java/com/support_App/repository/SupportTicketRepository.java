package com.support_App.repository;

import com.support_App.model.SupportTicket;
import com.support_App.model.Technician;
import com.support_App.model.UserU;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface SupportTicketRepository extends JpaRepository<SupportTicket , Long> {
    List<SupportTicket> findByTechnician(Technician technician);

    List<SupportTicket> findByUserU(UserU userU);

}
