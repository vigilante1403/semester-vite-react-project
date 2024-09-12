import styled from "styled-components";
import PageNotFound from "../../pages/PageNotFound";
import Spinner from "../../ui/Spinner";
import { useVerify } from "./useVerify"
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
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
function VerifyPage() {
    const navigate = useNavigate()
    const {statusVerified,isLoading}=useVerify();
    if(isLoading) return <Spinner/>
    if(!statusVerified) return <PageNotFound/>
    return (
        <StyledPageNotFound>
      <Box>
        <Heading as="h1">
          Activate success! You can close this page now or go to homepage 😀
        </Heading>
        <Button size="large" onClick={()=>navigate('/',{replace:true})}>
          &larr; Go to HomePage
        </Button>
      </Box>
    </StyledPageNotFound>
    )
}

export default VerifyPage
