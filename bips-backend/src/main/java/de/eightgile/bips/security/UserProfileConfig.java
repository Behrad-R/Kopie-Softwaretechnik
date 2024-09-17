package de.eightgile.bips.security;

import de.eightgile.bips.domain.UserProfile;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.keycloak.representations.AccessToken;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.annotation.SessionScope;

import java.util.Collections;

@Configuration
@Slf4j
public class UserProfileConfig {

    public static final String ROLE_ADMISSION_OFFICER = "admission-officer";
    public static final String ROLE_APPLICANT = "applicant";


    @Bean
    @Profile("dev_applicant")
    public UserProfile devApplicantUserProfile() {
        UserProfile userProfile = new UserProfile();
        userProfile.setEmail("");
        userProfile.setUsername("developer");
        userProfile.setFirstname("Dev");
        userProfile.setLastname("Eloper");
        userProfile.setUserId("2d13bbd4-6c33-4e44-9bc5-58851c2e228a");
        userProfile.setRoles(Collections.singleton(ROLE_APPLICANT));
        return userProfile;
    }

    @Bean
    @Profile("dev_admission_officer")
    public UserProfile devAdmissionOfficerUserProfile() {
        UserProfile userProfile = new UserProfile();
        userProfile.setEmail("");
        userProfile.setUsername("developer");
        userProfile.setFirstname("Dev");
        userProfile.setLastname("Eloper");
        userProfile.setUserId("1");
        userProfile.setRoles(Collections.singleton(ROLE_ADMISSION_OFFICER));
        return userProfile;
    }


    @Bean
    @SessionScope
    @ConditionalOnMissingBean
    public UserProfile userProfile() {

        KeycloakAuthenticationToken authentication = (KeycloakAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        KeycloakSecurityContext context = authentication.getAccount().getKeycloakSecurityContext();
        AccessToken token = context.getToken();

        log.debug("Creating userProfile for user {}:{}", context.getIdToken().getSubject(), token.getPreferredUsername());

        UserProfile userProfile = new UserProfile();
        userProfile.setUserId(context.getIdToken().getSubject());
        userProfile.setFirstname(token.getGivenName());
        userProfile.setLastname(token.getFamilyName());
        userProfile.setUsername(token.getPreferredUsername());
        userProfile.setEmail(token.getEmail());
        userProfile.setRoles(token.getRealmAccess().getRoles());

        log.debug("UserProfile created: {}", userProfile);

        return userProfile;
    }


}
