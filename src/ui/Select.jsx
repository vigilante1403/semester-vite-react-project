import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;
function Select({options,value,onChange,text,...props}) { // currently active value can use ...props to get the remaining props
  return (
    <StyledSelect onChange={onChange} value={value} {...props} text={text}>
    <option value='#' key='#'>{text}</option>
      {options.map(option=><option value={option.value} key={option.value}>{option.label}</option>)}
    </StyledSelect>
  )
}

export default Select
