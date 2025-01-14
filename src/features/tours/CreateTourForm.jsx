/*eslint-disable*/
import styled from 'styled-components';
import { Button as ButtonDefault } from '@mui/material';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Select from '../../ui/Select';
import Textarea from '../../ui/Textarea';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useCreateTour } from './userCreateTour';
import { useTourGuides } from './useTourGuides';
import { useUpdateTour } from './useUpdateTour';
import Spinner from '../../ui/Spinner';
import { useEffect, useState } from 'react';
import FormRowVertical from '../../ui/FormRowVertical';
import { compareTwoDates, geocodeAddress } from '../../utils/helpers';
import useCountries from './useCountries';
import { Typography, Box } from '@mui/material';
import fetchFileFromUrl from '../../services/useFetchFileFromUrl';
import { json } from 'react-router-dom';
import { useUpdateAllRelatedBookings } from '../bookings/useBookings';
import { useGetAllSchedules } from '../schedules/useSchedules';
import { HiTrash } from 'react-icons/hi2';

function CreateTourForm({ onClose, editTour }) {
  const { createTour, isCreating } = useCreateTour();
  const { updateTour, isUpdating } = useUpdateTour();
  const { guides, isLoading } = useTourGuides();
  const { countries, isLoading: isCountriesLoading } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const{updateAllBookingsRelated}=useUpdateAllRelatedBookings()
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);
  const [changeCover,setChangeCover]=useState(null)
  const [changeImages,setChangeImages]=useState([])

  const {schedules,isLoading:isLoading1}=useGetAllSchedules({authorized:true});
  const [startDate, setStartDate] = useState('');
  const [busyGuides, setBusyGuides] = useState([]);
  const [chosenGuides,setChosenGuides]=useState([]);

  // const [selectedGuideName1, setSelectedGuideName1] = useState('chooseValue');
  // const [selectedGuideName2, setSelectedGuideName2] = useState('');
  // const [isGuide2Added, setIsGuide2Added] = useState(false);
  // const [selectedGuideTag, setSelectedGuideTag] = useState('guide1'); 
  // const [selectedGuides, setSelectedGuides] = useState(['chooseValue', null]);
  // const [enabledAddGuide,setEnabledAddGuide]=useState(false)
  const [guideError,setGuideError]=useState([])
  useEffect(() => {
    if (editTour && editTour.imageCover) {
      fetchFileFromUrl('tour', editTour.imageCover).then((file) =>
        setCurrentPhoto(file)
      );
    }
    if (editTour?.images && editTour.images.length > 0) {
      const fetchAllPhotos = async () => {
        const photoPromises = editTour.images.map((url) =>
          fetchFileFromUrl('tour', url)
        );
        const photos = await Promise.all(photoPromises);
        setCurrentImages(photos);
      };

      fetchAllPhotos();
    }
    if (editTour) {
      setSelectedCountry(editTour.countryNameCommon || null);
    }
    if (editTour && editTour.guides) {
      console.log(editTour.guides);
      
      const idArrays = editTour.guides.map((item) => item.id);
      // const guideName = editTour.guides
        // ? editTour.guides.map((item) => item.name)
        // : 'chooseValue';
console.log(guides);

if(!isLoading) {
      const guidesList = guides.filter((guide) => idArrays.includes(guide.value));
     
      // console.log(guidesList);
      
      // setSelectedGuides(idArrays);
      // setSelectedGuideName1(guideName[0]);
setChosenGuides(guidesList)
    }  
    // if (idArrays.length > 1) {
      //   setIsGuide2Added(true);
      //   setSelectedGuideName2(guideName[1] || 'chooseValue');
      // } 
    }
    fetchAndSetTourLocations(editTour);
  }, [editTour,isLoading]);


  const handleSetBusyGuides = (event) => {
    setStartDate((prev) => event.target.value);
    setChosenGuides(prev=>[])
    setBusyGuides(prev=>[])
    // var date2 = new Date(event.target.value);
    // date2.setDate(date2.getDate() + tour.locations.length - 1);

    // console.log(date2.toLocaleDateString('en-CA'))

   
    var guidesBusy = schedules
      .filter(
        (schedule) =>schedule.status&&
          (
          compareTwoDates(event.target.value,schedule.to.toString())!=='after')
     )
      .map((schedule) => {
        
        return schedule.guideId});
    setBusyGuides((prev) => guidesBusy);
    
    // if(startId!==''){
    //   var guideIdList =schedules.filter(sc=>sc.startDateId===startId&&sc.status).map(sc=>sc.guideId)
    //   console.log('aaaa',guideIdList)
    //   var temp2=guidesBusy
    //   console.log(guidesBusy)
    // temp2=temp2.filter(busy=>!guideIdList.includes(busy))
    // console.log('temp2',temp2)
    // setBusyGuides(prev=>[...temp2])
    // }
  };



  editTour ? console.log(editTour) : console.log('no editTour');

  // const handleGuideSelectChange = (event) => {
  //   setGuideError(prev=>[])
  //   const selectedGuide = guides.find(
  //     (guide) => guide.value === event.target.value
  //   );
  //   const guideName = selectedGuide
  //     ? selectedGuide.label.split('-')[0]
  //     : 'chooseValue';

  //   const newSelectedGuides = [...selectedGuides]; 

    // if (selectedGuideTag === 'guide2') {
    //   newSelectedGuides[1] = event.target.value;
    //   setSelectedGuideName2(guideName); 
    // } else {
    //   newSelectedGuides[0] = event.target.value;
    //   setSelectedGuideName1(guideName); 
    // }

  //   setSelectedGuides(prev=>newSelectedGuides); 
  //   handleAddErrorWhenGuideBusy();
  // };

const handleAddErrorWhenGuideBusy=()=>{
  // filter guides busy in dates
  var duration = coordinates.length;
   Array.from(schedules).filter(sc=>sc.status).forEach(schedule=>{
    Array.from(dates).forEach(date=>{
      var from = new Date(date);
      var to = new Date(date);
    to.setDate(to.getDate() + duration-1);
    if(!editTour){
      if(chosenGuides ==null || chosenGuides ==="" || chosenGuides == undefined) {
        setGuideError(prev => "Choose a guide first")

      }
      if(!(compareTwoDates(to.toLocaleDateString('en-CA'),schedule.from.toString())==="before"||compareTwoDates(from.toLocaleDateString('en-CA'),schedule.to.toString())==='after')){
        if(chosenGuides.includes(schedule.guideId)){
          setGuideError(prev=>[...`${schedule.guideName}-${schedule.guideEmail} has tour from ${schedule.from} to ${schedule.to}`])
        }
      }
    }else{
      var applyGuide = new Date(dateApplyGuide)
      if(!(compareTwoDates(to.toLocaleDateString('en-CA'),schedule.from.toString())==="before"||compareTwoDates(from.toLocaleDateString('en-CA'),schedule.to.toString())==='after')
        &&compareTwoDates(applyGuide.toLocaleDateString('en-CA'),schedule.from.toString())==='before'
      &&schedule.tourId!==editTour.id){
        if(chosenGuides.includes(schedule.guideId)){
          setGuideError(prev=>[...prev,`${schedule.guideName}-${schedule.guideEmail} has tour from ${schedule.from} to ${schedule.to}`])
        }
      }
    }
    
    })
  });
}

  // const handleAddGuide2 = () => {
  //   setIsGuide2Added(true);

  //   setSelectedGuides([selectedGuides[0], 'chooseValue']);
  //   setSelectedGuideName2('chooseValue'); // Initialize guide2
  // };

  // const handleRemoveGuide1 = () => {
  //   setSelectedGuides(['chooseValue', selectedGuides[1]]);
  //   setSelectedGuideName1('chooseValue'); // Reset guide1
  // };

  // const handleRemoveGuide2 = () => {
  //   setIsGuide2Added(false);
  //   setSelectedGuides([selectedGuides[0], null]); // Reset guide2
  //   setSelectedGuideName2('');
  // };

  ///

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      name: editTour?.name || '',
      maxGroupSize: editTour?.maxGroupSize || '',
      price: editTour?.price || '',
      priceDiscount: editTour?.priceDiscount || '',
      summary: editTour?.summary || '',
      description: editTour?.description || '',
      guide: editTour?.guides[0].id || '',
      imageCover: null,
      images: [], 
      countryNameCommon: editTour?.countryNameCommon || '',
    },
  });
  const { errors } = formState;

  const onError = (errors) => {
    toast.error('Form submit fail');
    console.log(errors);
  };

  const [inputs, setInputs] = useState(['']);
  const [dates, setDates] = useState(editTour ? editTour?.startDates : ['']);
  const [keys,setKeys]=useState(editTour?[editTour.keyOfDatesRelation]:[])
  const [descriptions, setDescriptions] = useState(['']);
  const [subDescriptions, setSubDescriptions] = useState([['']]);
  const [coordinates, setCoordinates] = useState([]);
  const [showFormatted, setShowFormatted] = useState([]);
  const [dateApplyGuide,setDateApplyGuide]=useState('')
  const [dateApplyLocation,setDateApplyLocation]=useState('')
  
console.log(keys[0])
  const fetchAndSetTourLocations = async (editTour) => {
    if (editTour && editTour.locations) {
      // Lấy tất cả các giá trị `address` và `description` từ `locations`
      const locationAddresses = editTour.locations
        .slice()
        .reverse()
        .map((location) => location.address);
      const locationDescriptions = editTour.locations
        .slice()
        .reverse()
        .map((location) => location.description);
      const newSubDescriptions = editTour.locations
        .slice()
        .reverse()
        .map((location) =>
          location.description.split(', ').map((desc) => desc.trim())
        );

      setSubDescriptions(newSubDescriptions);

      // Cập nhật vào state `inputs` và `descriptions`
      setInputs(locationAddresses);
      setDescriptions(locationDescriptions);

      console.log(locationAddresses);

      // Sử dụng for...of để đảm bảo async/await hoạt động đúng
      for (let index = 0; index < locationAddresses.length; index++) {
        const address = locationAddresses[index];
        try {
          const { place, index1 } = await geocodeAddress(address, index);
          console.log('index ' + index);
          console.log(address);

          if (place) {
            console.log(coordinates);

            // Cập nhật `coordinates` dựa trên giá trị trước đó
            setCoordinates((prevCoordinates) => {
              const newCoordinates = prevCoordinates
                ? [...prevCoordinates]
                : [];
              const coor = [place.geometry.lat, place.geometry.lng];
              newCoordinates[index] = { index1, coor };
              console.log('newCoordinates');
              console.log(newCoordinates);
              return newCoordinates;
            });

            // Cập nhật `showFormatted` dựa trên giá trị trước đó
            setShowFormatted((prevFormatted) => {
              const newFormatted = prevFormatted ? [...prevFormatted] : [];
              const formatted = place.formatted;
              newFormatted[index] = { index1, formatted };
              console.log(newFormatted);
              console.log('after');
              return newFormatted;
            });
          }
        } catch (error) {
          console.error('Error fetching geocode:', error);
        }
      }
    } else {
      // Nếu không phải edit hoặc không có locations, để input trống
      setInputs(['']);
      setDescriptions(['']);
      setSubDescriptions([['']]);
      setCoordinates([]);
      setShowFormatted([]);
    }
  };

  const handleInputDateChange = (index, event) => {
    // setSelectedGuides(prev=>[])
    const newInputs = dates.slice();
    newInputs[index] = event.target.value;
    if(!keys[index]||keys[index]===undefined){
      let r = (Math.random() + 1).toString(36).substring(7);
      console.log(r)
      var temp = keys
      var newObject={}
      newObject[r]=event.target.value
      setKeys(prev=>[...prev,newObject])
    }else{
      var temp = keys;
      var k = Object.keys(temp[index])[0]
      var newObject = {};
      newObject[k]=event.target.value;
      temp[index]=newObject
      console.log(temp)
      console.log('json string',JSON.stringify(newObject).replace('{','').replace('}',''))
     setKeys(temp)

    }
    setDates(newInputs);
    handleSetBusyGuides(event)
    console.log(busyGuides);
    console.log(startDate);
    
    
  };
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

  const handleInputChange = (index, event) => {
    const newInputs = inputs.slice();
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };
  const handleSubDescriptionChange = (locationIndex, subIndex, value) => {
    const updatedSubDescriptions = [...subDescriptions];
    updatedSubDescriptions[locationIndex][subIndex] = value;
    setSubDescriptions(updatedSubDescriptions);
  };

  const handleAddInput = () => {
    console.log(inputs);

    console.log(descriptions);
    setInputs([...inputs, '']);
    setSubDescriptions([...subDescriptions, ['']]);
    setCoordinates([...coordinates, '']);
  };
  const handleAddSubDescription = (locationIndex) => {
    const updatedSubDescriptions = [...subDescriptions];
    updatedSubDescriptions[locationIndex].push('');
    setSubDescriptions(updatedSubDescriptions);
  };
  const handleAddDates = () => {
    setDates([...dates, '']);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      const newDescriptions = subDescriptions.map((subDesc) =>
        subDesc.join(', ')
      );
      setDescriptions(newDescriptions);
    }, 500);

    return () => clearTimeout(timer);
  }, [subDescriptions]);
  const onSubmit = (data) => {
    // console.log(selectedGuides);
    console.log(chosenGuides);

    if(!editTour){
      handleAddErrorWhenGuideBusy()
    }
    if(!editTour&&guideError.length>0){
      toast.error('Guides are busy in selected date! Submit fail')
      return;
    }
    if (chosenGuides == null || chosenGuides.length == 0) {
      toast.error('Choose a guide');
      return;
    }
    const imagesElement = document.getElementById('images');
    const formData = new FormData();
    if (editTour !== undefined) {
      formData.append('id', editTour.id);
      
      formData.append('dateOfLocationAfter',dateApplyLocation)
      formData.append('dateOfGuideAfter',dateApplyGuide)
    }
    console.log(data);
    console.log('-------------------');
    console.log(data.images);
    formData.append('name', data.name);
    formData.append('maxGroupSize', data.maxGroupSize);
    if (typeof data.imageCover === String) {
      formData.append('imageCoverCopy', data.imageCover);
    } else {
      const imageCoverFile = data.imageCover?.[0] || currentPhoto;
      if (!imageCoverFile&&!editTour) {
        toast.error('Image cover is empty');
        return;
      }
      if(editTour){
        
          formData.append('imageCover', changeCover);
        
      }else{
        formData.append('imageCover', imageCoverFile);
      }
      
    }

    if(editTour){
      handleAddErrorWhenGuideBusy();
      
      if(changeImages.length>0){
        changeImages.forEach((file)=>formData.append('images', file))
      }else{
        formData.append('images',null)
      }
    }else{
      if (imagesElement.files.length > 0) {
        Array.from(imagesElement.files).forEach((file) => {
          formData.append('images', file);
        });
      } else if (currentImages.length > 0) {
        currentImages.forEach((file) => {
          formData.append('images', file);
        });
      } else {
        toast.error('Images are empty');
        return;
      }
      if(guideError.length>0){
        toast.error('Guide apply is busy! Please select another guide to apply from apply date')
      }
    }
    
    // append each coor
    if (coordinates && coordinates.length > 0) {
      Array.from(coordinates).forEach((coor) => {
        formData.append('lats', coor.coor[0]);
        formData.append('lngs', coor.coor[1]);
      });
    } else {
      toast.error('Please set valid address to fetch coordinates');
      return;
    }
    // append each descriptions
    if (descriptions && descriptions.length > 0) {
      Array.from(descriptions).forEach((desc) => {
        formData.append('descriptions', desc);
      });
    } else {
      toast.error('Please set descriptions to all locations');
      return;
    }
    // append each address
    if (inputs && inputs.length > 0) {
      Array.from(inputs).forEach((addr, index) => {
        formData.append('addresses', addr);
        formData.append('days', index + 1);
      });
    } else {
      toast.error('Please set valid addresses ');
      return;
    }
    if (dates && dates.length > 0) {
      Array.from(dates).forEach((date) => {
        formData.append('startDates', date.toString());
      });
    } else {
      toast.error('Please add startDate for tour');
      return;
    }
    if(editTour){
      //submit mapofkey
      Array.from(keys).forEach((key)=>{
        var obj = JSON.stringify(key).replace('{','').replace('}','').trim();
        formData.append('mapOfKeysAndStartDates',obj)
      
      })
    }
    formData.append('description', data.description);
    formData.append('summary', data.summary);
    formData.append('price', data.price);
    formData.append('priceDiscount', data.priceDiscount);

    // data.guide = data.guide !== undefined ? data.guide : guides[0].value;
    // formData.append('guides', data.guide);

    chosenGuides.forEach((guide) => {
      if ((guide !== '' || guide !== '#' || guide != null) && guide) {
        formData.append('guides', guide.value);
      }
    });

    if (
      !selectedCountry ||
      selectedCountry === '' ||
      selectedCountry == null ||
      selectedCountry === undefined
    ) {
      toast.error('Country is empty');
      return;
    }
    if (selectedCountry) {
      const country = countries.find((c) => c.name.common === selectedCountry);
      if (country) {
        formData.append('countryNameOfficial', country.name.official);
        formData.append('countryNameCommon', country.name.common);
        formData.append('region', country.region);
        formData.append('countryFlag', country.flags.svg);
      }
    }
    formData.append('status', 'active');
    formData.append('startTime', time);

    if (editTour !== undefined) {
      updateTour(formData, {
        onSettled: () => {
          updateAllBookingsRelated({tourId:editTour.id,dateOfGuideAfter:dateApplyGuide,dateOfLocationAfter:dateApplyLocation})
          reset();
          onClose?.();
        },
      });
    } else {
      createTour(formData, {
        onSettled: () => {
          reset();
          onClose?.();
        },
      });
    }
  };
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleCheckLocation = async (place) => {
    if (selectedCountry == null || selectedCountry == '#') {
      toast.error('Please choose a country first');
      return;
    }

    const c = Object.values(place.annotations.UN_M49.regions);
    const country = countries.find((c) => c.name.common === selectedCountry);

    if (
      !Object.values(place.annotations.UN_M49.regions).includes(country.ccn3)
    ) {
      toast.error('Please input locations in selected country');
      return;
    }
    toast('Locations valid');
  };
  const handleFetchCoordinates = async (index) => {
    console.log(inputs[index]);
    if (inputs[index].trim() === '') {
      toast.error('Please put valid address');
      return;
    }
    console.log('index fect ' + index);
    const { place, index1 } = await geocodeAddress(inputs[index], index);

    handleCheckLocation(place);
    console.log(place);
    if (place) {
      const newInputs = coordinates ? [...coordinates] : []; // Use spread operator to clone the array
      const coor = [place.geometry.lat, place.geometry.lng];
      console.log(coor);
      newInputs[index] = { index1, coor };

      setCoordinates(newInputs);
      const newFormatted = showFormatted ? [...showFormatted] : [];
      const formatted = place.formatted;

      newFormatted[index] = { index1, formatted };
      setShowFormatted(newFormatted);
    }
  };
  const [time, setTime] = useState(editTour ? editTour?.startTime : '05:00'); 
  const handleTimeChange = (event) => {
    setTime(event.target.value); 
  };
  if (isLoading || isCreating || isUpdating || isCountriesLoading || isLoading1)
    return <Spinner />;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={editTour ? 'regular' : 'modal'}
    >
      <FormRow label="Tour name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxGroupSize?.message}>
        <Input
          type="number"
          id="maxGroupSize"
          {...register('maxGroupSize', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
            max: {
              value: 100,
              message: 'Capacity should be less than or equal to 100',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          {...register('price', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price should be at least 1',
            },
            max: {
              value: 10000,
              message: 'Price should be less than or equal to 10,000',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.priceDiscount?.message}>
        <Input
          type="number"
          id="priceDiscount"
          {...register('priceDiscount', {
            validate: (value) =>
              Math.abs(value) < getValues().price ||
              'Discount should be less than regular price',
          })}
          defaultValue={0}
        />
      </FormRow>
      <FormRow label="Summary" error={errors?.summary?.message}>
        <Textarea
          type="number"
          id="summary"
          {...register('summary', {
            required: 'This field is required',
          })}
          defaultValue=""
        />
      </FormRow>
      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          {...register('description', {
            required: 'This field is required',
          })}
          defaultValue=""
        />
      </FormRow>

      {!editTour&&dates.map((input, index) => (
        <FormRow label={`Date ${index + 1}`}>
         
            <Input
              type="date"
              // min={getTodayDate()}
              value={input}
              onChange={(event) => handleInputDateChange(index, event)}
              placeholder={`Date ${index + 1}`}
            />
         
        </FormRow>
      ))}
      <FormRow>
      {!editTour&&dates && dates.length < 5 &&  <Button type="button" onClick={handleAddDates}>
          Add Dates
        </Button>}
      </FormRow>


      <FormRow label="Available Guide">
      <Select onChange={(event)=>{
                const user = guides.filter(guide=>guide.value===event.target.value)[0]
                handleAddGuides(user)
            }}  options={startDate!==''?guides.filter(guide=>!busyGuides.includes(guide.value)):[]} />
        {/* <Select
          options={guides.filter( 
            (guide) =>
              guide.value !==
              (selectedGuideTag === 'guide1'
                ? selectedGuides[1]
                : selectedGuides[0])
          )}
          value={
            selectedGuideTag === 'guide2'
              ? selectedGuides[1]
              : selectedGuides[0]
          }
        
          text="Choose a guide"
          {...register('guide', {
            onChange: (e) => {
            
            handleGuideSelectChange(e);
          }
          })} 
        /> */}
      </FormRow>
      <FormRow label="">
                <div style={{ display:'flex',justifyContent:'flex-start',alignItems:'center' }}>{chosenGuides.map(guide=><ButtonDefault onClick={()=>handleRevertGuideList({label:guide.label,value:guide.value})} style={{ display:'flex', alignItems:'center' }} endIcon={<HiTrash/>}>{guide.label}</ButtonDefault>)}</div>
            </FormRow>
            {guideError&&<FormRow><span style={{ color:'red' }}>{guideError.join(', ')}</span></FormRow>}
        {editTour&&<FormRow label="Apply changes of guide after selected date">
        <Input
              type="date"
              min={getTodayDate()}
              onChange={(event) => setDateApplyGuide(event.target.value)}
              placeholder={`Guide date`}
            />
        </FormRow>}


      <FormRow label="Country">
        <Controller
          name="countryNameCommon"
          control={control}
          rules={{
            validate: (value) =>
              String(value).length > 0 || 'This field is required',
          }}
          render={({ field }) => (
            <Select
              {...field}
              value={selectedCountry}
              options={Array.from(countries).map((c) => ({
                label: c.name.common,
                value: c.name.common,
              }))}
              text="Choose country"
              onChange={(e) => {
                const selected = e.target.value;
                field.onChange(selected);
                // const country = countries.find(c => c.name.common === selectedCountry);

                setSelectedCountry((prev) => selected);
                // setValue('countryNameCommon'), selected.name.common;

                // setValue('region', selected.region);
                // setValue('countryFlag', selected.flags.svg);
                // setValue('countryNameOfficial'), selected.name.official;
                // setChange((prev) => true);
              }}
            />
          )}
        />
      </FormRow>

      {selectedCountry && selectedCountry !== '#' && countries && (
        <FormRow>
          <img
            src={
              countries.find((c) => c.name.common === selectedCountry)?.flags
                .svg
            }
            alt="Country flag"
            width={50}
          />
          <Typography variant="h5">
            {countries.find((c) => c.name.common === selectedCountry)?.region}
          </Typography>
        </FormRow>
      )}
      {inputs.map((input, index) => (
        <>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <label style={{ marginRight: '1rem' }}>
              {`Location ${index + 1}`}
            </label>
            <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Input
                type="text"
                value={input}
                onChange={(event) => handleInputChange(index, event)}
                placeholder={`Address ${index + 1}`}
                style={{ marginLeft: '19rem', marginRight: '5rem', flexGrow: 1 }}
              />
              {/* <Input
                type="text"
                value={descriptions[index]}
                onChange={(event) =>
                  handleInputDescriptionsChange(index, event)
                }
                placeholder={`Description ${index + 1}`}
                //     {...register('descriptions', {
                //   required:  'This field is required',
                // })}
              /> */}
              <Button
                type="button"
                variation="secondary"
                onClick={() => handleFetchCoordinates(index)}
              >
                Fetch loc
              </Button>
              {/* {coordinates[index] && (
              <Input
                type="text"
                value={`[${coordinates[index].coor[0]},${coordinates[index].coor[1]}]`}
                disabled
                style={{ marginLeft: '1rem' }}
              />
            )} */}
           
           </div>
           </div>
           {showFormatted[index] &&
            showFormatted[index].formatted
          }
          {subDescriptions[index].map((subDesc, subIndex) => (
            <FormRow label={`Schedule ${subIndex + 1}`}>
                          <Input
                type="text"
                value={subDesc}
                onChange={(event) => handleSubDescriptionChange(index, subIndex, event.target.value)}
                placeholder={`Schedule ${subIndex + 1}`}
              />
                          </FormRow>
          ))}
          <FormRow>
          {subDescriptions[index] && subDescriptions[index].length < 5 && <Button type="button" onClick={() => { handleAddSubDescription(index) }}>
              Add Schedule
            
            </Button>}
          {/* {showFormatted[index] && showFormatted[index].formatted} */}
          </FormRow>
        </>
      ))}
      <FormRow>
      {inputs && inputs.length < 5 && <Button type="button" onClick={handleAddInput}>
          Add Location
        </Button>}
      </FormRow>
      
      {editTour&&<FormRow label="Apply changes of location after selected date">
        <Input
              type="date"
              min={getTodayDate()}
              onChange={(event) => setDateApplyLocation(event.target.value)}
              placeholder={`Location date`}
            />
        </FormRow>}
    
      {/* {selectedGuides[0] !== 'chooseValue' && !isGuide2Added && (
        <FormRow>
          <Button type="button" onClick={handleAddGuide2}>
            Add Guide2
          </Button>
        </FormRow>
      )} */}
      {/* Display Selected Guides */}

      {/* {editTour?.guides && selectedGuides[0].email} */}
      {/* <div
        style={{
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      > */}
        {/* Guide 1 with Remove Option */}

        {/* <div
          style={{
            display: 'inline-block',
            marginRight: '10px',
            cursor: 'pointer',
            border: selectedGuideTag === 'guide1' ? '2px solid blue' : 'none',
          }}
          onClick={() => setSelectedGuideTag('guide1')}
        >
          <span>Guide 1: {selectedGuideName1}</span>
          <button
            onClick={handleRemoveGuide1}
            type="button"
            style={{
              position: 'relative',
              cursor: 'pointer',
              background: 'inherit',
              color: 'var(--color-grey-400)', 
              border: 'none',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              textAlign: 'center',
              padding: 0,
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px', 
                color: 'var(--color-grey-400)',
                fontSize: '16px',
                lineHeight: '20px',
              }}
            >
              x
            </span>
          </button>
        </div> */}

        {/* Guide 2 with Remove Option */}
        {/* {isGuide2Added && (
          <div
            style={{
              display: 'inline-block',
              cursor: 'pointer',
              border: selectedGuideTag === 'guide2' ? '2px solid blue' : 'none',
            }}
            onClick={() => setSelectedGuideTag('guide2')}
          >
            <span>Guide 2: {selectedGuideName2}</span>
            <button
              onClick={handleRemoveGuide2}
              type="button"
              style={{
                position: 'relative', // Đặt position relative để điều chỉnh vị trí bên trong button
                cursor: 'pointer',
                background: 'inherit',
                color: 'var(--color-grey-400)', // Màu của dấu 'x' là xám nhạt
                border: 'none',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                textAlign: 'center',
                padding: 0,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '-5px', // Di chuyển dấu 'x' lên góc trên
                  right: '-5px', // Di chuyển dấu 'x' sang phải
                  color: 'var(--color-grey-400)', // Màu xám nhạt cho chữ 'x'
                  fontSize: '16px',
                  lineHeight: '20px', // Đảm bảo dấu 'x' căn giữa theo chiều dọc
                }}
              >
                x
              </span>
            </button>
          </div>
        )}
      </div> */}
    
      <FormRow label="Tour Photo">
        <FileInput
          id="imageCover"
          accept="image/*"
          {...register('imageCover', {
            required: editTour !== undefined ? false : 'This field is required',
          })}
          onChange={(e) => {setCurrentPhoto(e.target.files[0]);setChangeCover(e.target.files[0])}}
        />
      </FormRow>
      {editTour && currentPhoto && (
        <img
          src={URL.createObjectURL(currentPhoto)}
          alt="current user image"
          width={100}
        />
      )}
      <FormRow label="Tour Images">
        <FileInput
          id="images"
          accept="image/*"
          multiple
          {...register('images', {
            required: editTour !== undefined ? false : 'This field is required',
          })}
          onChange={(e) => {setCurrentImages(Array.from(e.target.files));setChangeImages(Array.from(e.target.files))}}
        />
      </FormRow>
      {currentImages.length > 0 && (
        <div>
          {currentImages.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Current Photo ${index}`}
              width={100}
              style={{ margin: '0.5rem' }}
            />
          ))}
        </div>
      )}
      <FormRow label={"Start Time"}>
     
     <Input
       type="time"
       value={time}
       onChange={handleTimeChange}
     />
    
   </FormRow>
      
      

     
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit">
          {editTour ? 'Update tour' : 'Add new tour'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateTourForm;