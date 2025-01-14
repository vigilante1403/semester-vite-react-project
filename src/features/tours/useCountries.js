
import { useQuery } from '@tanstack/react-query';
import { getAllCountries } from '../../services/apiTours';


function useCountries() {
  const { data: countries, isLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: getAllCountries,
    
  });

  return { countries, isLoading };
}

export default useCountries;