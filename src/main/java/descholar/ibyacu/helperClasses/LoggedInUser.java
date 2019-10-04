package descholar.ibyacu.helperClasses;

import descholar.ibyacu.entities.Users;
import descholar.ibyacu.services.login.MyUserDetailsService;
import descholar.ibyacu.services.login.UserPrincipals;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public class LoggedInUser {
    /**
     *
     * THIS IS A CLASS CONTAINING METHODS USED TO RETRIEVE DATA
     * WHICH HELP IN CASE WE NEED USER INFO
     *
     */

    public LoggedInUser(){}
    String username;
    public String loggedInUsername(){
        Object principal = SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails){
            username = ((UserDetails) principal).getUsername();
        }else {
            username = principal.toString();
        }

        return username;
    }

}
