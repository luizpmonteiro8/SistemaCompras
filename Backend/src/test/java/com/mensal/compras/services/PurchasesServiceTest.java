package com.mensal.compras.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchThrowableOfType;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.servlet.HandlerMapping;

import com.mensal.compras.controllers.PurchasesControllerTest;
import com.mensal.compras.dto.PurchasesDTO;
import com.mensal.compras.entity.Market;
import com.mensal.compras.entity.Product;
import com.mensal.compras.entity.Purchases;
import com.mensal.compras.entity.enums.PurchasesStatus;
import com.mensal.compras.repositories.ItemPurchasesRepository;
import com.mensal.compras.repositories.MarketRepository;
import com.mensal.compras.repositories.ProductRepository;
import com.mensal.compras.repositories.PurchasesRepository;
import com.mensal.compras.repositories.PurchasesRepositoryTest;
import com.mensal.compras.repositories.StockRepository;
import com.mensal.compras.services.exception.DataIntegrityException;
import com.mensal.compras.services.exception.ObjectNFException;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
public class PurchasesServiceTest {

	@Mock
	StockRepository strockrepository;

	@Mock
	ItemPurchasesRepository itemRepository;

	@Mock
	PurchasesRepository repository;

	@Mock
	MarketRepository marketRepository;

	@Mock
	ProductRepository productRepository;

	@Mock
	HttpServletRequest request;
	
	@Mock
	EmailService emailService;
	
	@InjectMocks
	PurchasesService service;

	@Test
	public void shouldSavePurchases() {
		// scenario
		Purchases purchasesToSave = PurchasesRepositoryTest.createPurchases();

		Purchases purchasesSaved = PurchasesRepositoryTest.createPurchases();
		purchasesSaved.setId(1L);
		when(repository.save(purchasesToSave)).thenReturn(purchasesSaved);
		doNothing().when(emailService).sendOrderConfirmationHtmlEmail(any(Purchases.class));

		// action
		Purchases purchases = service.insert(purchasesToSave);

		// verification
		assertThat(purchases.getId()).isEqualTo(1L);

	}

	@Test
	public void shouldUpdatePurchases() {
		// scenario
		Purchases purchasesSaved = PurchasesRepositoryTest.createPurchases();
		purchasesSaved.setId(1l);

		when(repository.findById(purchasesSaved.getId())).thenReturn(Optional.of(purchasesSaved));
		when(repository.save(purchasesSaved)).thenReturn(purchasesSaved);

		// execution
		service.update(purchasesSaved);

		// verification
		verify(repository, times(1)).save(purchasesSaved);

	}

	@Test
	public void shouldThrowErrorWhenTryingtoUpdateAPurchaseThatHasntBeenSaved() {
		// scenario
		Purchases purchasesToSave = PurchasesRepositoryTest.createPurchases();
		purchasesToSave.setId(1l);
		//doThrow(new DataIntegrityViolationException("Venda não encontrado! Id: 1")).when(repository).findById(1l);

		// execution
		ObjectNFException result = catchThrowableOfType(() -> service.update(purchasesToSave),
				ObjectNFException.class);

		// verification
		assertThat(result.getMessage()).isEqualTo("Venda não encontrado! Id: 1");

	}

	@Test
	public void shouldDeletePurchase() {
		// scenario
		Purchases purchases = PurchasesRepositoryTest.createPurchases();
		purchases.setId(1l);
		purchases.setStatus(PurchasesStatus.PENDING);
		when(repository.findById(purchases.getId())).thenReturn(Optional.of(purchases));
		doNothing().when(repository).deleteById(purchases.getId());

		// execution
		service.delete(purchases.getId());

		// verification
		verify(repository).deleteById(purchases.getId());
	}

	@Test
	public void shouldnotDeletePurchaseWithStatusDelivered() {
		// scenario
		Purchases purchases = PurchasesRepositoryTest.createPurchases();
		purchases.setId(1l);
		purchases.setStatus(PurchasesStatus.DELIVERED);
		when(repository.findById(purchases.getId())).thenReturn(Optional.of(purchases));

		// execution
		DataIntegrityException result = catchThrowableOfType(() -> service.delete(purchases.getId()),
				DataIntegrityException.class);

		// verification
		assertThat(result.getMessage()).isEqualTo("Não é possível excluir a venda que já foi entregue!");
	}

	@Test
	public void shouldThrowErrorWhenTryingtoDeleteAPurchase() {
		// scenario
		Purchases purchasesToDelete = PurchasesRepositoryTest.createPurchases();
		purchasesToDelete.setId(1l);
		purchasesToDelete.setStatus(PurchasesStatus.PENDING);

		when(repository.findById(purchasesToDelete.getId())).thenReturn(Optional.of(purchasesToDelete));
		doThrow(DataIntegrityViolationException.class).when(repository).deleteById(1l);

		// execution
		DataIntegrityException result = catchThrowableOfType(() -> service.delete(1l), DataIntegrityException.class);

		// verification
		assertThat(result.getMessage()).isEqualTo("Não é possível excluir a venda!");

	}

	@Test
	public void shouldReturnAllPurchases() {
		// scenario
		Purchases purchases = PurchasesRepositoryTest.createPurchases();
		purchases.setId(1l);

		List<Purchases> list = Arrays.asList(purchases);
		when(repository.findAll()).thenReturn(list);

		// execution
		List<Purchases> result = service.findAll();

		// verification
		assertThat(result).isNotEmpty().hasSize(1).contains(purchases);

	}

	@Test
	public void shouldReturnAllPurchasesPagination() {
		// scenario
		Purchases purchases = PurchasesRepositoryTest.createPurchases();
		purchases.setId(1l);

		List<Purchases> list = Arrays.asList(purchases);
		when(repository.findAll(any(PageRequest.class))).thenReturn(Page.empty());

		// execution
		Page<Purchases> result = service.findPage(0, 24, "id", "ASC");

		// verification
		assertThat(result).isEmpty();

	}

	@Test
	public void shouldReturnPurchasesReceivePurchasesDTO() {
		// scenario
		PurchasesDTO dto = PurchasesControllerTest.createPurchasesDto();
		Market market = Market.builder().id(1l).name("Test").cnpj(12345678912345l).blocked(false).build();
		when(marketRepository.findById(any(Long.class))).thenReturn(Optional.of(market));
		Product product = Product.builder().id(1l).name("test").build();
		when(productRepository.findById(any(Long.class))).thenReturn(Optional.of(product));

		// execution
		Purchases result = service.fromDTO(dto);

		// verification
		assertThat(result).isInstanceOf(Purchases.class);

	}

	@Test
	public void shouldReturnPurchasesReceivePurchasesDTOUpdate() {
		// scenario		
		PurchasesDTO dto = PurchasesControllerTest.createPurchasesDto();
		Market market = Market.builder().id(1l).name("Test").cnpj(12345678912345l).blocked(false).build();
		when(marketRepository.findById(any(Long.class))).thenReturn(Optional.of(market));
		Product product = Product.builder().id(1l).name("test").build();
		when(productRepository.findById(any(Long.class))).thenReturn(Optional.of(product));
		when(repository.findById(any(Long.class))).thenReturn(Optional.of(PurchasesRepositoryTest.createPurchases()));

		Map<String, String> map = new HashMap<>();
		map.put("id","1");
		when(request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE)).thenReturn(map);
		
		// execution
		Purchases result = service.fromDTOUpdate(dto);

		// verification
		assertThat(result).isInstanceOf(Purchases.class);

	}
	
	@Test
	public void shouldThrowErrorWhenTryingtoSendEmail() {
		// scenario
		Purchases purchasesToSave = PurchasesRepositoryTest.createPurchases();

		Purchases purchasesSaved = PurchasesRepositoryTest.createPurchases();
		purchasesSaved.setId(1L);
		when(repository.save(purchasesToSave)).thenReturn(purchasesSaved);
		doThrow(DataIntegrityViolationException.class).when(emailService).sendOrderConfirmationHtmlEmail(purchasesToSave);

		// action
		DataIntegrityViolationException result = catchThrowableOfType(() -> service.insert(purchasesToSave), DataIntegrityViolationException.class);


		// verification
		//assertThat(result.getMessage()).isEqualTo("Não é possível excluir a venda!");
		assertThat(result).isNull();
	}

}
