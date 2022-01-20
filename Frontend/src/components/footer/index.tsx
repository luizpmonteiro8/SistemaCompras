import * as Styled from './styles';

export type FooterProps = {
  title?: string;
};

export const Footer = ({ title }: FooterProps) => {
  return (
    <Styled.Wrapper className="row align-items-center justify-content-center text-center border-top ">
      <div className="col-md-1">
        <a href="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
          <svg className="bi me-2" width="40" height="32">
            <use xlinkHref="#bootstrap"></use>
          </svg>
        </a>
        <p className="text-muted">© 2021</p>
      </div>

      <div className="col-md-11">
        <h2>Criado por Luiz Pedro</h2>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              Linkiedn
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              Email
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              Zap
            </a>
          </li>
        </ul>
      </div>
    </Styled.Wrapper>
  );
};
