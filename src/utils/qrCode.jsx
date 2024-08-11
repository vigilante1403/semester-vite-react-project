import React from 'react';
import QRCode from 'qrcode.react';
import Button from '../ui/Button';

const BookingQRCode = ({ booking }) => {
  // Tạo chuỗi dữ liệu cho mã QR
  const qrData = `
    Name: ${booking.user.name}
    Email: ${booking.user.email}
    Tour: ${booking.tour.tourName}
    Start Date: ${booking.startDate}
    Price Origin: ${booking.priceOrigin}
    Price Discount: ${booking.priceDiscount}
    Price Final: ${booking.priceFinal}
  `;
  console.log(booking.paid)
  return (
    <div style={{ display:'flex',flexDirection:'column',justifyContent:'center',alignItems:"center",textAlign: 'center', marginTop: '50px' }}>
      <h1>Booking QR Code</h1>
      <QRCode
        value={qrData}
        size={256} // Kích thước của mã QR
        bgColor="#ffffff" // Màu nền
        fgColor="#000000" // Màu của mã QR
        level="L" // Mức độ sửa lỗi (L, M, Q, H)
        includeMargin={true} // Bao gồm khoảng cách lề xung quanh mã QR
      />
      <Button disabled={!booking.paid} onClick={() => {console.log(booking.paid)}} style={{marginTop:'10px'}}>Send ticket to email</Button>
    </div>
  );
};

export default BookingQRCode;