package com.devaworks.DevaRessort.service;

import java.util.Optional;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.devaworks.DevaRessort.model.AuthUser;
import com.devaworks.DevaRessort.repository.AuthUserRepository;

@Service
public class AuthUserService {
    @Autowired
    private AuthUserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthUser registerUser(AuthUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<AuthUser> authenticate(String email, String password) {
        Optional<AuthUser> user = userRepository.findByEmail(email);
        return user.filter(u -> passwordEncoder.matches(password, u.getPassword()));
    }

	public AuthUserRepository getUserRepository() {
		return userRepository;
	}

	public void setUserRepository(AuthUserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public PasswordEncoder getPasswordEncoder() {
		return passwordEncoder;
	}

	public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
	}

	public AuthUserService(AuthUserRepository userRepository, PasswordEncoder passwordEncoder) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}
}