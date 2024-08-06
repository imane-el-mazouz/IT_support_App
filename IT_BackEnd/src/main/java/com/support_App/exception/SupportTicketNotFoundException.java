package com.support_App.exception;

public class SupportTicketNotFoundException extends RuntimeException {
    public SupportTicketNotFoundException(Long id) {
        super("support ticket not found : " + id);
    }
}
