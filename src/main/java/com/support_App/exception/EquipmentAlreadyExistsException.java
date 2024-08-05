package com.support_App.exception;

public class EquipmentAlreadyExistsException extends RuntimeException {
    public EquipmentAlreadyExistsException(Long id) {
        super("Equipment already exists : " + id);
    }
}
