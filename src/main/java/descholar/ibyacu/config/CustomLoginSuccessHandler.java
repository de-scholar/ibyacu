package descholar.ibyacu.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Configuration
public class CustomLoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    @Override
    protected void handle(HttpServletRequest request,
                          HttpServletResponse response,
                          Authentication authentication) throws IOException, ServletException {
        String targetUrl = determineTargetUrl(authentication);
        if(response.isCommitted()){
            return;
        }
        RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
        redirectStrategy.sendRedirect(request,response,targetUrl);
    }

    protected String determineTargetUrl(Authentication authentication) {
        String url = "/login?error=true";

        //FETCHING ROLES FROM AUTHENTICATION OBJECT
        Collection<? extends GrantedAuthority>authorities = authentication.getAuthorities();

        List<String> roles=new ArrayList<>();
        for(GrantedAuthority a : authorities){
            roles.add(a.getAuthority());
        }

        if(roles.contains("PUBLIC_USER")){
            url="/descholar/public-user";
        }else if(roles.contains("PRIVATE_USER")){
            url="/descholar/private-user";
        }else if(roles.contains("ADMIN")){
            url = "/descholar/admin";
        }

        return url;
    }
}
