export type itemPurchaseDTO = {
  id: number;
  quantity: number;
  validaty: Date;
  price: number;
  productId: number;
};

export type PurchasesDTO = {
  id?: number;
  marketId: number;
  status: string;
  date: Date;
  itemPurchaseDTOList: itemPurchaseDTO[];
};
