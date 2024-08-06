package com.support_App.repository;

import com.support_App.model.SupportTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface SupportTicketRepository extends JpaRepository<SupportTicket , Long> {
}
