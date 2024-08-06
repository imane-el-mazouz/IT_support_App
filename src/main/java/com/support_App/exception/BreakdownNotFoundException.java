package com.support_App.exception;

public class BreakdownNotFoundException extends RuntimeException {
    public BreakdownNotFoundException(String id) {
        super("breakdown not found : " + id);
    }
}
