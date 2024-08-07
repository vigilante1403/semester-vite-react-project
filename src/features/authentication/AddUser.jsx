import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateUserForm from "./CreateUserForm";

export default function AddUser() {

    return (
        <Modal>
            <Modal.Open opens ="user-form">
                <Button>Add new user</Button>
            </Modal.Open>
            <Modal.Window name="user-form">
                <CreateUserForm/>
            </Modal.Window>
        </Modal>
    )
}