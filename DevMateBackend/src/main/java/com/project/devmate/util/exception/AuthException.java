package com.project.devmate.util.exception;

import org.springframework.security.core.AuthenticationException;

public class AuthException extends AuthenticationException {

    public AuthException(final String message) {
        super(message);
    }
}
