import { useEffect, useState } from "react"
import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import { isToday } from "date-fns"
import { Controller, useForm } from "react-hook-form"
import Select from "../../ui/Select"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import { Typography } from "@mui/material"
function StepConfirmBookingTour({tour,user}) {

    const [keyChosen,setKeyChosen]=useState('')
    const [joining,setJoining]=useState(1)
    const [total,setTotal]=useState(tour.price-tour.priceDiscount)
    const {handleSubmit,control,reset,setValue,register}=useForm()
    const options = tour.startDates.map((date)=>({label:date,value:tour.keyOfDatesRelation!==null?Object.keys([tour.keyOfDatesRelation].filter(key=>Object.values(key).includes(date))[0])[0]:''}))
    // console.log(tour.keyOfDatesRelation.filter(key=>Object.values(key)[0]==='2024-10-26'))
    const handleTotal = (e)=>{
        var joining = Number(e.target.value);
        setJoining(prev=>joining)
        var subBasicPrice = tour.price-tour.priceDiscount
        var totalPrice = subBasicPrice*joining;
        setTotal(prev=>totalPrice)

    }
    const handleSubmitTour = ()=>{
        
    }
    return (
        <Form type='modal'>
        <Typography fontSize={24} color={"ActiveCaption"}>Please complete this form in order to book tour</Typography>
        <FormRow label='Tour Name'>
            <span>{tour.name}</span>
        </FormRow>
        <FormRow label='Select date'>
        <Controller
            name="date"
            control={control}
            rules={{
              validate: (value) =>
                String(value).length > 0 || 'This field is required',
            }}
            render={({ field }) => (
              <Select
                {...field}
                text="Choose user"
                value={keyChosen}
                options={options}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  console.log(e.target.value)
                  setKeyChosen(e.target.value);
                }}
              />
            )}
          />
        </FormRow>
        <FormRow label='Booked by'>
            <span>{user.fullName}</span>
        </FormRow>
        <FormRow label='Joining person count'>
        <Input type='number' id='joining' defaultValue={1} min={1} onChange={(e)=>handleTotal(e)} />
        </FormRow>
        <FormRow label='Basic price'>
            <p>{tour.price}${' '}x{' '}{joining}</p>
        </FormRow>
        <FormRow label='Current discount price'>
            <p>{tour.priceDiscount}${' '}x{' '}{joining}</p>
        </FormRow>
        <FormRow label='Total estimated'>
           <span>{total}$</span>
        </FormRow>
            <FormRow>
                <Button variation='secondary' type='reset'>Cancel</Button>
                <Button variation='primary' type='submit'>Confirm</Button>
            </FormRow>
        </Form>
    )
}

export default StepConfirmBookingTour
