import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import Modal from '../../ui/Modal';
import EditProfileForm from './EditProfileForm';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Spinner from '../../ui/Spinner';
// const user = {
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     fullName: 'Johnathan Doe',
//     nationality: 'United States',
//     countryFlag: 'https://flagcdn.com/w320/us.png', 
//     role: 'USER',
//     createdAt: '2023-01-01',
//     lastLoginDate: '2024-09-18',
// };

function Profile () {
    const [user,setUser] = useState(null);
    useEffect(()=>{
        if(user ==null) {
        const cookieFind = Cookies.get('token-vtravel-lib0-authw') || null;
        const token = Cookies.get('token-vtravel-lib0-authw');
        console.log(token);
        // const payload = jwt.decode(token)
        const jwt = jwtDecode(token)
        console.log(jwt.sub);
        
        // const t = findUserByEmail(jwt.sub);
        // console.log(t);
        findUserByEmail(jwt.sub);
      }
      }, [user]);
    
      const findUserByEmail = async (email) => {
        await axios.get(`/users/email/${email}`).then((response) =>{setUser(response.data); console.log(response.data);
        });
       
      };
  console.log(user);
  const formattedDate = (isoDate) =>{
    const date = new Date(isoDate);

const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
const day = String(date.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;
console.log(formattedDate);
return formattedDate;
  }

    if(user == null) return <Spinner></Spinner>
    return (
        <Container maxWidth="md"> 
            <Card sx={{
                mt: 5,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: 3
            }}>
                <CardContent sx={{
                    p: 4,
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                    borderRadius: 3
                }}>
                    <Box display="flex" justifyContent="center" mb={3}>
                        <Avatar
                            alt={user.fullName}
                            src={`http://localhost:8080/api/v1/file/image/user/${user.photo}` || 'https://via.placeholder.com/150'} 
                            sx={{ width: 150, height: 150, border: '2px solid white', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}
                        />
                    </Box>
                    <Typography variant="h3" align="center" gutterBottom fontWeight="bold"> {}
                        {user.name}
                    </Typography>
                    <Typography variant="h5" align="center" gutterBottom color="textSecondary"> {}
                        Full Name: <strong>{user.fullName}</strong>
                    </Typography>
                    <Typography variant="h5" align="center" gutterBottom color="textSecondary">
                        Email: <strong>{user.email}</strong>
                    </Typography>
                    <Typography variant="h5" align="center" gutterBottom color="textSecondary">
                        Nationality: <strong>{user.nationality}</strong>
                    </Typography>
                    <Box display="flex" justifyContent="center" mb={2}>
                        <img src={user.countryFlag} alt={`${user.nationality} flag`} style={{ width: 50 }} />
                    </Box>
                    <Typography variant="h5" align="center" gutterBottom color="textSecondary">
                        Role: <strong>{user.role}</strong>
                    </Typography>
                    <Typography variant="h5" align="center" gutterBottom color="textSecondary">
                        Account Created On: <strong>{formattedDate(user.createdAt)}</strong>
                    </Typography>
                    <Typography variant="h5" align="center" gutterBottom color="textSecondary">
                        Last Login Date: <strong>{formattedDate(user.lastLoginDate)}</strong>
                    </Typography>
                    <Grid container justifyContent="center" spacing={2} mt={3}>
                        <Grid item>
                            <Modal>
                                <Modal.Open opens="user-form">
                                <Button variant="contained" color="primary" size="large" sx={{ borderRadius: '20px', px: 4 }}>
                                Edit Profile
                            </Button>
                                </Modal.Open>
                                <Modal.Window name="user-form">
                                    <EditProfileForm user={user}/>
                                </Modal.Window>
                            </Modal>
                           
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="secondary" size="large" sx={{ borderRadius: '20px', px: 4 }}>
                                Change Password
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
       
    );
};

export default Profile;
