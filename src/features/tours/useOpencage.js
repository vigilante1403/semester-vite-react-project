import { useQuery } from "@tanstack/react-query";
import opencage from 'opencage-api-client'

const opencageFn=async()=>await opencage
  .geocode({ q: '134, nguyễn thái học, Phường Đa Kao, Quận 1, TP Hồ Chí Minh' })
  .then((data) => {
    // console.log(JSON.stringify(data));
    if (data.results.length > 0) {
      const place = data.results[0];
      console.log(place.formatted);
      console.log(place.geometry);
      console.log(place.annotations.timezone.name);
    } else {
      console.log('Status', data.status.message);
      console.log('total_results', data.total_results);
    }
  })
  .catch((error) => {
    // console.log(JSON.stringify(error));
    console.log('Error', error.message);
    // other possible response codes:
    // https://opencagedata.com/api#codes
    if (error.status.code === 402) {
      console.log('hit free trial daily limit');
      console.log('become a customer: https://opencagedata.com/pricing');
    }
  });
export function useOpencage(){
   const {data,isLoading:loading}=useQuery({
    queryKey:['opencage'],
    queryFn: opencageFn
   })
    return {data,loading}
}
