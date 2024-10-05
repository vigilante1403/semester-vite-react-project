import { useQuery } from "@tanstack/react-query";
import { fetchPaymentHistory } from "../../services/apiBill";

const usePaymentHistory = (userEmail) => {
    return useQuery({
        queryKey: ['paymentHistory', userEmail],
        queryFn: () => fetchPaymentHistory(userEmail), 
        enabled: !!userEmail,
    });
};

export default usePaymentHistory;