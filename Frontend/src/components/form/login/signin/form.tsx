import { useFormik } from 'formik';
import { Input, InputPassword } from 'components/common/input';
import { useEffect, useState } from 'react';
import { Credential, EmailDTO } from 'app/models/user';
import { validationScheme } from './validationScheme';
import * as Styled from './styles';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export type LoginFormProps = {
  onSubmit: (credential: Credential) => void;
  forgotPassword: (emailDTO: EmailDTO) => void;
};

const formSchema = {
  email: 'teste@teste.com.br',
  password: '12345678',
};

export const LoginForm = ({ onSubmit, forgotPassword }: LoginFormProps) => {
  const [email, setEmail] = useState<EmailDTO>({ email: '' });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const formik = useFormik<Credential>({
    initialValues: { ...formSchema },
    onSubmit,
    validationSchema: validationScheme,
  });

  useEffect(() => {
    return null;
  }),
    [];

  return (
    <Styled.Form>
      <form className="form-group" onSubmit={formik.handleSubmit}>
        <div>
          <div className="row m-2">
            <div className="col-md-12 ">
              <Input
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                label="Email"
                error={formik.touched.email ? formik.errors.email : ''}
              />
            </div>
            <div className=" col-md-12 ">
              <InputPassword
                id="password"
                label="Senha"
                onChange={formik.handleChange}
                name="password"
                value={formik.values.password}
                error={formik.touched.password ? formik.errors.password : ''}
              />
              <div className="row justify-content-center mt-2">
                <div className="col-md-8  text-center ">
                  <button type="submit" className="btn btn-primary">
                    Entrar
                  </button>
                  <a className="btn btn-danger ms-2" href="/cadastros/usuario">
                    Cadastrar
                  </a>
                  <a className="btn btn-info ms-2" onClick={handleShow}>
                    Recuperar senha
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recuperar senha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            id="email"
            name="email"
            type="email"
            value={email.email}
            onChange={(e) => {
              setEmail({ email: e.target.value });
            }}
            label="Email"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              forgotPassword(email);
              handleClose();
            }}
          >
            Enviar
          </Button>
          <Button variant="info" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </Styled.Form>
  );
};
