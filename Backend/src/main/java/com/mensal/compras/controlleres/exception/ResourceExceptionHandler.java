package com.mensal.compras.controlleres.exception;

import java.sql.SQLIntegrityConstraintViolationException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.transaction.UnexpectedRollbackException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.mensal.compras.services.exception.AuthorizationException;
import com.mensal.compras.services.exception.ConstraintVException;
import com.mensal.compras.services.exception.DataIntegrityException;
import com.mensal.compras.services.exception.ObjectNFException;

@ControllerAdvice
public class ResourceExceptionHandler {

	@ExceptionHandler(ObjectNFException.class)
	public ResponseEntity<StandardError> objectNotFound(ObjectNFException e,
			HttpServletRequest request) {

		StandardError err = new StandardError(System.currentTimeMillis(),
				HttpStatus.NOT_FOUND.value(), "Não encontrado", e.getMessage(),
				request.getRequestURI());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
	}

	@ExceptionHandler(ConstraintVException.class)
	public ResponseEntity<StandardError> objectNotFound(ConstraintVException e,
			HttpServletRequest request) {

		StandardError err = new StandardError(System.currentTimeMillis(),
				HttpStatus.NOT_FOUND.value(), "Não encontrado", e.getMessage(),
				request.getRequestURI());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
	}	
	
	@ExceptionHandler(DataIntegrityException.class)
	public ResponseEntity<StandardError> dataIntegrity(DataIntegrityException e,
			HttpServletRequest request) {

		StandardError err = new StandardError(System.currentTimeMillis(),
				HttpStatus.BAD_REQUEST.value(), "Integridade de dados", e.getMessage(),
				request.getRequestURI());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<StandardError> validation(MethodArgumentNotValidException e,
			HttpServletRequest request) {

		ValidationError err = new ValidationError(System.currentTimeMillis(),
				HttpStatus.UNPROCESSABLE_ENTITY.value(), "Erro de validação", e.getMessage(),
				request.getRequestURI());
		for (FieldError x : e.getBindingResult().getFieldErrors()) {
			err.addError(x.getField(), x.getDefaultMessage());
		}
		return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(err);
	}

	@ExceptionHandler(AuthorizationException.class)
	public ResponseEntity<StandardError> authorization(AuthorizationException e,
			HttpServletRequest request) {

		StandardError err = new StandardError(System.currentTimeMillis(),
				HttpStatus.FORBIDDEN.value(), "Acesso negado", "Acesso negado",
				request.getRequestURI());
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err);
	}


	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<StandardError> handleAccessDeniedException(AccessDeniedException ex,
			HttpServletRequest request) {
		StandardError err = new StandardError(System.currentTimeMillis(),
				HttpStatus.FORBIDDEN.value(), "Acesso negado", ex.getMessage(),
				request.getRequestURI());
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err);

	}
	
	
	@ExceptionHandler(UnexpectedRollbackException.class)
	public ResponseEntity<StandardError> test(UnexpectedRollbackException ex,
			HttpServletRequest request) {
		StandardError err = new StandardError(System.currentTimeMillis(),
				HttpStatus.FORBIDDEN.value(), "Acesso negado", "Duplicado",
				request.getRequestURI());
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err);

	}
	
	@ExceptionHandler(EmptyResultDataAccessException.class)
	public ResponseEntity<StandardError> test(EmptyResultDataAccessException ex,
			HttpServletRequest request) {
		StandardError err = new StandardError(System.currentTimeMillis(),
				HttpStatus.NOT_FOUND.value(), "Integridade de dados", ex.getMessage(),
				request.getRequestURI());
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err);

	}
	
	@ExceptionHandler(SQLIntegrityConstraintViolationException.class)
	public ResponseEntity<StandardError> test(SQLIntegrityConstraintViolationException ex,
			HttpServletRequest request) {
		String errorMessage = null;
		if(ex.getMessage().contains("Duplicate")) {
			errorMessage = "Duplicado";
		}
		if(ex.getMessage().contains("Cannot delete")) {
			errorMessage = "Não foi possivel deletar, está em uso por outro cadastro";
		}
		StandardError err = new StandardError(System.currentTimeMillis(),
				HttpStatus.BAD_REQUEST.value(), "Integridade de dados",errorMessage ,
				request.getRequestURI());
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err);

	}
	

	
	

}
