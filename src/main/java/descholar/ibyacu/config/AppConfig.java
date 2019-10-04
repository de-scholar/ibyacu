package descholar.ibyacu.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class AppConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    CustomLoginSuccessHandler customLoginSuccessHandler;

    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher(){
        return new HttpSessionEventPublisher();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                //LOGIN FORM
                .formLogin()
                .loginPage("/login")
                .successHandler(customLoginSuccessHandler)
                .usernameParameter("username")
                .passwordParameter("password")
                .permitAll()

                //LOGOUT
                .and()
                .logout()
                .invalidateHttpSession(true)
                .clearAuthentication(true)
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/")
                .permitAll();

        http
                //PUBLIC RESOURCES
                .authorizeRequests()
                .antMatchers("/","/favicon.ico","/descholar/public/**","/frontend/js/public/**",
                        "/frontend/styles/public/**")
                .permitAll();

        http
                //PRIVATE RESOURCES
                .authorizeRequests()
                .antMatchers(
                        "/descholar/public-user/**","/descholar/private/**")
                .hasAnyAuthority("PUBLIC_USER")
                .antMatchers(
                        "/descholar/private-user/**","/descholar/private/**")
                .hasAnyAuthority("PRIVATE_USER")
                .antMatchers(
                        "/descholar/admin/**",
                        "/descholar/public-user/**",
                        "/descholar/private-user/**",
                        "/descholar/private/**")//admin has rights to access any url
                .hasAnyAuthority("ADMIN")
                .anyRequest()
                .authenticated();
        http
                .cors()
                .disable()
                .csrf()
                .disable();

        http
                //session management
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                .maximumSessions(1)
                .expiredUrl("/")
                .and()
                .invalidSessionUrl("/");
        /*FORCING HEROKU TO USE HTTPS*/
        http
                .requiresChannel()
                .requestMatchers(r->r.getHeader("X-Forwarded-Proto") != null)
                .requiresSecure();
        }



    @Autowired
    UserDetailsService userDetailsService;

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(new BCryptPasswordEncoder(14));

        return provider;
    }

}
