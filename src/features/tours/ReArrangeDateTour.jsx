import { CalendarMonth, CalendarToday } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import Spacer from '../../ui/Spacer';
import styled from 'styled-components';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { compareTwoDates, getTodayDate } from '../../utils/helpers';
import { useGetAllSchedules, useGetAllSchedulesOfATour } from '../schedules/useSchedules';
import Spinner from '../../ui/Spinner';
import { useTourGuides } from './useTourGuides';
import Select from '../../ui/Select';
import { HiTrash } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useAddStartDate, useDeleteStartDate, useEditStartDate } from './useStartDates';
import { useGetAllStartDatesOfTour } from '../../features-user/tours/useBookTour';

const StyledDateForm = styled.div`
  min-width: 70vw;
`;
const StyledChosenButton = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledCustomButton = styled(Button)`
  outline: none;
  &:focus {
    outline: none;
  }
`;
const StyledTypo = styled(Typography)`
  text-align: center;
  font-size: 2rem !important;
`;

function ReArrangeDateTour({ tour,onClose }) {
  const [clickedButton, setClickedButton] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [busyGuides, setBusyGuides] = useState([]);
  const [chosenGuides,setChosenGuides]=useState([])
  const { schedules, isLoading } = useGetAllSchedules()
  const { guides, isLoading: isLoading1 } = useTourGuides();
  const {addDate,isAdding}=useAddStartDate();
  const {editDate,isEditting}=useEditStartDate()
  const {deleteDate,isDeleting}=useDeleteStartDate()
  const {startDates,isLoading:isLoading2}=useGetAllStartDatesOfTour({tourId:tour.id})
  const [startId,setStartId]=useState('')
  const [checkbox,setCheckbox]=useState(false);
  const {schedules:guideSchedules,isLoading:isLoading3}=useGetAllSchedulesOfATour({tourId:tour.id})


  const handleClick = (buttonNum) => {
    setClickedButton(buttonNum);
  };

  const handleSetBusyGuides = (event) => {
    setStartDate((prev) => event.target.value);
    setChosenGuides(prev=>[])
    var date2 = new Date(event.target.value);
    date2.setDate(date2.getDate() + tour.locations.length - 1);

    console.log(date2.toLocaleDateString('en-CA'))

   
    var guidesBusy = schedules
      .filter(
        (schedule) =>schedule.status&&
          !(
          compareTwoDates(event.target.value,schedule.to.toString())==='after') &&
            !(
              compareTwoDates(event.target.value, schedule.from.toString()) === 'before'&&compareTwoDates(date2.toLocaleDateString('en-CA'),schedule.from.toString())==='before')
      )
      .map((schedule) => {
        
        return schedule.guideId});
    setBusyGuides((prev) => guidesBusy);
    if(startId!==''){
      var guideIdList =schedules.filter(sc=>sc.startDateId===startId).map(sc=>sc.guideId)
      console.log('aaaa',guideIdList)
      var temp2=busyGuides
      console.log(busyGuides)
    temp2=temp2.filter(busy=>!guideIdList.includes(busy))
    setBusyGuides(prev=>[...temp2])
    }
  };

  const handleSelectStartDate = (e)=>{
    setChosenGuides(prev=>[])
    setStartId(prev=>e.target.value);
    setBusyGuides(prev=>[])
    var startD=startDates.filter(start=>start.id===e.target.value)[0].startDate
    setStartDate(prev=>startD)
    // ngay do da ton tai trong guideSchedules
    var schedule1 =guideSchedules.filter(schedule=>schedule.startDateId===e.target.value)
    Array.from(schedule1).forEach(s=>{
      setChosenGuides(prev=>[...prev,{label:s.guideEmail,value:s.guideId}])
    })
    var dateFind = schedule1[0].from.toString()
    var endDateFind = new Date(schedule1[0].to)
    console.log('endDate',endDateFind)
    var guidesBusy = schedules
      .filter(
        (schedule) =>schedule.status&&
          !(
          compareTwoDates(dateFind,schedule.to.toString())==='after') &&
            !(
              compareTwoDates(dateFind, schedule.from.toString()) === 'before'&&compareTwoDates(endDateFind.toLocaleDateString('en-CA'),schedule.from.toString())==='before')
      )
      .map((schedule) => {
        
        return schedule.guideId});
    setBusyGuides((prev) => guidesBusy);
    console.log('busy',guidesBusy)
  }


  const handleAddGuides = (data)=>{
    setChosenGuides(prev=>[...prev,{label:data.label.split('-')[1],value:data.value}])
    setBusyGuides(prev=>[...prev,data.value])

  }


  const handleRevertGuideList = (data)=>{
    var temp = chosenGuides
    temp=temp.filter(guide=>guide.label!==data.label)
    setChosenGuides(prev=>[...temp])
    var temp2=busyGuides
    temp2=temp2.filter(busy=>busy!==data.value)
    setBusyGuides(prev=>[...temp2])

  }

  const {handleSubmit,control,reset}=useForm()

  const handleSubmit1 = ()=>{
    const formData = new FormData();
    if(startDate===''||chosenGuides.length===0) {
        toast.error('Please add start date or guides')
        return;
    }
    var existed = schedules.filter(schedule=>compareTwoDates(startDate,schedule.from.toString())==='equal'&&schedule.tourId===tour.id);
    if(existed!=null||existed.length>0) {
      toast.error('Cannot reopen same date')
      return;
    }
    formData.append('startDates',startDate)
    formData.append('tourId',tour.id)
    if(chosenGuides.length!==0){
        Array.from(chosenGuides).forEach(guide=>{
            formData.append('guides',guide.value)
        })
    }
    addDate(formData,{
        onSettled:()=>{onClose?.()}
    })
    console.log(formData)
  }
  const handleSubmit2 = ()=>{
    const formData = new FormData();
    if(startDate===''||chosenGuides.length===0||startId==='') {
        toast.error('Please choose start date or guides or change to new start date')
        return;
    }
    
    formData.append('startDate',startDate)
    formData.append('tourId',tour.id)
    formData.append('startId',startId)
    if(chosenGuides.length!==0){
        Array.from(chosenGuides).forEach(guide=>{
            formData.append('guides',guide.value)
        })
    }
    editDate(formData,{
        onSettled:()=>{onClose?.()}
    })
    console.log(formData)
  }
  const handleSubmit3 = ()=>{
    const formData = new FormData();
    if(startId==='') {
        toast.error('Please choose a start date')
        return;
    }
    if(!checkbox){
      toast.error('Please check before delete')
      return;
    }
    formData.append('startId',startId)

    deleteDate(formData,{
        onSettled:()=>{onClose?.()}
    })
    
  }

  if ((isLoading || isLoading1)&&clickedButton===1) return <Spinner />;
  if ((isLoading2||isLoading3)&&clickedButton===2) return <Spinner />;

  return (
    <StyledDateForm>
      <StyledChosenButton>
        <StyledCustomButton
          startIcon={<CalendarMonth />}
          onClick={() => handleClick(1)}
          variant={clickedButton === 1 ? 'contained' : 'outlined'}
        >
          Add date
        </StyledCustomButton>
        <StyledCustomButton
          variant={clickedButton === 2 ? 'contained' : 'outlined'}
          onClick={() => handleClick(2)}
          startIcon={<CalendarToday />}
        >
          Change dates
        </StyledCustomButton>
        <StyledCustomButton
          variant={clickedButton === 3 ? 'contained' : 'outlined'}
          onClick={() => handleClick(3)}
          startIcon={<HiTrash />}
        >
          Delete date
        </StyledCustomButton>
      </StyledChosenButton>
      <Spacer space={2.6} />
      {clickedButton === 1 && (
        <StyledTypo>Add New Start Date To {tour.name}</StyledTypo>
      )}
      {clickedButton === 2 && (
        <StyledTypo>Change Start Date Of {tour.name}</StyledTypo>
      )}
      {clickedButton === 1 && (
        <Form onSubmit={handleSubmit(handleSubmit1)}>
          <FormRow label="New Start Date">
            <Input
              type="date"
              min={getTodayDate()}
              onChange={(event) => handleSetBusyGuides(event)}
              placeholder={`Location date`}
            />
          </FormRow>
          <FormRow label="Available Guides">
            <Select onChange={(event)=>{
                const user = guides.filter(guide=>guide.value===event.target.value)[0]
                handleAddGuides(user)
            }}  options={startDate!==''?guides.filter(guide=>!busyGuides.includes(guide.value)):[]} />
          </FormRow>
            <FormRow label="Guides">
                <div style={{ display:'flex',justifyContent:'flex-start',alignItems:'center' }}>{chosenGuides.map(guide=><Button onClick={()=>handleRevertGuideList({label:guide.label,value:guide.value})} style={{ display:'flex', alignItems:'center' }} endIcon={<HiTrash/>}>{guide.label}</Button>)}</div>
            </FormRow>
            <FormRow>
            <Button type='reset'>Reset</Button>
                <Button type="submit">Add</Button>
            </FormRow>
        </Form>
      )}
      {clickedButton === 2 && (
        <Form onSubmit={handleSubmit(handleSubmit2)}>
          <FormRow label="Current Start Date">
            <Select options={startDates.filter(start=>start.status).map(start=>({label:start.startDate,value:start.id}))}
             onChange={(e)=>handleSelectStartDate(e)}  />
          </FormRow>
          {startId&&<FormRow label="Change To Start Date">
            <Input
              type="date"
              value={startDate}

              onChange={(event) => handleSetBusyGuides(event)}
              placeholder={`start date`}
            />
          </FormRow>}
          <FormRow label="Guides">
                <div style={{ display:'flex',justifyContent:'flex-start',alignItems:'center' }}>{chosenGuides.map(guide=><Button onClick={()=>handleRevertGuideList({label:guide.label,value:guide.value})} style={{ display:'flex', alignItems:'center' }} endIcon={<HiTrash/>}>{guide.label}</Button>)}</div>
            </FormRow>
          <FormRow label="Available Guides">
            <Select onChange={(event)=>{
                const user = guides.filter(guide=>guide.value===event.target.value)[0]
                handleAddGuides(user)
            }}  options={guides.filter(guide=>!busyGuides.includes(guide.value))} />
          </FormRow>
            
            <FormRow>
                <Button type='reset'>Reset</Button>
                <Button type="submit">Change</Button>
            </FormRow>
        </Form>
      )}
      {clickedButton === 3 && (
        <Form onSubmit={handleSubmit(handleSubmit3)}>
          <FormRow label="Current Start Date">
            <Select options={startDates.filter(start=>start.status).map(start=>({label:start.startDate,value:start.id}))}
             onChange={(e)=>handleSelectStartDate(e)}  />
          </FormRow>
          
          <FormRow label="Guides">
                <div style={{ display:'flex',justifyContent:'flex-start',alignItems:'center' }}>{chosenGuides.map(guide=><Button  style={{ display:'flex', alignItems:'center' }} >{guide.label}</Button>)}</div>
            </FormRow>
          <FormRow label="Are you sure to proceed this decision?">
          <div style={{ display:'flex',columnGap:'2rem',maxWidth:'100%' }}>
          <Input type="checkbox" id="checkbox" style={{ maxWidth:'3rem' }} value={checkbox} onChange={(e)=>setCheckbox(prev=>!prev)}/>
          <span style={{ minWidth:'90%',flexGrow:1 }}>{checkbox?'Yes, I do understand this action cannot be reverted':`No, I don't accept this delete action`}</span>
</div>
          </FormRow>
            <FormRow>
                <Button type='reset'>Cancel</Button>
                <Button type="submit">Delete</Button>
            </FormRow>
        </Form>
      )}
    </StyledDateForm>
  );
}

export default ReArrangeDateTour;
