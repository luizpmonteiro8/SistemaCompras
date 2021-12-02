import { useState, useEffect, useContext } from 'react';
import { Category } from 'app/models/category';
import { useCategoryService } from 'app/services';
import { CategoryForm } from './form';
import { useRouter } from 'next/dist/client/router';
import { mensagemErro, mensagemSucesso } from 'components';

export const CategoryRegistration = () => {
  const service = useCategoryService();
  const [category, setCategory] = useState<Category>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      service.loadCategory(id).then((categoryFind) => setCategory(categoryFind));
    }
  }, [id]);

  const handleSubmit = (category: Category) => {
    if (category.id > 0) {
      service
        .update(category)
        .then((categorySalvo) => {
          mensagemSucesso('Alterado com sucesso!');
        })
        .catch((e) => {
          mensagemErro(e.response.data.message);
        });
    } else {
      service
        .save(category)
        .then((response) => {
          mensagemSucesso('Salvo com sucesso!');
          router.replace('/cadastros/categorias?id=' + response.location.split('/')[4]);
        })
        .catch((e) => {
          mensagemErro(e.response.data.message);
        });
    }
    router.replace('/cadastros/categorias');
  };

  return (
    <div className="card bg-light my-2 mx-auto col-md-8" style={{}}>
      <h4 className="card-header ">Categoria</h4>
      <CategoryForm category={category} onSubmit={handleSubmit} />
      <div className="card-body"></div>
    </div>
  );
};
