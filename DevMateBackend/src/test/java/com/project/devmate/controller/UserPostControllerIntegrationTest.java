package com.project.devmate.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.devmate.dto.UserPostDto;
import com.project.devmate.util.DevmateIntegrationTest;
import lombok.SneakyThrows;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.utility.DockerImageName;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static com.project.devmate.util.DummyUserPostFactory.getValidUserPostDto;
import static com.project.devmate.util.DummyUserPostFactory.getUserDtoWithLowNumberOfCharactersInDesc;

@DevmateIntegrationTest
@AutoConfigureMockMvc
class UserPostControllerIntegrationTest {

    @Container
    private static final PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>(DockerImageName.parse("postgres:latest"));

    private static final String USER_POST_TITLE_ID_1 = "Ищу frontend разработчика для создания совместного проекта";
    private static final String USER_POST_DESCRIPTION_ID_1 = "Я начинающий backend разработчик, учу Python более года. Есть идея по созданию небольшого форума, " +
            "с меня вся серверная часть, с вас хорошо работающий и красивый фронт. Положим этот проект к себе " +
            "и пойдем пытаться покорять этот, довольно непростой в наши времена, рынок IT";
    private static final String GET_USER_POST_BY_ID_1 = "/api/v1/getUserPost/1";
    private static final String GET_ALL_USER_POSTS = "/api/v1/getAllUserPosts";
    private static final String UPDATE_NON_EXISTING_USER_POST = "/api/v1/updateUserPost/100";
    private static final String CREATE_USER_POST = "/api/v1/createUserPost";
    private static final String ERROR_RESPONSE_MESSAGE = "$.message";
    private static final String ERROR_RESPONSE_DETAILS = "$.details";
    private static final String ERROR_RESPONSE_STATUS = "$.status";
    private static final String RESPONSE_USER_POST_TITLE = "$.title";
    private static final String RESPONSE_USER_POST_DESCRIPTION = "$.description";

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
    @WithMockUser
    void checkCorrectnessOfFoundUserAndStatusIsOk() {
        mockMvc.perform(get(GET_USER_POST_BY_ID_1))
                .andExpect(status().isOk())
                .andExpect(jsonPath(RESPONSE_USER_POST_TITLE).value(USER_POST_TITLE_ID_1))
                .andExpect(jsonPath(RESPONSE_USER_POST_DESCRIPTION).value(USER_POST_DESCRIPTION_ID_1));
    }

    @Test
    @SneakyThrows
    @WithMockUser
    void checkUserPostNotFoundException404() {
        mockMvc.perform(put(UPDATE_NON_EXISTING_USER_POST)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(getValidUserPostDto())))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath(ERROR_RESPONSE_MESSAGE).value("No user post found. Please repeat your request"))
                .andExpect(jsonPath(ERROR_RESPONSE_DETAILS).value("Such a user post does not exist"))
                .andExpect(jsonPath(ERROR_RESPONSE_STATUS).value(HttpStatus.NOT_FOUND.value()));
    }

    @Test
    @SneakyThrows
    @WithMockUser
    void checkValidUserPostSavedSuccessfully200() {
        mockMvc.perform(post(CREATE_USER_POST)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(getValidUserPostDto())))
                .andExpect(status().isOk());

        MvcResult result = mockMvc.perform(get(GET_ALL_USER_POSTS))
                .andExpect(status().isOk())
                .andReturn();

        List<UserPostDto> userPosts = objectMapper.readValue(result.getResponse()
                .getContentAsString(), new TypeReference<List<UserPostDto>>() {});
        Assertions.assertThat(userPosts).hasSize(3);
    }

    @Test
    @SneakyThrows
    @WithMockUser
    void checkMethodArgumentNotValidException400() {
        mockMvc.perform(post(CREATE_USER_POST)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(getUserDtoWithLowNumberOfCharactersInDesc())))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath(ERROR_RESPONSE_MESSAGE).value("Validation error has occurred"))
                .andExpect(jsonPath(ERROR_RESPONSE_DETAILS).value("Содержание анкеты должно быть длинной хотя бы 20 символов"))
                .andExpect(jsonPath(ERROR_RESPONSE_STATUS).value(HttpStatus.BAD_REQUEST.value()));
    }

    @Test
    @SneakyThrows
    void checkUnauthorizedStatusWithoutToken() {
        mockMvc.perform(post(CREATE_USER_POST)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(getValidUserPostDto())))
                .andExpect(status().isForbidden());
    }
}

