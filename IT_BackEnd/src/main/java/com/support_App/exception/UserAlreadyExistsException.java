package com.support_App.exception;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(Long id) {
        super("UserAlreadyExists : " + id);
    }
}
