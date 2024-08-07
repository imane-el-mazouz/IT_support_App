package com.support_App.exception;

public class SupportTicketNotFoundException extends RuntimeException {
    public SupportTicketNotFoundException(String id) {
        super("support ticket not found : " + id);
    }
}
