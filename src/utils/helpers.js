import { formatDistance, parse, parseISO,format } from 'date-fns';
import { differenceInDays } from 'date-fns';
import opencage from 'opencage-api-client';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AdminContext } from '../ui/ProtectedRouteAdmin';
import { UserContext } from '../ui/userLayout/ProtectedRouteUser';

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>{
  const cleanedDateString = dateStr.replace(/ ICT/, '');
  const parsedDate = parse(cleanedDateString, 'EEE MMM dd HH:mm:ss yyyy', new Date());
  const formattedDate = format(parsedDate, 'yyyy-MM-dd');
  return formatDistance(formattedDate,new Date(),{
    addSuffix:true
  }).replace('about ', '')
  .replace('in', 'In');
}
export const formatDateArrayAscOrDesc = (dateArr,modifier=1)=>{
  dateArr=Array.from(dateArr).sort((a,b)=>{
    const dateA = new Date(a)
    const dateB = new Date(b)
    return modifier*(dateA-dateB)
  })
  console.log(dateArr)
}
export const formatDateToCalendar= (dateStr,formatDesire='')=>{
  if(dateStr==null) return '--/--/----'
  const cleanedDateString = dateStr.replace(/ ICT/, '');
  const parsedDate = parse(cleanedDateString, 'EEE MMM dd HH:mm:ss yyyy', new Date());
  const formattedDate = format(parsedDate,formatDesire!==''?formatDesire: 'yyyy-MM-dd');
  return formattedDate;
}
export const isBeforeOrAfter = (dateStr)=>{
 const date1 = new Date(dateStr).getTime();
 const date = new Date()
 const formattedDate = date.getFullYear() + '-' +
  ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
  ('0' + date.getDate()).slice(-2);
 const date2 = new Date(formattedDate).getTime()
  if(date1>date2){
    return "after"
  }
  else if(date1===date2){
    return "equal"
  } else{
    return "before"
  }
  
}
export const compareTwoDates = (dateStr1,dateStr2)=>{
  const date1 = new Date(dateStr1).getTime();
 const date2 = new Date(dateStr2).getTime()
//  const formattedDate = date.getFullYear() + '-' +
//   ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
//   ('0' + date.getDate()).slice(-2);
//  const date2 = new Date(formattedDate).getTime()
  if(date1>date2){
    return "after"
  }
  else if(date1===date2){
    return "equal"
  } else{
    return "before"
  }
}
export const convertToReadableDateTimeFromISOTimestamp = (dateObj)=>{
  const formattedDate = dateObj.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  return formattedDate
}
  

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );
export const geocodeAddress = async (address, index) => {
  try {
    const data = await opencage.geocode({
      q: address,
      key: '6160a88ca50f47be968022f736bfb7ec',
    });
    if (data.results.length > 0) {
      const place = data.results[0];
      console.log(place);
      return {
        place,
        index1:index,
      };
    } else {
      toast.error(
        `Status: ${data.status.message}, total_results: ${data.total_results}`
      );
      return { data: null };
    }
  } catch (error) {
    toast.error(`Error: ${error.message}`);
    if (error.status && error.status.code === 402) {
      toast.error(
        'Hit free trial daily limit. Become a customer: https://opencagedata.com/pricing'
      );
    }
    return { error: error.message };
  }
};
export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

