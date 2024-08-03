import CreateTourForm from './CreateTourForm'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'

export default function AddTour() {
  // we create compund component bc we dont want the parent component (AddCabin) to keep track of state of children component (Modal) if his child is close or not but instead the modal component itself, so split the modal component and create the compound with the button inject
  return (
    <Modal>
      <Modal.Open opens="tour-form">
        <Button>Add new tour</Button>
      </Modal.Open>
      <Modal.Window name="tour-form">
        <CreateTourForm />
      </Modal.Window>
    </Modal>
  )
}

