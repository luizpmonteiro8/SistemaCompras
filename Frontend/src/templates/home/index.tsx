import { Base } from '../base';
import * as Styled from '../entraceexit/styles';
import Home from 'components/home';

export const HomeTp = () => {
  return (
    <Styled.Wrapper>
      <Base>
        <Home />
      </Base>
    </Styled.Wrapper>
  );
};
