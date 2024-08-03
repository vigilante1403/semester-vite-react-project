/* eslint-disable react/prop-types */
import styled from 'styled-components'
import { formatCurrency } from '../../utils/helpers'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCabin, getCabins } from '../../services/apiCabins'
import toast from 'react-hot-toast'
import Table from '../../ui/Table'

import CreateCabinForm from './CreateCabinForm'
import { useDeleteCabin } from './useDeleteCabin'
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import { useCreateCabin } from './useCreateCabin'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Menus from '../../ui/Menus'

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

const Cabin = styled.div`
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
//   const { isLoading, mutate } = useCreateCabin()
//   const {
//     id: cabinId,
//     name,
//     maxCapacity,
//     regularPrice,
//     discount,
//     image,
//     description,
//   } = cabin
//   const { isDeleting, deleteCabin } = useDeleteCabin()
  function handleDuplicate() {
   
    
  }
  return (
    <Table.Row>
      <Img  />
      <Cabin></Cabin>
      <div>Fits up guests</div>
      <Price>{formatCurrency()}</Price>
      {/* {discount > 0 ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )} */}
      <div>
        <Modal>
        <Menus.Menu>
          <Menus.Toggle id />
          <Menus.List id>
            <Menus.Button icon={<HiSquare2Stack />} onClick={() => handleDuplicate()}>
              Duplicate
            </Menus.Button>
          <Modal.Open opens="edit">
          <Menus.Button icon={<HiPencil/>}>
              Edit
            </Menus.Button>
          </Modal.Open>
          <Modal.Open opens="delete">
            <Menus.Button icon={<HiTrash />}>
              Delete
            </Menus.Button>
          </Modal.Open>
          </Menus.List>
          <Modal.Window name="edit">
            {/* <CreateCabinForm cabinToEdit={cabin} /> */}
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
            //   resourceName={name}
            //   onConfirm={() => deleteCabin(cabinId)}
            //   disabled={isDeleting}
            />
          </Modal.Window>
          </Menus.Menu>
        </Modal>
        
      </div>
    </Table.Row>
  )
}

export default TourRow