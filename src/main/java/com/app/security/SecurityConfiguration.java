package com.app.security;

import com.app.config.SimpleCORSFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.authentication.AuthenticationTrustResolverImpl;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    @Qualifier("customUserDetailsService")
    UserDetailsService userDetailsService;

    @Autowired
    PersistentTokenRepository tokenRepository;

    @Autowired
    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
        auth.authenticationProvider(authenticationProvider());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .addFilterBefore(new SimpleCORSFilter(), ChannelProcessingFilter.class)
            .authorizeRequests()
            .antMatchers("/userList").access("hasRole('ADMIN')")
            .antMatchers("/addCategory").access("hasRole('ADMIN')")
            .antMatchers("/categoryList").access("hasRole('ADMIN')")
            .antMatchers("/edit-category-*").access("hasRole('ADMIN')")
            .antMatchers("/delete-category-*").access("hasRole('ADMIN')")
            .antMatchers("/addAdvert").access("isAuthenticated()")
            .antMatchers("/edit-profile").access("isAuthenticated()")
            .antMatchers("/scheduler*").access("isAuthenticated()")
            .antMatchers("/edit-advert-*").access("isAuthenticated()")
            .antMatchers("/delete-advert").access("isAuthenticated()")
            .antMatchers("/listUser").access("hasRole('ADMIN')")
            .antMatchers("/clubsList").access("hasRole('ADMIN')")
            .antMatchers("/user-*").access("hasRole('ADMIN')")
            .antMatchers("/edit-user-*").access("hasRole('ADMIN')")
            .antMatchers("/delete-user-*").access("hasRole('ADMIN')")
            .antMatchers("/userList").access("hasRole('ADMIN')").and().formLogin().loginPage("/login")
            .loginProcessingUrl("/login").usernameParameter("login").passwordParameter("password").and()
            .rememberMe().rememberMeParameter("remember-me").tokenRepository(tokenRepository)
            .tokenValiditySeconds(86400).and().csrf().and().exceptionHandling().accessDeniedPage("/Access_Denied");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public PersistentTokenBasedRememberMeServices getPersistentTokenBasedRememberMeServices() {
        return new PersistentTokenBasedRememberMeServices("remember-me", userDetailsService, tokenRepository);
    }

    @Bean
    public AuthenticationTrustResolver getAuthenticationTrustResolver() {
        return new AuthenticationTrustResolverImpl();
    }

}