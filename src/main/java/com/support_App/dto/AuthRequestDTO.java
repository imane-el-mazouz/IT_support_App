package com.support_App.dto;

import com.support_App.model.User;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthRequestDTO {
    private String email;
    private String password;
}
