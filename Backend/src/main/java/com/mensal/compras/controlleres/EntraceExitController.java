package com.mensal.compras.controlleres;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

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

import com.mensal.compras.dto.EntraceExitDTO;
import com.mensal.compras.entity.EntraceExit;
import com.mensal.compras.services.EntraceExitService;

@RestController
@RequestMapping(value = "/entraceexit")
public class EntraceExitController {

	@Autowired
	private EntraceExitService service;

	@PreAuthorize("hasAnyRole('ADMIN','READ_ENTRACEEXIT')")
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<EntraceExitDTO>> findAll() {
		List<EntraceExit> list = service.findAll();
		List<EntraceExitDTO> listDto = list.stream().map(obj -> new EntraceExitDTO(obj))
				.collect(Collectors.toList());
		return ResponseEntity.ok().body(listDto);
	}

	@PreAuthorize("hasAnyRole('ADMIN','READ_ENTRACEEXIT')")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<EntraceExit> findById(@PathVariable Long id) {
		EntraceExit obj = service.findById(id);
		return ResponseEntity.ok().body(obj);
	}

	@PreAuthorize("hasAnyRole('ADMIN','WRITE_ENTRACEEXIT')")
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<EntraceExit> insert(@Valid @RequestBody EntraceExitDTO objDto) {
		EntraceExit obj = service.fromDTO(objDto);
		obj = service.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}

	@PreAuthorize("hasAnyRole('ADMIN','WRITE_ENTRACEEXIT')")
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<EntraceExit> update(@Valid @RequestBody EntraceExitDTO objDto,
			@PathVariable Long id) {
		EntraceExit obj = service.fromDTO(objDto);
		obj.setId(id);
		obj = service.update(obj);
		return ResponseEntity.noContent().build();
	}

	@PreAuthorize("hasAnyRole('ADMIN','WRITE_ENTRACEEXIT')")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

	@PreAuthorize("hasAnyRole('ADMIN','READ_ENTRACEEXIT')")
	@RequestMapping(value = "/page", method = RequestMethod.GET)
	public ResponseEntity<Page<EntraceExitDTO>> findPage(
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "24") Integer linesPerPage,
			@RequestParam(value = "orderBy", defaultValue = "unit") String orderBy,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction) {
		Page<EntraceExit> list = service.findPage(page, linesPerPage, orderBy, direction);
		Page<EntraceExitDTO> listDto = list.map(obj -> new EntraceExitDTO(obj));
		return ResponseEntity.ok().body(listDto);
	}
}
