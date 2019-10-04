package descholar.ibyacu.services.login;

import descholar.ibyacu.entities.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserPrincipals implements UserDetails {

    private Users user;

    public UserPrincipals(Users user){
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(user.getUserAuthorities()));
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    public String getUserGender(){
        return user.getUserGender();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Users getMyLoggedInUserDetails(){

        Users loggedUser = new Users();

        loggedUser.setUserFName(user.getUserFName());
        loggedUser.setUserLName(user.getUserLName());
        loggedUser.setUserGender(user.getUserGender());
        loggedUser.setUserDateOfBirth(user.getUserDateOfBirth());
        loggedUser.setUserEmail(user.getUserEmail());
        loggedUser.setUsername(user.getUsername());
        loggedUser.setUserAuthorities(user.getUserAuthorities());
        loggedUser.setListOfWrittenStories(user.getListOfWrittenStories());
        loggedUser.setListOfEditedStories(user.getListOfEditedStories());
        loggedUser.setListOfCommentedStories(user.getListOfCommentedStories());

        return loggedUser;
    }
}
