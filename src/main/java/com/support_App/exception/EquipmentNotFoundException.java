package com.support_App.exception;

public class EquipmentNotFoundException extends RuntimeException {
    public EquipmentNotFoundException(Long id) {
        super("Equipment not found : " + id);
    }
}
