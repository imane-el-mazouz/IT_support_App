package com.support_App.exception;

public class SupportTicketAlreadyExistsException extends RuntimeException {
    public SupportTicketAlreadyExistsException(Long id) {
        super("SupportTicket already exists : " + id);
    }
}
