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

import com.mensal.compras.dto.MarketDTO;
import com.mensal.compras.entity.Market;
import com.mensal.compras.services.MarketService;

@RestController
@RequestMapping(value = "/market")
public class MarketController {

	@Autowired
	private MarketService service;

	@PreAuthorize("hasAnyRole('ADMIN','READ_MARKET')")
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<MarketDTO>> findAll() {
		List<Market> list = service.findAll();
		List<MarketDTO> listDto = list.stream().map(obj -> new MarketDTO(obj))
				.collect(Collectors.toList());
		return ResponseEntity.ok().body(listDto);
	}

	@PreAuthorize("hasAnyRole('ADMIN','READ_MARKET')")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Market> findById(@PathVariable Long id) {
		Market obj = service.findById(id);
		return ResponseEntity.ok().body(obj);
	}

	@PreAuthorize("hasAnyRole('ADMIN','WRITE_MARKET')")
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Market> insert(@Valid @RequestBody MarketDTO objDto) {
		Market obj = service.fromDTO(objDto);
		obj = service.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}

	@PreAuthorize("hasAnyRole('ADMIN','WRITE_MARKET')")
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Market> update(@Valid @RequestBody MarketDTO objDto,
			@PathVariable Long id) {
		Market obj = service.fromDTO(objDto);
		obj.setId(id);
		obj = service.update(obj);
		return ResponseEntity.noContent().build();
	}

	@PreAuthorize("hasAnyRole('ADMIN','WRITE_MARKET')")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

	@PreAuthorize("hasAnyRole('ADMIN','READ_MARKET')")
	@RequestMapping(value = "/page", method = RequestMethod.GET)
	public ResponseEntity<Page<MarketDTO>> findPage(
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "24") Integer linesPerPage,
			@RequestParam(value = "orderBy", defaultValue = "unit") String orderBy,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction) {
		Page<Market> list = service.findPage(page, linesPerPage, orderBy, direction);
		Page<MarketDTO> listDto = list.map(obj -> new MarketDTO(obj));
		return ResponseEntity.ok().body(listDto);
	}
}
