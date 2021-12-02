package com.mensal.compras.services.exception;

import org.springframework.orm.jpa.JpaSystemException;

public class SqlExceptionHelperException extends JpaSystemException {
	private static final long serialVersionUID = 1L;

	public SqlExceptionHelperException(RuntimeException ex) {
		super(ex);

	}

	
	
	

}
