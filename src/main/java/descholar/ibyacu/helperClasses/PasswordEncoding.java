package descholar.ibyacu.helperClasses;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEncoding {
    public PasswordEncoding(){}
    public PasswordEncoder encodePassword(){
        return new BCryptPasswordEncoder(14);
    }
}
