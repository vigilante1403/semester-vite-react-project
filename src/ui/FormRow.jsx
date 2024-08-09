/*eslint-disable*/
import styled, { css }  from 'styled-components'
const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  position: relative;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    
    justify-content: flex-end;
    /* ${(props) => props.flex==='flex-start' &&
    css` 
    justify-content: space-between;
    `
  } */
    gap: 1.2rem;
  }
`

const Label = styled.label`
  font-weight: 500;
  ${(props) => props.flex==='flex-start' &&
    css` 
    position: absolute;
    left:0;
    `
  }
`

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`

// eslint-disable-next-line react/prop-types
function FormRow({ label,error,children,flex }) {
  return (
    <StyledFormRow flex={flex}>

      {label&&<Label flex={flex} htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  )
}

export default FormRow