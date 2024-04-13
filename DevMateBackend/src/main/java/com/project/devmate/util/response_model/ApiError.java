package com.project.devmate.util.response_model;

import java.util.List;

public record ApiError(
        String message,
        List<String> details,
        Integer status,
        Long timestamp
) {
}
