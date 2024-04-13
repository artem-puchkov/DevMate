package com.project.devmate.service;

import com.project.devmate.dto.UserAuthenticationRequest;
import com.project.devmate.dto.UserRegistrationRequest;
import com.project.devmate.entity.User;
import com.project.devmate.repositry.UserRepository;
import com.project.devmate.security.JwtService;
import com.project.devmate.util.Enum.Role;
import com.project.devmate.util.exception.BadCredentialsException;
import com.project.devmate.util.exception.ResourceProcessingException;
import com.project.devmate.util.response_model.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private static final String USER_NOT_FOUND = "Пользователь с такой электронной почтой не найден";

    private static final String INCORRECT_PASSWORD = "Неправильный пароль";

    private static final String USER_WITH_EMAIL_EXISTS = "Пользователь с такой электронной почтой уже существует";

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    public AuthenticationResponse createUser(UserRegistrationRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ResourceProcessingException(USER_WITH_EMAIL_EXISTS);
        }

        User user = User.builder()
                .name(request.name())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(Role.USER)
                .build();
        userRepository.save(user);

        String jwtToken = jwtService.generateToken(user.getEmail());
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(UserAuthenticationRequest request) {
        User user = userRepository.findByEmail(request.email()).orElseThrow(() -> new BadCredentialsException(USER_NOT_FOUND));
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new BadCredentialsException(INCORRECT_PASSWORD);
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        String jwtToken = jwtService.generateToken(user.getEmail());
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}
