import * as Styled from './styles';
import { useRouter } from 'next/dist/client/router';
import { signOut } from 'next-auth/react';

export type MenuProps = {
  title?: string;
};

export const Menu = ({ title }: MenuProps) => {
  const router = useRouter();
  const logout = () => {
    signOut({ redirect: false });
    router.push('/');
  };

  return (
    <Styled.Wrapper>
      <div className="row">
        <div className="col-md-12">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="col-md-3 ms-1">
              <a className="navbar-brand" href="/">
                Controle de compras
              </a>
            </div>
            <div className="col-md-6">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarColor01"
                aria-controls="navbarColor01"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle h5"
                      data-bs-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Cadastrar/Listar
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="/cadastros/mercados">
                        Mercados
                      </a>
                      <a className="dropdown-item" href="/cadastros/categorias">
                        Categorias
                      </a>
                      <a className="dropdown-item" href="/cadastros/produtos">
                        Produtos
                      </a>
                      <a className="dropdown-item" href="/cadastros/entradasaida">
                        Entrada/Saida
                      </a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="/cadastros/usuario">
                        Usuário
                      </a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle h5"
                      data-bs-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Compras
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="/compras/cadastro">
                        Nova compras
                      </a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle h5"
                      data-bs-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Relatórios
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="/relatorios/estoque">
                        Estoque
                      </a>
                      <a className="dropdown-item" href="/compras/lista">
                        Compras
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <a className="button btn-link .text-light" onClick={() => logout()}>
                Sair
              </a>
            </div>
          </nav>
        </div>
      </div>
    </Styled.Wrapper>
  );
};
