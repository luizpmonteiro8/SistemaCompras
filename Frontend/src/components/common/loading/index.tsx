import * as Styled from './styles';

export const Loading = () => {
  return (
    <Styled.Loading>
      <Styled.Container>
        <div className="spinner-grow text-light spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-light spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-light spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Styled.Container>
    </Styled.Loading>
  );
};
