package com.mensal.compras.services;

import javax.mail.internet.MimeMessage;

import org.springframework.mail.SimpleMailMessage;

import com.mensal.compras.entity.Purchases;
import com.mensal.compras.entity.User;

public interface EmailService {

	void sendOrderConfirmationEmail(Purchases obj);

	void sendEmail(SimpleMailMessage msg);

	void sendOrderConfirmationHtmlEmail(Purchases obj);

	void sendHtmlEmail(MimeMessage msg);

	void sendNewPasswordEmail(User user, String newPass);
}
