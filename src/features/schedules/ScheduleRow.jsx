import styled from "styled-components"
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiEye, HiTrash } from "react-icons/hi2";
import { format } from "date-fns";
import ShowDetailSchedule from "./ShowDetailSchedule";
import { useSearchParams } from "react-router-dom";
const Guide = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;
const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;



const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;
const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;
const Country = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;
const Flag = styled.img`
  width: 3rem;
  height: auto;
`;
function ScheduleRow({schedule,index}) {
    const[searchParams]=useSearchParams()
    const {id,guideId,
tourId,
tourName,
guideName,
guideEmail,
startDateId,
from,
to,
countryFlag,
countryName,guestList}=schedule
const currentPage = searchParams.get('page')||1
    return (
        <Table.Row>
      <span>{(index+1)*currentPage}</span>
      <Guide>{guideName}</Guide>
      <span>{guideEmail}</span>
      <Stacked>
        <Guide>{tourName}</Guide>
        <span>{format(new Date(from), 'MMM dd yyyy')}{' '}&mdash;{' '}{format(new Date(to), 'MMM dd yyyy')}</span>
      </Stacked>
      <Country>
        {countryFlag && <Flag src={countryFlag} alt={`${countryName} flag`} />}
        <div>{countryName}</div>
      </Country>
      <Guide>{guestList.length}</Guide>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
             
<Modal.Open opens={`detail-${id}`}>
              <Menus.Button
                
                icon={<HiEye />}
              >
                See details
              </Menus.Button>
              </Modal.Open>
                <Modal.Open opens={`delete-${id}`}>
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
           
            </Menus.List>
          </Menus.Menu>
          <Modal.Window name={`detail-${id}`}>
            <ShowDetailSchedule scheduleId={id} />
          </Modal.Window>
          
        </Modal>
      </div>
    </Table.Row>
    )
}

export default ScheduleRow
