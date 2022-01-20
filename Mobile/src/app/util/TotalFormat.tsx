const totalFormat = (number: number, number2: number) => {
  const formCurrency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(
    Number(number.toString().replace(',', '.')) *
      Number(number2.toString().replace(',', '.')),
  );

  return formCurrency;
};

export default totalFormat;
