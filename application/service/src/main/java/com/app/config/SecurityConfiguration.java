package com.app.config;

import com.dlaca.security.AuthoritiesConstants;
import com.dlaca.security.jwt.JWTConfigurer;
import com.dlaca.security.jwt.TokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
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
import org.zalando.problem.spring.web.advice.security.SecurityProblemSupport;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
@Import(SecurityProblemSupport.class)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	private final TokenProvider tokenProvider;

	private final CorsFilter corsFilter;
	private final SecurityProblemSupport problemSupport;

	public SecurityConfiguration(TokenProvider tokenProvider, CorsFilter corsFilter,
			SecurityProblemSupport problemSupport) {
		this.tokenProvider = tokenProvider;
		this.corsFilter = corsFilter;
		this.problemSupport = problemSupport;
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
		web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**").antMatchers("/swagger-ui/index.html")
				.antMatchers("/test/**");
	}

	@Override
	public void configure(HttpSecurity http) throws Exception {
		// @formatter:off
		http.csrf().disable().addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
				.exceptionHandling().authenticationEntryPoint(problemSupport).accessDeniedHandler(problemSupport).and()
				.headers().frameOptions().disable().and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
				
				.antMatchers("/api/authenticate", "/api/scm/authenticate","/api/oauth2/**").permitAll()
				.antMatchers("/api/register", "/api/register-scm", "/api/register-scm/check").permitAll()
				.antMatchers("/api/activate").permitAll()
				.antMatchers("/api/account/reset-password/init").permitAll()
				.antMatchers("/api/account/scm/reset-password/init").permitAll()
				.antMatchers("/api/account/reset-password/finish").permitAll()

				.antMatchers("/api/homes/customer/product").permitAll()
				.antMatchers("/api/search","/api/search/**").permitAll()

				.antMatchers(HttpMethod.GET, "/api/products/customer/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/languages", "/api/languages/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/places/**", "/api/places").permitAll()
				.antMatchers(HttpMethod.GET, "/api/currencies","/api/currencies/**" ).permitAll()
				.antMatchers(HttpMethod.GET, "/api/reviews","/api/reviews/**" ).permitAll()
				.antMatchers(HttpMethod.GET, "/api/categories","/api/categories/**" ).permitAll()
				.antMatchers(HttpMethod.GET, "/api/homes/*").permitAll()
				.antMatchers(HttpMethod.GET, "/api/homes/gateway/onepay").permitAll()

				.antMatchers(HttpMethod.GET,"/api/gateway/**" ).permitAll()

				.antMatchers("/management/health").permitAll()
				.antMatchers("/management/info").permitAll()
				.antMatchers("/management/prometheus").permitAll()
				.antMatchers("/management/**").hasAuthority(AuthoritiesConstants.ADMIN)
				
				.antMatchers("/api/**").authenticated()
				.and().apply(securityConfigurerAdapter());
	}

	private JWTConfigurer securityConfigurerAdapter() {
		return new JWTConfigurer(tokenProvider);
	}
}
