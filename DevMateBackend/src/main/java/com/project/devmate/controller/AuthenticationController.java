package com.project.devmate.controller;

import com.project.devmate.dto.UserAuthenticationRequest;
import com.project.devmate.dto.UserRegistrationRequest;
import com.project.devmate.service.AuthenticationService;
import com.project.devmate.util.response_model.AuthenticationResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/registration")
    public ResponseEntity<AuthenticationResponse> registration(@RequestBody @Valid UserRegistrationRequest request) {
        return ResponseEntity.ok(authenticationService.createUser(request));
    }

    @PostMapping("/authentication")
    public ResponseEntity<AuthenticationResponse> authentication(@RequestBody UserAuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}
