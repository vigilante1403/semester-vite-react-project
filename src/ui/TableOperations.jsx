import styled,{css} from 'styled-components';

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  ${(props)=>
  props.style1 === 'center' &&
  css`
  justify-content: space-between;

  `
  }
`;

export default TableOperations;