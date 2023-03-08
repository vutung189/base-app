package com.app.dto;

import com.app.entity.Authority;
import com.app.entity.User;
import lombok.Data;

import javax.validation.constraints.*;
import java.time.Instant;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class UserDTO {

	private Long id;

	@NotBlank
	@Size(min = 1, max = 50)
	private String login;

	@Size(max = 50)
	private String firstName;

	@Size(max = 50)
	private String lastName;

	@Email
	@Size(min = 5, max = 254)
	private String email;

	@Size(max = 256)
	private String imageUrl;

	private boolean activated = false;

	@Size(min = 2, max = 6)
	private String langKey;

	private String createdBy;

	private Instant createdDate;

	private String lastModifiedBy;

	private Instant lastModifiedDate;

	private Set<String> authorities;

	private String phone;

	private String password;

	public UserDTO() {
		// Empty constructor needed for Jackson.
	}

	public UserDTO(User user) {
		this.id = user.getId();
		this.login = user.getLogin();
		this.firstName = user.getFirstName();
		this.lastName = user.getLastName();
		this.email = user.getEmail();
		this.imageUrl = user.getImageUrl();
		this.langKey = user.getLangKey();
		this.createdBy = user.getCreatedBy();
		this.createdDate = user.getCreatedDate();
		this.lastModifiedBy = user.getLastModifiedBy();
		this.lastModifiedDate = user.getLastModifiedDate();
		this.authorities = user.getAuthorities().stream().map(Authority::getName).collect(Collectors.toSet());
		this.phone = user.getPhone();
		this.password = user.getPassword();
	}

	public UserDTO(@Size(max = 50) String firstName, @Size(max = 50) String lastName,
                   @Email @Size(min = 5, max = 254) String email, String phone) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phone = phone;
	}

	public UserDTO(Long id, @NotBlank @Pattern(regexp = "^[_.@A-Za-z0-9-]*$") @Size(min = 1, max = 50) String login,
                   @Size(max = 50) String firstName, @Size(max = 50) String lastName,
                   @Email @Size(min = 5, max = 254) String email, Double commission) {
		super();
		this.id = id;
		this.login = login;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
	}

}
