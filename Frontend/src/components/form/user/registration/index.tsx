import { useState, useEffect, useContext } from 'react';
import { User } from 'app/models/user';
import { useUserService } from 'app/services';
import { UserForm } from './form';
import { useRouter } from 'next/dist/client/router';
import { messageError, messageSucess } from 'components';

export const UserRegistration = () => {
  const service = useUserService();
  const [user, setUser] = useState<User>({ id: 0, name: '', email: '', password: '' });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      service.loadUser(id).then((userFind) => setUser(userFind));
    }
  }, [id]);

  const handleSubmit = (user: User) => {
    service
      .save(user)
      .then((userSalvo) => {
        setUser(userSalvo);
        messageSucess('Salvo com sucesso!');
        router.push('/');
      })
      .catch((e) => {
        messageError(e.response.data.message);
      });
  };

  return (
    <div className="card bg-light my-2 mx-auto col-8" style={{}}>
      <h4 className="card-header ">Usuário</h4>

      <div className="card-body"></div>
      <UserForm user={user} onSubmit={handleSubmit} />
    </div>
  );
};
