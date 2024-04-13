package com.project.devmate.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.devmate.util.DevmateIntegrationTest;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.utility.DockerImageName;

import static com.project.devmate.util.DummyUserFactory.getAuthRequestWithIncorrectPasswordId1;
import static com.project.devmate.util.DummyUserFactory.getRegistrationRequestWithAlreadyExistingEmail;
import static com.project.devmate.util.DummyUserFactory.getRegistrationRequestWithValidUser;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static com.project.devmate.util.DummyUserFactory.getAuthRequestWithExistingUserCredId1;

@DevmateIntegrationTest
@AutoConfigureMockMvc
public class AuthenticationControllerIntegrationTest {

    @Container
    private static final PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>(DockerImageName.parse("postgres:latest"));

    private static final String AUTHENTICATE_USER = "/api/v1/auth/authentication";
    private static final String REGISTER_USER = "/api/v1/auth/registration";
    private static final String RESPONSE_TOKEN = "$.token";
    private static final String ERROR_RESPONSE_MESSAGE = "$.message";
    private static final String ERROR_RESPONSE_DETAILS = "$.details";
    private static final String ERROR_RESPONSE_STATUS = "$.status";

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @DynamicPropertySource
    private static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Test
    @SneakyThrows
    void checkAuthenticateExistingUserSuccess200() {
        mockMvc.perform(post(AUTHENTICATE_USER)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(getAuthRequestWithExistingUserCredId1())))
                .andExpect(status().isOk())
                .andExpect(jsonPath(RESPONSE_TOKEN).exists());
    }

    @Test
    @SneakyThrows
    void checkAuthenticationWithInvalidPasswordException400() {
        mockMvc.perform(post(AUTHENTICATE_USER)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(getAuthRequestWithIncorrectPasswordId1())))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath(ERROR_RESPONSE_MESSAGE).value("Unable to login"))
                .andExpect(jsonPath(ERROR_RESPONSE_DETAILS).value("Неправильный пароль"))
                .andExpect(jsonPath(ERROR_RESPONSE_STATUS).value(HttpStatus.BAD_REQUEST.value()));
    }

    @Test
    @SneakyThrows
    void checkRegistrationWithValidUserSuccess200() {
        mockMvc.perform(post(REGISTER_USER)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(getRegistrationRequestWithValidUser())))
                .andExpect(status().isOk())
                .andExpect(jsonPath(RESPONSE_TOKEN).exists());
    }

    @Test
    @SneakyThrows
    void checkRegistrationWithEmailAlreadyExistException500() {
        mockMvc.perform(post(REGISTER_USER)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(getRegistrationRequestWithAlreadyExistingEmail())))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath(ERROR_RESPONSE_MESSAGE).value("Error occurred during processing the resource"))
                .andExpect(jsonPath(ERROR_RESPONSE_DETAILS).value("Пользователь с такой электронной почтой уже существует"))
                .andExpect(jsonPath(ERROR_RESPONSE_STATUS).value(HttpStatus.INTERNAL_SERVER_ERROR.value()));
    }
}
