import styled, { css } from 'styled-components'
const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === 'horizontal' &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === 'vertical' &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
    ${(props) =>
    props.type === 'end' &&
    css`
      justify-content: flex-end;
      align-items: center;
    `}
    ${(props) =>
    props.type === 'center' &&
    css`
      justify-content: center;
      align-items: center;
    `}
    
`
Row.defaultProps = {
  type: 'vertical',
}
export default Row