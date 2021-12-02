export type itemPurchaseDTO = {
  id: number;
  quantity: number;
  validaty: string;
  price: number;
  productId: number;
};

export type PurchasesDTO = {
  id?: number;
  marketId: number;
  status: string;
  itemPurchaseDTOList: itemPurchaseDTO[];
};
