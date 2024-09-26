import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const Dashboard = () => {
    // Giả lập dữ liệu cho tour đã đặt và tour sắp tới
    const bookedTours = 12;
    const upcomingTours = [
        { name: "Tour Hà Nội - Sapa", startDate: "01/10/2024" },
        { name: "Tour Đà Nẵng - Hội An", startDate: "05/10/2024" },
        { name: "Tour Nha Trang - Phú Quốc", startDate: "10/10/2024" }
    ];

    return (
        <Box sx={{ padding: 3, backgroundColor: '#f0f4c3', backgroundImage: 'url(/path/to/your/background/image.jpg)', backgroundSize: 'cover' }}>
            <Typography variant="h4" gutterBottom>
                Bảng Điều Khiển
            </Typography>
            <Grid container spacing={3}>
                {/* Thống kê tour */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#e3f2fd' }}>
                        <Typography variant="h5" sx={{ color: '#2196f3' }}>Thống Kê Tour</Typography>
                        <Typography variant="h6">Số lượng tour đã đặt: {bookedTours}</Typography>
                    </Paper>
                </Grid>

                {/* Danh sách tour sắp tới */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#e8f5e9' }}>
                        <Typography variant="h5" sx={{ color: '#4caf50' }}>Tour Sắp Tới</Typography>
                        <ul>
                            {upcomingTours.map((tour, index) => (
                                <li key={index}>
                                    {tour.name} (Ngày bắt đầu: {tour.startDate})
                                </li>
                            ))}
                        </ul>
                    </Paper>
                </Grid>

                {/* Thông tin người dùng */}
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#fff8e1' }}>
                        <Typography variant="h5">Thông Tin Người Dùng</Typography>
                        <Typography variant="h6">Tên: Nguyễn Văn A</Typography>
                        <Typography variant="h6">Email: nguyen@example.com</Typography>
                        <Typography variant="h6">Quốc tịch: Việt Nam</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;
