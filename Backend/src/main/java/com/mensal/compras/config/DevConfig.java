package com.mensal.compras.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.mensal.compras.services.EmailService;
import com.mensal.compras.services.SmtpEmailService;


@Configuration
@Profile("dev")
public class DevConfig {
	
	@Bean
	public EmailService emailService() {
		return new SmtpEmailService();
	}
}
