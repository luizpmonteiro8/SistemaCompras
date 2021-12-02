package com.mensal.compras.controlleres;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mensal.compras.dto.PurchasesDTO;
import com.mensal.compras.entity.Purchases;
import com.mensal.compras.services.PurchasesReportService;
import com.mensal.compras.services.PurchasesService;

@RestController
@RequestMapping(value = "/purchases")
public class PurchasesController {

	@Autowired
	private PurchasesService service;
	
	@Autowired
	private PurchasesReportService reportService;

	@PreAuthorize("hasAnyRole('ADMIN','READ_PURCHASES')")
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Purchases>> findAll() {
		List<Purchases> list = service.findAll();		
		return ResponseEntity.ok().body(list);
	}

	@PreAuthorize("hasAnyRole('ADMIN','READ_PURCHASES')")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Purchases> findById(@PathVariable Long id) {
		Purchases obj = service.findById(id);
		return ResponseEntity.ok().body(obj);
	}

	@PreAuthorize("hasAnyRole('ADMIN','WRITE_PURCHASES')")
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Purchases> insert(@Valid @RequestBody PurchasesDTO objDto) {
		Purchases obj = service.fromDTO(objDto);
		obj = service.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}

	@PreAuthorize("hasAnyRole('ADMIN','WRITE_PURCHASES')")
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Purchases> update(@Valid @RequestBody PurchasesDTO objDto,
			@PathVariable Long id) {
		Purchases obj = service.fromDTOUpdate(objDto);
		obj.setId(id);
		obj = service.update(obj);
		return ResponseEntity.noContent().build();
	}

	@PreAuthorize("hasAnyRole('ADMIN','WRITE_PURCHASES')")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

	@PreAuthorize("hasAnyRole('ADMIN','READ_PURCHASES')")
	@RequestMapping(value = "/page", method = RequestMethod.GET)
	public ResponseEntity<Page<Purchases>> findPage(
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "24") Integer linesPerPage,
			@RequestParam(value = "orderBy", defaultValue = "unit") String orderBy,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction) {
		Page<Purchases> list = service.findPage(page, linesPerPage, orderBy, direction);		
		return ResponseEntity.ok().body(list);
	}
	
	@RequestMapping(value = "/report", method = RequestMethod.GET)
	public ResponseEntity<byte[]>  report() {
		var relatorioGerado = reportService.gerarRelatorio(0L, null, null);
		var headers = new HttpHeaders();
		var fileName = "relatorio-vendas.pdf";
		headers.setContentDispositionFormData("inline; filename=\"" +fileName+ "\"", fileName);
		headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
		var responseEntity = new ResponseEntity<>(relatorioGerado, headers, HttpStatus.OK);
		return responseEntity;
	}
}
