package descholar.ibyacu.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UrlController {
    @GetMapping(value = "/")
    public String index(){
        return "index.html";
    }

    @GetMapping(value = "/logout")
    public String logoutPage(){
        return "index.html";
    }

    @GetMapping(value = "/login")
    public String signupOrLogin(){
        return "signupAndLoginForm.html";
    }

    @GetMapping(value = "/descholar/public-user")
    public String publicUserHome(){
        return "authenticatedUser.html";
    }

    @GetMapping(value = "/descholar/private-user")
    public String privateUserHome(){
        return "authenticatedUser.html";
    }

    @GetMapping(value = "/descholar/admin")
    public String administratorPage(){
        return "authenticatedUser.html";
    }
}