import { useState, useEffect, useContext } from 'react';
import { Product } from 'app/models/product';
import { useProductService } from 'app/services';
import { ProductForm } from './form';
import { useRouter } from 'next/dist/client/router';
import { messageError, messageSucess } from 'components';
import { ProductDTO } from 'app/models/productDTO';
import { SaveProduct, UpdateProduct } from 'store/actions/product';
import { LoadAllCategory } from 'store/actions/category';
import { connect, ConnectedProps } from 'react-redux';
import { Category } from 'app/models/category';

type Props = PropsFromRedux;

const ProductRegistration = (props: Props) => {
  const service = useProductService();
  const [product, setProduct] = useState<ProductDTO>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    props.loadCategory();
    if (id) {
      service.loadProductDto(id).then((productFind) => setProduct(productFind));
    }
  }, [id]);

  const handleSubmit = async (product: ProductDTO, { resetForm, setValues }) => {
    try {
      if (product.id > 0) {
        const returnValue = await props.updateProduct(product);
        if (returnValue) {
          resetForm();
          setValues({ id: '', name: '', blocked: '', quantMin: '', categoryId: null });
          router.replace('/cadastros/produtos');
          messageSucess('Alterado com sucesso.');
        }
      } else {
        const returnValue = await props.saveProduct(product);
        if (returnValue) {
          resetForm();
          messageSucess('Salvo com sucesso.');
        }
      }
    } catch (err) {
      messageError(err.message);
    }
  };

  return (
    <div className="card bg-light my-2 mx-auto col-md-8" style={{}}>
      <h4 className="card-header ">Produto</h4>
      <ProductForm product={product} onSubmit={handleSubmit} category={props.category} />
      <div className="card-body"></div>
    </div>
  );
};

const mapStateToProps = ({ product, category }) => {
  return {
    product: product.product as Product[],
    category: category.category as Category[],
    isLoading: product.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProduct: (product: ProductDTO) => dispatch(SaveProduct(product)),
    updateProduct: (product: ProductDTO) => dispatch(UpdateProduct(product)),
    loadCategory: () => dispatch(LoadAllCategory()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(ProductRegistration);
