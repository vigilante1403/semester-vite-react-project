import { useContext, useEffect, useState } from "react";
import { useTours } from "../../features/tours/useTours";
import { getAllFavoriteUser } from "../../services/apiFavorite";
import { UserContext } from "../../ui/userLayout/ProtectedRouteUser";
import Spinner from "../../ui/Spinner";
import { Card, CardContent, CardMedia, Typography, Grid, Box, IconButton, Button, Pagination } from "@mui/material";
import { HiCalendar, HiUserGroup } from "react-icons/hi2";
import { useBookingsTotal } from "../../features/bookings/useBookings";
import Tour from "../../features-user/tours/Tour";
import { useDeleteAllFavorite } from "../../features-user/tours/useFavorite";
import { LoadingButton } from "@mui/lab";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function MyFavorite() {
  const { tours, isLoading } = useTours();
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const { bookings, isLoading: isBookingLoading } = useBookingsTotal();
  const { deleteAllFavorite, isDeleting } = useDeleteAllFavorite();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Lấy danh sách yêu thích của user
  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        const favoriteList = await getAllFavoriteUser(user.id.toString());
        if (favoriteList) {
          setFavorites(favoriteList);
        }
      };
      fetchFavorites();
    }
  }, [user]);

  if (isLoading || isBookingLoading) return <Spinner />;

  // Lọc các tour mà user đã yêu thích và điều kiện liked: true
  const favoriteTours = tours.filter(t => {
    return favorites.some(f => f.tourId === t.id && f.liked === true);
  });

  // Xử lý xóa tất cả mục yêu thích
  const handleDeleteAllFavorites = () => {
    deleteAllFavorite(user.id.toString(), {
      onSettled: () => setFavorites([]),
    });
  };

  // Pagination
  const currentPage = Number(searchParams.get('page')) || 1; // Lấy trang hiện tại từ URL hoặc mặc định là 1
  const startIndex = (currentPage - 1) * 3;
  const endIndex = currentPage * 3;
  const paginatedTours = favoriteTours.slice(startIndex, endIndex);
  const totalPages = Math.ceil(favoriteTours.length / 3); // Tính số trang

  const handlePageChange = (event, value) => {
    setSearchParams({ page: value }); // Cập nhật trang trong URL
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h3">My Favorite Tours</Typography>
        {favoriteTours.length > 0 && (
          <LoadingButton 
            variant="contained" 
            color="secondary" 
            onClick={handleDeleteAllFavorites} 
            disabled={isDeleting}
            isLoading={isDeleting}
          >
            {isDeleting ? 'Removing...' : 'Remove All'}
          </LoadingButton>
        )}
      </Box>

      {paginatedTours.length > 0 ? (
        <Grid container spacing={2}>
          {paginatedTours.map((tour) => (
            <Tour key={tour.id} tour={tour} bookings={bookings} />
          ))}
        </Grid>
      ) : (
        <Typography variant="h5">No favorite tours could be found.</Typography>
      )}
      
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination 
            count={totalPages} 
            page={currentPage} 
            onChange={handlePageChange} 
            color="primary" 
            shape="rounded"
            size="large" // Đặt kích thước lớn hơn
            sx={{ "& .MuiPaginationItem-root": { fontSize: '1.25rem' } }} // Tăng kích thước chữ
          />
        </Box>
      )}
    </div>
  );
}

export default MyFavorite;