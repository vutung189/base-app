package com.app.config.security.oauth2;

import com.dlaca.domain.AuthProvider;
import com.dlaca.domain.Authority;
import com.dlaca.domain.User;
import com.dlaca.repository.UserRepository;
import com.dlaca.web.rest.errors.EmailAlreadyUsedException;
import com.dlaca.web.rest.vm.SocialVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@Service
public class CustomOAuth2UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private CacheManager cacheManager;

	public User processOAuth2User(SocialVM socialUser) throws Exception {
//		if (StringUtils.isEmpty(socialUser.getEmail())) {
//			throw new Exception("Email not found from OAuth2 provider");
//		}

		Optional<User> userOptional = userRepository.findOneByLogin(socialUser.getId());
		User user;
		if (userOptional.isPresent()) {
			user = userOptional.get();
			if (!user.getProvider().equals(AuthProvider.valueOf(socialUser.getProvider().toLowerCase()))) {
				throw new Exception("Looks like you're signed up with " + user.getProvider()
						+ " account. Please use your " + user.getProvider() + " account to login.");
			}
			user = updateExistingUser(user, socialUser);
		} else {
			user = registerNewUser(socialUser);
		}

		return user;
	}

	private User registerNewUser(SocialVM socialUser) {
		if (!(socialUser.getEmail() == null || socialUser.getEmail() == "")) {
			userRepository.findOneByEmailIgnoreCaseAndProvider(socialUser.getEmail()).ifPresent(existingUser -> {
				boolean removed = removeNonActivatedUser(existingUser);
				if (!removed) {
					throw new EmailAlreadyUsedException(existingUser.getProvider().toString());
				}
			});
		}
		User user = new User();
		Authority authority = new Authority();
		authority.setName("ROLE_USER");
		Set<Authority> authorities = new HashSet<>();
		authorities.add(authority);

		user.setProvider(AuthProvider.valueOf(socialUser.getProvider().toLowerCase()));
		user.setLogin(socialUser.getId());
		user.setActivated(true);
		user.setAuthorities(authorities);
		user.setPassword(passwordEncoder.encode(socialUser.getId()));

		user.setFirstName(socialUser.getFirstName());
		user.setLastName(socialUser.getLastName());
		user.setEmail(socialUser.getEmail());
		user.setImageUrl(socialUser.getPhotoUrl());
		
		User entity = userRepository.save(user);
		cacheManager.getCache(UserRepository.USERS_BY_LOGIN_CACHE).put(user.getLogin(), entity);
		
		return entity;
	}

	private User updateExistingUser(User existingUser, SocialVM socialUser) {
		if ( (socialUser.getFirstName() != null && !socialUser.getFirstName().equals(existingUser.getFirstName()))
				|| (socialUser.getLastName() != null && !socialUser.getLastName().equals(existingUser.getLastName()))
				|| (socialUser.getPhotoUrl() != null && !socialUser.getPhotoUrl().equals(existingUser.getImageUrl()))) {

			existingUser.setFirstName(socialUser.getFirstName());
			existingUser.setLastName(socialUser.getLastName());
			existingUser.setImageUrl(socialUser.getPhotoUrl());
			User updatedUser = userRepository.save(existingUser);
			this.clearUserCaches(existingUser);
			return updatedUser;
		} else {
			return existingUser;
		}
	}

	private boolean removeNonActivatedUser(User existingUser) {
		if (existingUser.getActivated()) {
			return false;
		}
		userRepository.delete(existingUser);
		userRepository.flush();
		this.clearUserCaches(existingUser);
		return true;
	}

	private void clearUserCaches(User user) {
		Objects.requireNonNull(cacheManager.getCache(UserRepository.USERS_BY_LOGIN_CACHE)).evict(user.getLogin());
		Objects.requireNonNull(cacheManager.getCache(UserRepository.USERS_BY_EMAIL_CACHE)).evict(user.getEmail());
	}
}
