package com.support_App.exception;

public class EmailNotFoundException extends RuntimeException {
    public EmailNotFoundException(String email) {
        super("user not found : " + email);
    }
}
