import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateBookingForm from './CreateBookingForm'

export default function AddBooking() {
  // we create compund component bc we dont want the parent component (AddCabin) to keep track of state of children component (Modal) if his child is close or not but instead the modal component itself, so split the modal component and create the compound with the button inject
  return (
    <Modal>
      <Modal.Open opens="booking-form">
        <Button>Add new booking</Button>
      </Modal.Open>
      <Modal.Window name="booking-form">
        <CreateBookingForm />
      </Modal.Window>
    </Modal>
  )
}

