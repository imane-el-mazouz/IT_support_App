package com.support_App.dto;

import com.support_App.model.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JwtResponseDTO {
    private String accessToken;

    public JwtResponseDTO(String error, Object o) {
    }
//    private User user;
}
