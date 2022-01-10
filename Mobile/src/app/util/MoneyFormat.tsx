const formatMoney = (number: number) => {
  const formCurrency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(Number(number.toString().replace(',', '.')));

  return formCurrency;
};

export default formatMoney;
