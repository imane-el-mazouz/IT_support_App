package com.support_App.exception;

public class EquipmentNotFoundException extends RuntimeException {
    public EquipmentNotFoundException(String id) {
        super("Equipment not found : " + id);
    }
}
