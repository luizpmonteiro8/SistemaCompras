import * as Styled from './styles';

export type CardInfoProps = {
  productCount: number;
  purchasesCount: number;
};

export const CardInfo = ({ productCount, purchasesCount }: CardInfoProps) => {
  return (
    <Styled.Card className="card bg-light mx-auto col-sm-3">
      <h4 className="card-header ">Cadastros</h4>
      <div className="card-body">
        Produtos: {productCount} <br />
        Compras: {purchasesCount}
      </div>
    </Styled.Card>
  );
};
