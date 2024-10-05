import { Stacked } from "../../ui/Stacked"
import Table from "../../ui/Table"

function GuestRow({guest,index}) {
    
    const {bookingId,userId,userEmail,displayName:fullName,numJoining:numPerson}=guest
    
    return (
        <Table.Row>
        <div>{index+1}</div>
            <div>{fullName??"Some guest"}</div>
            <div>{numPerson}{' '}{numPerson>1?'tickets':'ticket'}</div>
            <div>{userEmail}</div>
            <div>{userId}</div>
        </Table.Row>
    )
}

export default GuestRow