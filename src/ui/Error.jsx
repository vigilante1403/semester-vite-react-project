import styled from "styled-components"
const ErrorMessage = styled.span`
font-size: 1.4rem;
color: var(--color-red-700);
`;
function Error({children}) {

    return (
        <ErrorMessage>
            {children}
        </ErrorMessage>
    )
}

export default Error
