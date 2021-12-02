import * as Styled from './styles';

export type FooterProps = {
  title?: string;
};

export const Footer = ({ title }: FooterProps) => {
  return (
    <Styled.Wrapper className="row align-items-center justify-content-center text-center border-top ">
      <div className="col-sm-3">
        <a href="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
          <svg className="bi me-2" width="40" height="32">
            <use xlinkHref="#bootstrap"></use>
          </svg>
        </a>
        <p className="text-muted">© 2021</p>
      </div>

      <div className="col-sm-3">
        <h2>Section</h2>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              Home
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              Features
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              Pricing
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              FAQs
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              About
            </a>
          </li>
        </ul>
      </div>

      <div className="col-sm-3">
        <h2>Section</h2>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              Home
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              Features
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              Pricing
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              FAQs
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              About
            </a>
          </li>
        </ul>
      </div>

      <div className="col-sm-3">
        <h2>Section</h2>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              Home
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              Features
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              Pricing
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              FAQs
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              About
            </a>
          </li>
        </ul>
      </div>
    </Styled.Wrapper>
  );
};
