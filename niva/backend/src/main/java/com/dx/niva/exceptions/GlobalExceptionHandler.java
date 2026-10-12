package com.dx.niva.exceptions;

import com.dx.niva.EmailAlreadyExists;
import com.dx.niva.InvalidAccountException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(EmailAlreadyExists.class)
    public ResponseEntity<String> handleEmailExists(EmailAlreadyExists emailAlreadyExists){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(emailAlreadyExists.getMessage());
    }
    @ExceptionHandler(InvalidAccountException.class)
    public ResponseEntity<String> handleInvalidAccount(InvalidAccountException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }
}

