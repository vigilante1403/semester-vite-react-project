import { Stacked } from "../../ui/Stacked"
import Table from "../../ui/Table"

function LocationRow({location}) {
    
    const {day,coordinates,address,description}=location
    
    return (
        <Table.Row>
            <div>{day}</div> 
            <div>{description}</div>
           <div>{address}</div>
            <div>[{coordinates[0]},{coordinates[1]}]</div>
        </Table.Row>
    )
}

export default LocationRow
