package com.support_App.exception;

public class TechnicianNotFoundException extends RuntimeException {
    public TechnicianNotFoundException(String id) {
        super("Technician not found with ID " );
    }
}
