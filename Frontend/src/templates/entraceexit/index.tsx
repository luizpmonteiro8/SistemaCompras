import { Base } from '../base';
import * as Styled from './styles';
import EntraceExitRegistration from 'components/form/entraceexit/registration';
import EntraceExitListing from 'components/form/entraceexit/listing';

export const EntraceExitTp = () => {
  return (
    <Styled.Wrapper>
      <Base>
        <EntraceExitRegistration />
        <EntraceExitListing />
      </Base>
    </Styled.Wrapper>
  );
};
