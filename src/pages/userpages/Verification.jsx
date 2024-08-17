import styled from "styled-components";

import { useMoveBack } from "../../hooks/useMoveBack";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { useLocation } from "react-router-dom";

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

function Verification() {
  const moveBack = useMoveBack();
  const location = useLocation()


  return (
    <StyledPageNotFound>
      <Box>
        <Heading as="h1">
          Please check your mail to confirm the email 😀
        </Heading>
        <Button size="large" onClick={moveBack}>
          &larr; Go back
        </Button>
      </Box>
    </StyledPageNotFound>
  );
}

export default Verification;
