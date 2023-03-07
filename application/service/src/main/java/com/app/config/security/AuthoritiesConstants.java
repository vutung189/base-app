package com.app.config.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

	public static final String ADMIN = "ROLE_ADMIN";

	public static final String USER = "ROLE_USER";

	public static final String ANONYMOUS = "ROLE_ANONYMOUS";

	public static final String SCM = "ROLE_SCM";

	public static final String SALE = "ROLE_SALE";

	public static final String ACCOUNTANCY = "ROLE_ACCOUNTANCY";

	public static final String MARKETING = "ROLE_MARKETING";
		
	public static final String CONTENT = "ROLE_CONTENT";
	
	public static final String BUSINESS = "ROLE_BUSINESS";

	private AuthoritiesConstants() {
	}
}
