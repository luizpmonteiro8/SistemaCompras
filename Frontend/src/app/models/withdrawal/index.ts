export type itemWithdrawalDTOList = {
  id: string;
  quantity: string;
  productId: number;
};

export type Withdrawal = {
  itemWithdrawalDTOList: itemWithdrawalDTOList[];
};
