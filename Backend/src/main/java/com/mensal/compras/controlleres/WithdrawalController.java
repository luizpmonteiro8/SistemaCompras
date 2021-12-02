package com.mensal.compras.controlleres;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mensal.compras.dto.WithdrawalDTO;
import com.mensal.compras.entity.Withdrawal;
import com.mensal.compras.services.WithdrawalService;

@RestController
@RequestMapping(value = "/withdrawal")
public class WithdrawalController {

	@Autowired
	private WithdrawalService service;

	@PreAuthorize("hasAnyRole('ADMIN','READ_WITHDRAWAL')")
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Withdrawal>> findAll() {
		List<Withdrawal> list = service.findAll();		
		return ResponseEntity.ok().body(list);
	}

	@PreAuthorize("hasAnyRole('ADMIN','READ_WITHDRAWAL')")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Withdrawal> findById(@PathVariable Long id) {
		Withdrawal obj = service.findById(id);
		return ResponseEntity.ok().body(obj);
	}

	@PreAuthorize("hasAnyRole('ADMIN','WRITE_WITHDRAWAL')")
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Withdrawal> insert(@Valid @RequestBody WithdrawalDTO objDto) {
		Withdrawal obj = service.fromDTO(objDto);
		obj = service.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}

	@PreAuthorize("hasAnyRole('ADMIN','WRITE_WITHDRAWAL')")
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Withdrawal> update(@Valid @RequestBody WithdrawalDTO objDto,
			@PathVariable Long id) {
		Withdrawal obj = service.fromDTOUpdate(objDto);
		obj.setId(id);
		obj = service.update(obj);
		return ResponseEntity.noContent().build();
	}

	@PreAuthorize("hasAnyRole('ADMIN','WRITE_WITHDRAWAL')")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@RequestBody Withdrawal obj, @PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

	@PreAuthorize("hasAnyRole('ADMIN','READ_WITHDRAWAL')")
	@RequestMapping(value = "/page", method = RequestMethod.GET)
	public ResponseEntity<Page<Withdrawal>> findPage(
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "24") Integer linesPerPage,
			@RequestParam(value = "orderBy", defaultValue = "unit") String orderBy,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction) {
		Page<Withdrawal> list = service.findPage(page, linesPerPage, orderBy, direction);		
		return ResponseEntity.ok().body(list);
	}
}
