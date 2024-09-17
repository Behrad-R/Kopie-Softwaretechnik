package de.eightgile.bips.backend;


import de.eightgile.bips.domain.UserProfile;
import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.Advised;
import org.springframework.aop.support.AopUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * Based on keycloak authentication
 */
@RestController
@RequestMapping("/api")
@Slf4j
public class UserProfileController {

    @Autowired
    private UserProfile userProfile;


    @GetMapping("/profile")
    public UserProfile getAuthentication() throws Exception {
        log.debug("Retrieving userProfile for user {}", userProfile);
        if (AopUtils.isAopProxy(userProfile) && userProfile instanceof Advised) {
            return (UserProfile) ((Advised) userProfile).getTargetSource().getTarget();
        } else {
            return userProfile;
        }
    }


}
