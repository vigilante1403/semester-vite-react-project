import { useSearchParams } from "react-router-dom"
import AddBill from "../features/bills/AddBill"
import BillTable from "../features/bills/BillTable"
import BillTableOperations from "../features/bills/BillTableOperations"
import Heading from "../ui/Heading"
import Row from "../ui/Row"
import Searchbar from "../ui/Searchbar"
import { createContext, useState } from "react"
import { useBills } from "../features/dashboard/useBills"
import Spinner from "../ui/Spinner"
import Empty from "../ui/Empty"

export const BillContext=createContext()
function Bills() {
    const [searchParams,setSearchParams]=useSearchParams();
    const { bills, isLoading } = useBills();
    let [filteredBills,setFilteredBills]= useState([]);
    const [searchBill,setSearchBill]=useState('')
    const [showBills,setShowBills]=useState(true)
    const handleReload = () => {
        // Unmount and remount the component by toggling the state
        setShowBills(false);
        setTimeout(() => setShowBills(true), 0); // Re-mount after a delay
      };
    if (isLoading) return <Spinner />;
    if(!bills) return <Empty resourceName={'bill'} />
    if (searchParams.get('bill') !== 'all' && searchParams.get('bill') !== '' && searchParams.get('bill')!==null) {
        filteredBills = [];
        var tempbills = bills;
        filteredBills = tempbills.filter((bill) => {
          const billId = bill.id.toLowerCase();
          
          return billId.startsWith(searchBill) ? bill : null;
        });
        
      } else {
   
        if(filteredBills.length===0){
          
          filteredBills=bills
        }
    
      }
    const handleSearch = (data) => {
        if(data.trim()===''){
          searchParams.delete('bill')
          setSearchBill('');
          setSearchParams(searchParams)
          filteredBills=bills;
          return;
        }
        const newData = data.toLowerCase();
        setSearchBill(newData);
        searchParams.set('bill', newData);
        searchParams.set('page',1)
        setSearchParams(searchParams);
      };
      
    return (
        <BillContext.Provider value={{ filteredBills,handleReload }}><Row type="horizontal">
            <Heading as="h1">All bills</Heading>
            <BillTableOperations />
        </Row><Row>
                <Searchbar placeholder={"Search bill by id"} text={searchBill} onChangeText={handleSearch}  />
                <BillTable />
                <AddBill />

            </Row></BillContext.Provider>
    )
}

export default Bills
