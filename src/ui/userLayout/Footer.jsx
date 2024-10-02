import { Card, CardContent, Container, Grid, Typography } from "@mui/material";

export default function Footer() {
  return (
    <footer
      style={{ padding: '20px 0', marginTop: '20px', background: 'var(--color-grey-300)', color: 'var(--color-grey-900)' }}
    >
      <Container>

        <Grid container spacing={3}>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ background: 'inherit', color: 'var(--color-grey-900)' }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Các Tour Quốc Tế
                </Typography>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li><Typography variant="h6">Tour Nhật Bản</Typography></li>
                  <li><Typography variant="h6">Tour Hàn Quốc</Typography></li>
                  <li><Typography variant="h6">Tour Pháp</Typography></li>
                  <li><Typography variant="h6">Tour Úc</Typography></li>
                  <li><Typography variant="h6">Tour Mỹ</Typography></li>
                  <li><Typography variant="h6">Tour Canada</Typography></li>

                </ul>
              </CardContent>
            </Card>
          </Grid>


          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ background: 'inherit', color: 'var(--color-grey-900)' }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Các Tour Nội Địa
                </Typography>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li><Typography variant="h6">Tour Hà Nội</Typography></li>
                  <li><Typography variant="h6">Tour TP Hồ Chí Minh</Typography></li>
                  <li><Typography variant="h6">Tour Đà Nẵng</Typography></li>
                  <li><Typography variant="h6">Tour Huế</Typography></li>
                  <li><Typography variant="h6">Tour Phú Quốc</Typography></li>
                  <li><Typography variant="h6">Tour Quảng Ninh</Typography></li>
                </ul>
              </CardContent>
            </Card>
          </Grid>


          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ background: 'inherit', color: 'var(--color-grey-900)' }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Thông Tin Liên Hệ
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Hotline: +123 456 7890
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Email: support@example.com
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Địa chỉ: 123 Main St, City, State, ZIP
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Website: www.example.com
                </Typography>
                <Typography variant="h6" gutterBottom>
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Facebook: www.facebook.com
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* </section> */}
        <Typography variant="h6" align="center" sx={{ marginTop: '15px', color: "var(--color-grey-900)" }}>
          © 2024 Tour Booking. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
}