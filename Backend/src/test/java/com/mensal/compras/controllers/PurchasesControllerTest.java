package com.mensal.compras.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.contains;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.http.HttpHeaders;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lowagie.text.Header;
import com.mensal.compras.controlleres.PurchasesController;
import com.mensal.compras.dto.ItemPurchasesDTO;
import com.mensal.compras.dto.PurchasesDTO;
import com.mensal.compras.entity.Purchases;
import com.mensal.compras.entity.enums.Permissions;
import com.mensal.compras.entity.enums.PurchasesStatus;
import com.mensal.compras.repositories.PurchasesRepositoryTest;
import com.mensal.compras.security.JWTUtil;
import com.mensal.compras.security.UserSS;
import com.mensal.compras.services.PurchasesReportService;
import com.mensal.compras.services.PurchasesService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
@WebMvcTest(controllers = PurchasesController.class)
@AutoConfigureMockMvc
public class PurchasesControllerTest {

	static final String API = "/purchases";
	static final MediaType JSON = MediaType.APPLICATION_JSON;

	@Autowired
	MockMvc mvc;

	@MockBean
	PurchasesService service;

	@MockBean
	JWTUtil jwtUtil;

	@MockBean
	PurchasesReportService purchasesReportService;

	@Test
	@WithMockUser(username = "test", roles = { "ADMIN" })
	public void shouldCreateAPurchase() throws Exception {
		// scenario
		PurchasesDTO dto = createPurchasesDto();
		Purchases purchases = PurchasesRepositoryTest.createPurchases();
		purchases.setId(1l);

		Mockito.when(service.fromDTO(Mockito.any(PurchasesDTO.class))).thenReturn(purchases);
		Mockito.when(service.insert(Mockito.any(Purchases.class))).thenReturn(purchases);
		String json = new ObjectMapper().writeValueAsString(dto);

		// execution and verification
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.post(API).accept(JSON).contentType(JSON)
				.content(json);

		mvc.perform(request).andExpect(MockMvcResultMatchers.status().isCreated())
				.andExpect(MockMvcResultMatchers.redirectedUrl("http://localhost/purchases/1"));

	}

	@Test
	@WithMockUser(username = "test", roles = { "ADMIN" })
	public void shouldUpdateAPurchase() throws Exception {
		// scenario
		PurchasesDTO dto = createPurchasesDto();
		Purchases purchases = PurchasesRepositoryTest.createPurchases();
		purchases.setStatus(PurchasesStatus.PENDING);
		purchases.setId(1l);

		Mockito.when(service.fromDTOUpdate(Mockito.any(PurchasesDTO.class))).thenReturn(purchases);
		Mockito.when(service.update(Mockito.any(Purchases.class))).thenReturn(purchases);
		String json = new ObjectMapper().writeValueAsString(dto);

		// execution and verification
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.put(API + "/1").accept(JSON).contentType(JSON)
				.content(json);

		mvc.perform(request).andExpect(MockMvcResultMatchers.status().isNoContent());

	}

	@Test
	@WithMockUser(username = "test", roles = { "ADMIN" })
	public void shouldDeleteAPurchase() throws Exception {
		// scenario
		Mockito.doNothing().when(service).delete(1l);

		// execution and verification
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.delete(API + "/1").accept(JSON)
				.contentType(JSON);

		mvc.perform(request).andExpect(MockMvcResultMatchers.status().isNoContent());

	}

	@Test
	@WithMockUser(username = "test", roles = { "ADMIN" })
	public void shouldFindAllPurchases() throws Exception {
		// scenario
		Purchases purchases = PurchasesRepositoryTest.createPurchases();
		purchases.setId(1l);
		List<Purchases> list = Arrays.asList(purchases);
		Mockito.when(service.findAll()).thenReturn(list);

		// execution and verification
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.get(API).accept(JSON).contentType(JSON);

		mvc.perform(request).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json(asJsonString(list)));

	}

	@Test
	@WithMockUser(username = "test", roles = { "ADMIN" })
	public void shouldFindByIdPurchases() throws Exception {
		// scenario
		Purchases purchases = PurchasesRepositoryTest.createPurchases();
		purchases.setId(1l);

		Mockito.when(service.findById(1l)).thenReturn(purchases);

		// execution and verification
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.get(API + "/1").accept(JSON).contentType(JSON);

		mvc.perform(request).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json(asJsonString(purchases)));

	}

	@Test
	@WithMockUser(username = "test", roles = { "ADMIN" })
	public void shouldReturnPaginationPurchases() throws Exception {
		// scenario
		Purchases purchases = PurchasesRepositoryTest.createPurchases();
		purchases.setId(1l);
		List<Purchases> list = Arrays.asList(purchases);
		Mockito.when(service.findPage(any(Integer.class), any(Integer.class), any(String.class), any(String.class)))
				.thenReturn(Page.empty());

		// execution and verification
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.get(API + "/page").accept(JSON)
				.contentType(JSON);

		mvc.perform(request).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json(asJsonString(Page.empty())));

	}

	@Test
	@WithMockUser(username = "test", roles = { "ADMIN" })
	public void shouldReturnPDFAllPurchases() throws Exception {
		// scenario

		// execution and verification
		MockHttpServletRequestBuilder request = MockMvcRequestBuilders.get(API + "/report").accept(JSON)
				.contentType(JSON);

		mvc.perform(request).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.header().stringValues("Content-Disposition",
						"form-data; name=\"inline; filename=\"relatorio-vendas.pdf\"\"; filename=\"relatorio-vendas.pdf\""));
		;

	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public static PurchasesDTO createPurchasesDto() {
		ItemPurchasesDTO item = new ItemPurchasesDTO();
		item.setPrice(BigDecimal.valueOf(5));
		item.setProductId(1l);
		item.setQuantity(BigDecimal.valueOf(5.5));

		List<ItemPurchasesDTO> list = new ArrayList<ItemPurchasesDTO>();
		list.add(item);

		PurchasesDTO dto = new PurchasesDTO();
		dto.setDate(new Date());
		dto.setMarketId(1l);
		dto.setStatus(2);
		dto.setItemPurchaseDTOList(list);
		return dto;

	}

}
