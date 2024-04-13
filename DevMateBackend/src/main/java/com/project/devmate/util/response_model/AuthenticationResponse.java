package com.project.devmate.util.response_model;

import lombok.Builder;

@Builder
public record AuthenticationResponse(
    String token
) {
}
