package com.app.config;

import com.app.config.security.jwt.JWTAuthenticationEntryPoint;
import com.app.config.security.jwt.JWTConfigurer;
import com.app.config.security.jwt.TokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  private final TokenProvider tokenProvider;

  private final CorsFilter corsFilter;

  private final JWTAuthenticationEntryPoint unauthorizedHandler;

  public SecurityConfiguration(TokenProvider tokenProvider, CorsFilter corsFilter,
      JWTAuthenticationEntryPoint unauthorizedHandler) {
    this.tokenProvider = tokenProvider;
    this.corsFilter = corsFilter;
    this.unauthorizedHandler = unauthorizedHandler;
  }

  @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Override
  public void configure(WebSecurity web) throws Exception {
    web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**")
        .antMatchers("/v2/api-docs/**", "/swagger-ui.html", "/swagger-ui/index.html", "/configuration/ui", "/swagger-resources/**",
            "/configuration/**", "/webjars/**")
        .antMatchers("/test/**");
  }

  @Override
  public void configure(HttpSecurity http) throws Exception {
    // @formatter:off
    http.csrf().disable().addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
        .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
        .headers().frameOptions().disable().and().sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
        .antMatchers("/api/login", "/api/oauth2/**").permitAll()
        .antMatchers("/api/register").permitAll()
        .antMatchers("/api/activate").permitAll()
        .antMatchers("/api/**").authenticated()
        .and().apply(securityConfigurerAdapter());
  }

  private JWTConfigurer securityConfigurerAdapter() {
    return new JWTConfigurer(tokenProvider);
  }
}
