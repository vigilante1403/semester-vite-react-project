/* eslint-disable react/prop-types */
import styled from 'styled-components'
import { formatCurrency } from '../../utils/helpers'
import toast from 'react-hot-toast'
import Table from '../../ui/Table'
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Menus from '../../ui/Menus'
import CreateTourForm from './CreateTourForm'
import { useUpdateTour } from './useUpdateTour'
import { useDeleteTour } from './useDeleteTour'
import { useCreateTour } from './userCreateTour'

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`

const Tour = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`
function TourRow({ tour }) {

const {deleteTour,isDeleting}=useDeleteTour()
const {createTour,isCreating}=useCreateTour()
const {id,name,slug,maxGroupSize,price,priceDiscount,imageCover,guides,description,summary}=tour
  function handleDuplicate() {
   const formData = new FormData()
   formData.append("name","Copy of "+name+" "+Math.floor(Math.random() * 100));
    formData.append("maxGroupSize",maxGroupSize);
    formData.append("imageCoverCopy",imageCover)
    formData.append("description",description);
    formData.append("summary",summary);
    formData.append("price",price)
    formData.append("priceDiscount",priceDiscount)
    formData.append("guides",guides[0].id)
    createTour(formData)
  }
  return (
    <Table.Row>
    
      <Img src={'http://localhost:8080/api/v1/file/image/'+imageCover||''}  />
      <Tour>{name}</Tour>
      <div>Fits up {maxGroupSize} guests</div>
      <Price>{formatCurrency(price)}</Price>
      {priceDiscount > 0 ? (
        <Discount>{formatCurrency(priceDiscount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={() => handleDuplicate()}>
              Duplicate
            </Menus.Button>
          <Modal.Open opens={`edit-${id}`}>
          <Menus.Button icon={<HiPencil/>}>
              Edit
            </Menus.Button>
          </Modal.Open>
          <Modal.Open opens={`delete-${id}`}>
            <Menus.Button icon={<HiTrash />}>
              Delete
            </Menus.Button>
          </Modal.Open>
          </Menus.List>
          <Modal.Window name={`edit-${id}`}>
           <CreateTourForm editTour={tour} />
          </Modal.Window>
          <Modal.Window name={`delete-${id}`}>
            <ConfirmDelete
              resourceName={name}
              onConfirm={() => deleteTour(id)}
              disabled={isDeleting}
           
            />
          </Modal.Window>
          </Menus.Menu>
        </Modal>
        
      </div>
    </Table.Row>
  )
}

export default TourRow
