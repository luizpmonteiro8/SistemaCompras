package com.mensal.compras.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.HandlerMapping;

import com.mensal.compras.dto.ItemPurchasesDTO;
import com.mensal.compras.dto.PurchasesDTO;
import com.mensal.compras.entity.ItemPurchases;
import com.mensal.compras.entity.Market;
import com.mensal.compras.entity.Product;
import com.mensal.compras.entity.Purchases;
import com.mensal.compras.entity.Stock;
import com.mensal.compras.entity.enums.PurchasesStatus;
import com.mensal.compras.repositories.ItemPurchasesRepository;
import com.mensal.compras.repositories.MarketRepository;
import com.mensal.compras.repositories.ProductRepository;
import com.mensal.compras.repositories.PurchasesRepository;
import com.mensal.compras.repositories.StockRepository;
import com.mensal.compras.services.exception.DataIntegrityException;
import com.mensal.compras.services.exception.ObjectNFException;

@Service
public class PurchasesService {
	@Autowired
	private PurchasesRepository repo;

	@Autowired
	private MarketRepository marketRepo;

	@Autowired
	private ItemPurchasesRepository itemRepo;

	@Autowired
	private ProductRepository productRepo;

	@Autowired
	private StockRepository stockRepo;

	@Autowired
	private HttpServletRequest request;
	
	//@Autowired
	//private EmailService emailService;

	public Purchases findById(Long id) {
		Optional<Purchases> obj = repo.findById(id);

		return obj.orElseThrow(() -> new ObjectNFException("Venda não encontrado! Id: " + id));
	}

	public List<Purchases> findAll() {
		List<Purchases> list = repo.findAll();
		return list;
	}

	@Transactional
	public Purchases insert(Purchases obj) {
		obj.setId(null);

		List<Stock> stockList = new ArrayList<>();

		try {
			obj = repo.save(obj);
			for (ItemPurchases item : obj.getItemPurchaseList()) {
				item.setPurchase(obj);
				item.getStock().addStock(item.getQuantity());
				stockList.add(item.getStock());
			}
			itemRepo.saveAll(obj.getItemPurchaseList());
			if(obj.getStatus().contains(PurchasesStatus.DELIVERED.getDisplayName())) {
				stockRepo.saveAll(stockList);
			}
			
		} 
		catch (DataIntegrityViolationException e) {
			if (e.getMostSpecificCause().getMessage().contains("Unique")) {
				throw new DataIntegrityException("Venda já cadastrada!");
			}

		}
		
		//emailService.sendOrderConfirmationHtmlEmail(obj);
		return obj;
	}

	@Transactional
	public Purchases update(Purchases obj) {
		Purchases newObj = findById(obj.getId());
		
		try {
			for (ItemPurchases item : newObj.getItemPurchaseList()) {
				itemRepo.delete(item);
			}
		}
		catch (Exception e) {
			throw new DataIntegrityException("Erro ao alterar compra!");
		}
		
		
		newObj = updateData(newObj, obj);

		List<Stock> stockList = new ArrayList<>();

		try {
			obj = repo.save(newObj);
			for (ItemPurchases item : newObj.getItemPurchaseList()) {
				item.setPurchase(obj);
				item.getStock().addStock(item.getQuantity());
				stockList.add(item.getStock());
			}
			//itemRepo.saveAll(newObj.getItemPurchaseList());
			if(obj.getStatus().contains(PurchasesStatus.DELIVERED.getDisplayName())) {
				stockRepo.saveAll(stockList);
			}
		} catch (DataIntegrityViolationException e) {
			if (e.getMostSpecificCause().getMessage().contains("Unique")) {
				throw new DataIntegrityException("Venda já cadastrada!");
			}

		}
		return obj;
	}

	private Purchases updateData(Purchases newObj, Purchases obj) {
		return Purchases.builder().id(obj.getId()).date(obj.getDate())
				.itemPurchaseList(obj.getItemPurchaseList()).market(obj.getMarket())
				.status(PurchasesStatus.toEnum(obj.getStatus()).getId()).build();

	}

	@Transactional
	public void delete(Long id) {
		Purchases purchases = repo.findById(id).get();

		try {
			if(purchases.getStatus().contains("Em rota")) {
				repo.deleteById(id);
			}else {
				throw new DataIntegrityException(
						"Não é possível excluir a venda que já foi entregue!");
			}			
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException(
					"Não é possível excluir a venda!");
		}
	}

	public Page<Purchases> findPage(Integer page, Integer linesPerPage, String orderBy,
			String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction),
				orderBy);
		return repo.findAll(pageRequest);
	}

	public Purchases fromDTO(PurchasesDTO objDTO) {
		Market market = marketRepo.findById(objDTO.getMarketId()).get();

		List<ItemPurchases> itemPurchasesList = new ArrayList<ItemPurchases>();
		for (ItemPurchasesDTO itemDTO : objDTO.getItemPurchaseDTOList()) {
			Product product = productRepo.findById(itemDTO.getProductId()).get();
			ItemPurchases itemPurchases = new ItemPurchases();
			itemPurchases.setValidaty(itemDTO.getValidaty());
			itemPurchases.setPrice(itemDTO.getPrice());
			itemPurchases.setStock(stockRepo.findByProduct(product));
			itemPurchases.setQuantity(itemDTO.getQuantity());
			itemPurchasesList.add(itemPurchases);
		}

		return Purchases.builder().itemPurchaseList(itemPurchasesList).market(market)
				.status(objDTO.getStatus()).date(objDTO.getDate()).build();
	}

	public Purchases fromDTOUpdate(PurchasesDTO objDTO) {
		@SuppressWarnings("unchecked")
		Map<String, String> map = (Map<String, String>) request
				.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
		Long uriId = Long.parseLong(map.get("id"));

		Market market = marketRepo.findById(objDTO.getMarketId()).get();

		Purchases purchases = findById(uriId);
		Date date = purchases.getDate();

		List<ItemPurchases> itemPurchasesList = new ArrayList<ItemPurchases>();
		for (ItemPurchasesDTO itemDTO : objDTO.getItemPurchaseDTOList()) {
			Product product = productRepo.findById(itemDTO.getProductId()).get();
			ItemPurchases itemPurchases = new ItemPurchases();
			itemPurchases.setValidaty(itemDTO.getValidaty());
			itemPurchases.setPrice(itemDTO.getPrice());
			itemPurchases.setStock(stockRepo.findByProduct(product));
			itemPurchases.setQuantity(itemDTO.getQuantity());
			itemPurchases.setPurchase(purchases);
			itemPurchasesList.add(itemPurchases);
		}

		return Purchases.builder().itemPurchaseList(itemPurchasesList).market(market)
				.status(objDTO.getStatus()).date(date).build();
	}
}
