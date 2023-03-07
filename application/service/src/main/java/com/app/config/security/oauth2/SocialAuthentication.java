package com.app.config.security.oauth2;

import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.support.URIBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Date;

@Service
public class SocialAuthentication {

	private final Logger log = LoggerFactory.getLogger(SocialAuthentication.class);

	@Autowired
	private ApplicationProperties applicationProperties;

	@Autowired
	private CustomOAuth2UserService customOAuth2UserService;

	public User processSocialLogin(SocialVM user) throws Exception {

		if (verifyAuthentiaction(user)) {
			return customOAuth2UserService.processOAuth2User(user);
		} else {
			return null;
		}
	}

	public Boolean verifyAuthentiaction(SocialVM user) {
		if (user == null) {
			return false;
		}
		if ("FACEBOOK".equals(user.getProvider())) {
			return verifyFacebookAuthenticationToken(user);

		} else if ("GOOGLE".equals(user.getProvider())) {
			return verifyGoogleAuthenticationToken(user);
		}
		return false;
	}

	private Boolean verifyGoogleAuthenticationToken(SocialVM user) {
		URIBuilder builder = URIBuilder.fromUri(String.format("%s/tokeninfo", "https://www.googleapis.com/oauth2/v3"));
		builder.queryParam("id_token", user.getIdToken());
		URI uri = builder.build();
		RestTemplate restTemplate = new RestTemplate();

		JsonNode resp = null;
		try {
			resp = restTemplate.getForObject(uri, JsonNode.class);
		} catch (HttpClientErrorException e) {
			return false;
		}
		if (resp.findValue("iss") == null || !("https://accounts.google.com".equals(resp.findValue("iss").asText())
				|| "accounts.google.com".equals(resp.findValue("iss").asText()))) {
			log.info("error in the token info");
			return false;
		}

		if (!applicationProperties.getOauth2().getGoogle().getClientId().equals(resp.findValue("aud").asText())) {
			log.info("Token's client ID does not match app's.");
			return false;
		}
		if (!user.getId().equals(resp.findValue("sub").asText())) {
			log.info("Token's user ID does not match given user ID.");
			return false;
		}
		if (resp.findValue("exp") == null || !(resp.findValue("exp").asLong() * 1000 > new Date().getTime())) {
			log.info("Token's user ID does not match given user ID.");
			return false;
		}

		return true;
	}

	private Boolean verifyFacebookAuthenticationToken(SocialVM user) {
		URIBuilder builder = URIBuilder.fromUri(String.format("%s/debug_token", "https://graph.facebook.com"));
		builder.queryParam("access_token", applicationProperties.getOauth2().getFacebook().getAccessToken());
		builder.queryParam("input_token", user.getAuthToken());
		URI uri = builder.build();
		RestTemplate restTemplate = new RestTemplate();

		JsonNode resp = null;
		try {
			resp = restTemplate.getForObject(uri, JsonNode.class);
		} catch (HttpClientErrorException e) {
			return false;
		}
		Boolean isValid = resp.path("data").findValue("is_valid").asBoolean();
		if (!isValid) {
			return false;
		}
		return true;
	}

}
