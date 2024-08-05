package com.support_App.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String id) {
        super("user not found : " + id);
    }
}
