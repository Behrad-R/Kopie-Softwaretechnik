package de.eightgile.bips.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Set;

@Getter
@Setter
@ToString
public class UserProfile {

    private String userId;
    private String username;
    private String firstname;
    private String lastname;
    private Set<String> roles;
    private String email;

}
