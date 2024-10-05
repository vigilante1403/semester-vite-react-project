import AddBill from "../features/bills/AddBill"
import BillTable from "../features/bills/BillTable"
import Heading from "../ui/Heading"
import Row from "../ui/Row"
import Searchbar from "../ui/Searchbar"

function Bills() {
    return (
        <><Row type="horizontal">
            <Heading as="h1">All bills</Heading>

        </Row><Row>
                <Searchbar placeholder={"Search bill by id"}  />
                <BillTable />
                <AddBill />

            </Row></>
    )
}

export default Bills
