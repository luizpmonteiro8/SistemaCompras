import { useState, useEffect, useContext } from 'react';
import { Product } from 'app/models/product';
import { useProductService } from 'app/services';
import { ProductForm } from './form';
import { useRouter } from 'next/dist/client/router';
import { mensagemErro, mensagemSucesso } from 'components';
import { ProductDTO } from 'app/models/productDTO';

export const ProductRegistration = () => {
  const service = useProductService();
  const [product, setProduct] = useState<ProductDTO>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      service.loadProductDto(id).then((productFind) => setProduct(productFind));
    }
  }, [id]);

  const handleSubmit = (product: ProductDTO) => {
    if (product.id > 0) {
      service
        .update(product)
        .then((productSalvo) => {
          mensagemSucesso('Alterado com sucesso!');
        })
        .catch((e) => {
          mensagemErro(e.response.data.message);
        });
    } else {
      service
        .save(product)
        .then((response) => {
          mensagemSucesso('Salvo com sucesso!');
          router.replace('/cadastros/produtos?id=' + response.location.split('/')[4]);
        })
        .catch((e) => {
          mensagemErro(e.response.data.message);
        });
    }
    router.replace('/cadastros/produtos');
  };

  return (
    <div className="card bg-light my-2 mx-auto col-md-8" style={{}}>
      <h4 className="card-header ">Produto</h4>
      <ProductForm product={product} onSubmit={handleSubmit} />
      <div className="card-body"></div>
    </div>
  );
};
