/* eslint-disable react-hooks/exhaustive-deps */
import { Category } from 'app/models/category';
import { Product } from 'app/models/product';
import { EntraceExit } from 'app/models/entraceexit';
import * as Styled from './styles';
import { LoadAllCategory } from 'store/actions/category';
import { LoadAllProduct } from 'store/actions/product';
import { connect, ConnectedProps } from 'react-redux';
import { EntraceExitForm } from './form';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SaveEntraceExit, UpdateEntraceExit } from 'store/actions/entraceexit';

type Props = PropsFromRedux;
const EntraceExitRegistration = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const [entraceExit, setEntraceExit] = useState<EntraceExit>();

  useEffect(() => {
    props.loadAllCategory();
    props.loadAllProduct();

    if (id) {
      props.entraceexit.map((item) => {
        if (item.id === parseInt(id.toString())) {
          setEntraceExit(item);
        }
      });
    }
  }, [id, props.entraceexit]);

  const handleSubmit = async (entraceExitNew: EntraceExit, { resetForm, setValues }) => {
    if (entraceExitNew.id > 0) {
      if (await props.updateEntraceExit(entraceExitNew)) {
        resetForm();
        setValues({ id: '', productId: 0, quantity: 0, type: null });
        router.replace('/cadastros/entradasaida');
      }
    } else {
      if (await props.saveEntraceExit(entraceExitNew)) {
        resetForm();
      }
    }
  };

  const filterProductByCategory = (idCategory) => {
    return props.product.filter((item) => {
      if (item.category.id === idCategory) return item;
    });
  };

  return (
    <Styled.Wrapper>
      <div className="card bg-light my-2 mx-auto col-md-8" style={{}}>
        <h4 className="card-header ">Item da compra</h4>
        <div className="card-body">
          <EntraceExitForm
            category={props.category}
            product={props.product}
            filterProductByCategory={filterProductByCategory}
            entraceExit={entraceExit}
            onSubmit={handleSubmit}
            isLoading={props.isLoading}
          />
        </div>
      </div>
    </Styled.Wrapper>
  );
};

const mapStateToProps = ({ category, product, entraceExit }) => {
  return {
    entraceexit: entraceExit.entraceExit as EntraceExit[],
    category: category.category as Category[],
    product: product.product as Product[],
    isLoading: entraceExit.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllCategory: () => dispatch(LoadAllCategory()),
    loadAllProduct: () => dispatch(LoadAllProduct()),
    saveEntraceExit: (entraceExit) => dispatch(SaveEntraceExit(entraceExit)),
    updateEntraceExit: (entraceExit) => dispatch(UpdateEntraceExit(entraceExit)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(EntraceExitRegistration);
