import { Container, Typography } from "@mui/material";

export default function Footer() {
    return (
      <footer
        style={{ padding: '20px 0', textAlign: 'center', background: 'var(--color-grey-400)',color:'var(--color-grey-900)' }}
      >
        <Container>
          <Typography variant="body1" sx={{color: "var(--color-grey-900)"}}>
            © 2024 Tour Booking. All rights reserved.
          </Typography>
        </Container>
      </footer>
    );
  }