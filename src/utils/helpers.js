import { formatDistance, parseISO } from 'date-fns';
import { differenceInDays } from 'date-fns';
import opencage from 'opencage-api-client';
import toast from 'react-hot-toast';

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

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
