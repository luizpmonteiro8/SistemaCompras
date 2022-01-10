/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Category } from 'app/models/category';
import { CategoryForm } from './form';
import { useRouter } from 'next/dist/client/router';
import { SaveCategory, UpdateCategory } from 'store/actions/category';
import { connect, ConnectedProps } from 'react-redux';
import { messageError, messageSucess } from 'components';

interface Props extends PropsFromRedux {
  router: any;
}

const CategoryRegistration = (props: Props) => {
  const [category, setCategory] = useState<Category>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      setCategory(JSON.parse(props.router.query.data));
    }
  }, [id]);

  const handleSubmit = async (categoryNew: Category, { resetForm, setValues }) => {
    try {
      if (categoryNew.id > 0) {
        const returnValue = await props.updateCategory(categoryNew);
        if (returnValue) {
          resetForm();
          setValues({ id: '', name: '' });
          router.replace('/cadastros/categorias');
          messageSucess('Alterado com sucesso.');
        }
      } else {
        const returnValue = await props.saveCategory(categoryNew);
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
      <h4 className="card-header ">Categoria</h4>
      <CategoryForm category={category} onSubmit={handleSubmit} isLoading={props.isLoading} />
      <div className="card-body"></div>
    </div>
  );
};

const mapStateToProps = ({ category }) => {
  return {
    category: category.category as Category[],
    isLoading: category.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveCategory: (category: Category) => dispatch(SaveCategory(category)),
    updateCategory: (category: Category) => dispatch(UpdateCategory(category)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(CategoryRegistration);
