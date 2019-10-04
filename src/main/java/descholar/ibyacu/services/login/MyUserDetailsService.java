package descholar.ibyacu.services.login;

import descholar.ibyacu.entities.Users;
import descholar.ibyacu.repositories.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipal;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UsersRepo usersRepo;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        Users user = usersRepo.findByUsername(username);

        if (user.equals(null)){
            throw new UsernameNotFoundException("Sorry! No username : "+username+" found!");
        }

        return new UserPrincipals(user);
    }
}
