import { Typography } from "@mui/material"
import styled from "styled-components"
const StyledUpcomingTrips=styled.div`

background-color: var(--color-grey-100);
`
function UpcomingTrips() {
    return (
        <StyledUpcomingTrips>
            <Typography fontSize={20}>Your upcoming trip</Typography>
        </StyledUpcomingTrips>
    )
}

export default UpcomingTrips
