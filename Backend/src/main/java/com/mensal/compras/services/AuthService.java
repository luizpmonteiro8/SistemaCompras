package com.mensal.compras.services;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.mensal.compras.entity.User;
import com.mensal.compras.repositories.UserRepository;
import com.mensal.compras.services.exception.ObjectNFException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder pe;	
	
	private final EmailService emailService;
	
	private Random rand = new Random();
	
	public void sendNewPassword(String email) {
		
		User user = userRepository.findByEmail(email);
		if (user == null) {
			throw new ObjectNFException("Email não encontrado");
		}
		
		String newPass = newPassword();
		user.setPassword(pe.encode(newPass));
		
		userRepository.save(user);
		emailService.sendNewPasswordEmail(user, newPass);
	}

	private String newPassword() {
		char[] vet = new char[10];
		for (int i=0; i<10; i++) {
			vet[i] = randomChar();
		}
		return new String(vet);
	}

	private char randomChar() {
		int opt = rand.nextInt(3);
		if (opt == 0) { 
			return (char) (rand.nextInt(10) + 48);
		}
		else if (opt == 1) { 
			return (char) (rand.nextInt(26) + 65);
		}
		else { 
			return (char) (rand.nextInt(26) + 97);
		}
	}
}
