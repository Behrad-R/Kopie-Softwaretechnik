package de.eightgile.bips.security;


import de.eightgile.bips.domain.UserProfile;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

@Controller
@Slf4j
public class LogoutController {

    @Autowired
    private UserProfile userProfile;

    @GetMapping("/logout")
    public RedirectView logout(HttpServletRequest request) throws ServletException {
        log.debug("logging out user {}:{}", userProfile.getUserId(), userProfile.getUsername());
        request.logout();
        return new RedirectView("/ui");
    }

    @GetMapping("/")
    public RedirectView index() {
        return new RedirectView("/ui");
    }


}
