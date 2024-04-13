package com.project.devmate.controller;

import com.project.devmate.util.exception.BadCredentialsException;
import com.project.devmate.util.exception.ResourceProcessingException;
import com.project.devmate.util.exception.ResourceNotFoundException;
import com.project.devmate.util.response_model.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Collections;
import java.util.List;

@RestControllerAdvice
public class ExceptionHandlerController {

    private static final String RESOURCE_PROCESSING_ERROR = "Error occurred during processing the resource";

    private static final String USER_POST_NOT_FOUND = "No user post found. Please repeat your request";

    private static final String VALIDATION_ERROR = "Validation error has occurred";

    private static final String UNAUTHORIZED = "Unable to login";

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleUserPostNotFoundException(ResourceNotFoundException ex) {
        final ApiError response = new ApiError(
                USER_POST_NOT_FOUND, Collections.singletonList(ex.getMessage()),
                HttpStatus.NOT_FOUND.value(), System.currentTimeMillis());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleWebExchangeBindException(MethodArgumentNotValidException ex) {
        final List<String> details = ex.getBindingResult().getFieldErrors()
                .stream().map(FieldError::getDefaultMessage).toList();
        final ApiError response = new ApiError(
                VALIDATION_ERROR, details, HttpStatus.BAD_REQUEST.value(),
                System.currentTimeMillis());
        return ResponseEntity.badRequest().body(response);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(ResourceProcessingException.class)
    public ResponseEntity<ApiError> handleResourceProcessingException(ResourceProcessingException e) {
        final ApiError response = new ApiError(
                RESOURCE_PROCESSING_ERROR, Collections.singletonList(e.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR.value(), System.currentTimeMillis());
        return ResponseEntity.internalServerError().body(response);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiError> handleBadCredentialsException(BadCredentialsException e) {
        final ApiError response = new ApiError(UNAUTHORIZED, Collections.singletonList(e.getMessage()),
                HttpStatus.BAD_REQUEST.value(), System.currentTimeMillis());
        return ResponseEntity.badRequest().body(response);
    }
}
