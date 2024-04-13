package com.project.devmate.dto;

import lombok.Builder;

@Builder
public record UserAuthenticationRequest(
        String email,
        String password
) {
}
