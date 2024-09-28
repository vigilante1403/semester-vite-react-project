/*eslint-disable*/
import styled from 'styled-components';

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
import { geocodeAddress } from '../../utils/helpers';
import useCountries from './useCountries';
import { Typography, Box } from '@mui/material';
import fetchFileFromUrl from '../../services/useFetchFileFromUrl';
import { json } from 'react-router-dom';
import { useUpdateAllRelatedBookings } from '../bookings/useBookings';

function CreateTourForm({ onClose, editTour }) {
  const { createTour, isCreating } = useCreateTour();
  const { updateTour, isUpdating } = useUpdateTour();
  const { guides, isLoading } = useTourGuides();
  const { countries, isLoading: isCountriesLoading } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const{updateAllBookingsRelated}=useUpdateAllRelatedBookings()
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);

  const [selectedGuideName1, setSelectedGuideName1] = useState('chooseValue');
  const [selectedGuideName2, setSelectedGuideName2] = useState('');
  const [isGuide2Added, setIsGuide2Added] = useState(false);
  const [selectedGuideTag, setSelectedGuideTag] = useState('guide1'); // Track which guide is selected
  const [selectedGuides, setSelectedGuides] = useState(['chooseValue', null]);

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
      const idArrays = editTour.guides.map((item) => item.id);
      const guideName = editTour.guides
        ? editTour.guides.map((item) => item.name)
        : 'chooseValue';
      setSelectedGuides(idArrays);
      setSelectedGuideName1(guideName[0]);
      if (idArrays.length > 1) {
        setIsGuide2Added(true);
        setSelectedGuideName2(guideName[1] || 'chooseValue');
      } // set guides từ editTour vào state
    }
    fetchAndSetTourLocations(editTour);
  }, [editTour]);

  editTour ? console.log(editTour) : console.log('no editTour');
  const handleGuideSelectChange = (event) => {
    const selectedGuide = guides.find(
      (guide) => guide.value === event.target.value
    );
    const guideName = selectedGuide
      ? selectedGuide.label.split('-')[0]
      : 'chooseValue';

    const newSelectedGuides = [...selectedGuides]; // Clone the array

    if (selectedGuideTag === 'guide2') {
      newSelectedGuides[1] = event.target.value;
      setSelectedGuideName2(guideName); // Update guide2
    } else {
      newSelectedGuides[0] = event.target.value;
      setSelectedGuideName1(guideName); // Update guide1
    }

    setSelectedGuides(newSelectedGuides); // Update state
  };

  const handleAddGuide2 = () => {
    setIsGuide2Added(true);

    setSelectedGuides([selectedGuides[0], 'chooseValue']);
    setSelectedGuideName2('chooseValue'); // Initialize guide2
  };

  const handleRemoveGuide1 = () => {
    setSelectedGuides(['chooseValue', selectedGuides[1]]);
    setSelectedGuideName1('chooseValue'); // Reset guide1
  };

  const handleRemoveGuide2 = () => {
    setIsGuide2Added(false);
    setSelectedGuides([selectedGuides[0], null]); // Reset guide2
    setSelectedGuideName2('');
  };

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
      images: [], // No default file input, handled separately
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
  };
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
    console.log(selectedGuides);
    if (selectedGuides == null || selectedGuides.length <= 0) {
      toast.error('Choose a guide');
      return;
    }
    const imagesElement = document.getElementById('images');
    const formData = new FormData();
    if (editTour !== undefined) {
      formData.append('id', editTour.id);
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
      if (!imageCoverFile) {
        toast.error('Image cover is empty');
        return;
      }
      // if (data.images === undefined || data.images.length === 0) {
      //   toast.error('Images is empty');
      //   return;
      // }
      formData.append('imageCover', imageCoverFile);
    }
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

    selectedGuides.forEach((guide) => {
      if ((guide !== 'chooseValue' || guide !== '#') && guide) {
        formData.append('guides', guide);
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
          updateAllBookingsRelated({tourId:editTour.id})
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
  if (isLoading || isCreating || isUpdating || isCountriesLoading)
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
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.priceDiscount?.message}>
        <Input
          type="number"
          id="priceDiscount"
          {...register('priceDiscount', {
            validate: (value) =>
              Math.abs(value) <= getValues().price ||
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
      {/* <FormRow label="Guide" error={errors?.guide?.message}>
        <Select
          options={guides}
          {...register('guide', {
            validate: (value) =>
              String(value).length > 0 || 'This field is required',
          })}
          value={guides[0].value}
          onChange={(e) => setValue('guide', e.target.value)}
        />
      </FormRow> */}
      {/* <FormRow label="Available Guide" error={errors?.guide?.message}>
        <Controller
          name="guide"
          control={control}
          rules={{
            validate: (value) =>
              String(value).length > 0 || 'This field is required',
          }}
          defaultValue={editTour?.guides[0]?.id || ''} 
          render={({ field }) => (
            <Select
              {...field}
              options={guides}
              value={field.value || guides[0]?.value} 
              onChange={(e) => {
                const selectedValue = e.target.value;
                field.onChange(selectedValue);
                setValue('guide', selectedValue);
              }}
            />
          )}
        />
      </FormRow> */}
      <FormRow label="Available Guide">
        {/* <select
          style={{color:'inherit', backgroundColor:'inherit'}}
            value={selectedGuideTag === "guide2" ? selectedGuides[1] : selectedGuides[0]}
            onChange={handleGuideSelectChange}
          >
            <option style={{color:'inherit', background:' var(--color-grey-0)'}} value="chooseValue">Choose a guide</option>
            {guides
              .filter(
                (guide) => guide.value !== (selectedGuideTag === "guide1" ? selectedGuides[1] : selectedGuides[0]) // Exclude the other guide's selected value
              )
              .map((guide) => (
                <option style={{color:'inherit', backgroundColor:' var(--color-grey-0)'}} key={guide.value} value={guide.value}>
                  <span >{guide.label}</span>
                </option>
              ))}
          </select> */}

        <Select
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
          // onChange={handleGuideSelectChange}
          text="Choose a guide"
          {...register('guide', {
            required: 'required',
            validate: (value) =>
              String(value).length > 0 || 'This field is required',
            onChange: (e) => {
            
            handleGuideSelectChange(e);
          }
          })} // useForm hook register
        />
      </FormRow>

      {selectedGuides[0] !== 'chooseValue' && !isGuide2Added && (
        <FormRow>
          <Button type="button" onClick={handleAddGuide2}>
            Add Guide2
          </Button>
        </FormRow>
      )}
      {/* Display Selected Guides */}

      {editTour?.guides && selectedGuides[0].email}
      <div
        style={{
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        {/* Guide 1 with Remove Option */}

        <div
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
              position: 'relative', // Đặt position relative để điều chỉnh vị trí bên trong button
              cursor: 'pointer',
              background: 'inherit', // Màu xám nhạt
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

        {/* Guide 2 with Remove Option */}
        {isGuide2Added && (
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
      </div>

      <FormRow label="Tour Photo">
        <FileInput
          id="imageCover"
          accept="image/*"
          {...register('imageCover', {
            required: editTour !== undefined ? false : 'This field is required',
          })}
          onChange={(e) => setCurrentPhoto(e.target.files[0])}
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
          onChange={(e) => setCurrentImages(Array.from(e.target.files))}
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
      {dates.slice().reverse().map((input, index) => (
        <FormRow label={`Date ${index + 1}`}>
          <>
            <Input
              type="date"
              // min={getTodayDate()}
              value={input}
              onChange={(event) => handleInputDateChange(index, event)}
              placeholder={`Date ${index + 1}`}
            />
          </>
        </FormRow>
      ))}
      <FormRow>
        <Button type="button" onClick={handleAddDates}>
          + Add Dates
        </Button>
      </FormRow>
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
            <Button type="button" onClick={() => { handleAddSubDescription(index) }}>
              + Add Sub
            </Button>
          {/* {showFormatted[index] && showFormatted[index].formatted} */}
          </FormRow>
        </>
      ))}
      <FormRow>
        <Button type="button" onClick={handleAddInput}>
          + Add Input
        </Button>
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
