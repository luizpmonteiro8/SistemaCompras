import { Base } from '../base';
import * as Styled from '../entraceexit/styles';
import EntraceExitRegistration from 'components/form/entraceexit/registration';
import EntraceExitListing from 'components/form/entraceexit/listing';
import { useEffect } from 'react';

export const EntraceExitTp = () => {
  useEffect(() => {
    document.title = 'Sistema compras - Entrada e saida';
  }, []);
  return (
    <Styled.Wrapper>
      <Base>
        <EntraceExitRegistration />
        <EntraceExitListing />
      </Base>
    </Styled.Wrapper>
  );
};
