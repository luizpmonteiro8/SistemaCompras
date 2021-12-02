package com.mensal.compras.services.exception;

public class ConstraintVException extends RuntimeException{
	private static final long serialVersionUID = 1L;

	public ConstraintVException(String msg) {
		super(msg);
	}
	
	public ConstraintVException(String msg,Throwable cause) {
		super(msg,cause);		
	}

}
