import { Base } from '../base';
import * as Styled from '../entraceexit/styles';
import Home from 'components/home';
import { useEffect } from 'react';

export const HomeTp = () => {
  useEffect(() => {
    document.title = 'Sistema compras';
  }, []);
  return (
    <Styled.Wrapper>
      <Base>
        <Home />
      </Base>
    </Styled.Wrapper>
  );
};
