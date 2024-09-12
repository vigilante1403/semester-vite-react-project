import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

export default function ShowDetailButton({id}) {
    const navigate = useNavigate();
    return(
        <Button variant="contained" color="primary" sx={{ fontSize: '1.2rem' }} onClick={()=> navigate(`/tours/tour-detail/${id}`)}>
        Show Detail
      </Button>
    )
}