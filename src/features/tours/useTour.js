import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'; 
import { getTourByIdOrSlug } from '../../services/apiTours'; 

export function useTour() {
    const { id } = useParams();


    const { data: tour, isLoading } = useQuery({
        queryKey: ['tour', id],
        queryFn: () => getTourByIdOrSlug({ id:id }),
        enabled: !!id 
    });
    if (!id) {
        return { tour: null, isLoading: false };
    }
    return { tour, isLoading };
}
