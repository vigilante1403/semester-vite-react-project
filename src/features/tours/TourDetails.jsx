import styled from "styled-components";
import { HiArrowUpOnSquare } from "react-icons/hi2";

import TourDataBox from "./TourDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from '../../ui/Spinner'

import { useMoveBack } from "../../hooks/useMoveBack";
import { useTour } from "./useTour";
import {useDeleteTour, useDeleteTourTemp} from './useDeleteTour'
import { useNavigate, useParams } from "react-router-dom";

import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
import { useGetAllSchedulesOfATour } from "../schedules/useSchedules";
import { useGetAllStartDatesOfTour } from "../../features-user/tours/useBookTour";
import { useTourGuides } from "./useTourGuides";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function TourDetail() {
  const navigate=useNavigate()
  const {tour,isLoading} = useTour();
  const {deleteTourTemp,isDeleting}=useDeleteTourTemp()
  const {guides,isLoading:isLoading3}=useTourGuides()
  const { id:tourId } = useParams()
  const {schedules,isLoading:isLoading1}=useGetAllSchedulesOfATour({tourId:tourId})
  const {startDates:starts,isLoading:isLoading2}=useGetAllStartDatesOfTour({tourId:tourId})
  const moveBack = useMoveBack();

  const statusToTagName = {
    pending: "blue",
    active: "green",
    inactive: "silver",
  };
  if(isLoading||isLoading1||isLoading2||isLoading3) return <Spinner />
  // if(!tour||tour==null) return <Empty resourceName="tour"/>
  const {status,id,name}=tour;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Tour {name}</Heading>
          <Tag type={statusToTagName[status]}>{status}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <TourDataBox guideList={guides} schedules={schedules} starts={starts} tour={tour} />

      <ButtonGroup>
      <Modal>
      <Modal.Open opens='delete'>
      <Button variation='danger'>Delete</Button>
      </Modal.Open>
      <Modal.Window name='delete'>
        <ConfirmDelete onConfirm={()=>deleteTourTemp(id,{onSettled:navigate('/admin/tours')})} resourceName={id}/>
      </Modal.Window>
      
      </Modal>
      {status==='unconfirmed'&&<Button>Check in</Button>}
      {status==='checked-in'&&<Button icon ={<HiArrowUpOnSquare/>} >Check out</Button>}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default TourDetail;