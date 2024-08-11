/* eslint-disable react/prop-types */
import styled from 'styled-components'
import toast from 'react-hot-toast'
import Table from '../../ui/Table'
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Menus from '../../ui/Menus'
import CreateUserForm from './CreateUserForm'
import { useUpdate } from './useUpdateUser'
import { useDeleteUser } from './useDeleteUser'
import { useCreateUser } from './useCreateUser'

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`
const Email = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`
const UserName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`


const Role = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

const Enable = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`

function AccountRow({ user }) {
  const { deleteUser, isDeleting } = useDeleteUser()
  const { createUser } = useCreateUser()
  const { id,email, name, role, enabled, photo } = user

  function handleDuplicate() {
    const formData = new FormData()
    formData.append("name", "Copy of " + name)
    formData.append("email","Copy" +Math.floor(Math.random() * 100) + email)
    formData.append("password",Math.floor(Math.random() * 1000000) )
    formData.append("role", role)
    formData.append("photo", photo)
    createUser(formData)
  }

  return (
    <Table.Row>
      <Img src={'http://localhost:8080/api/v1/file/image/user/' + photo || ''} />
      <Email>{email}</Email>
      <UserName>{name}</UserName>
      <Role>{role}</Role>
      <Enable>{enabled ? 'Enabled' : 'Disabled'}</Enable>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={() => handleDuplicate()}>
                Duplicate
              </Menus.Button>
              <Modal.Open opens={`edit-${id}`}>
                <Menus.Button icon={<HiPencil />}>
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
              <CreateUserForm editUser={user} />
            </Modal.Window>
            <Modal.Window name={`delete-${id}`}>
              <ConfirmDelete
                resourceName={name}
                onConfirm={() => deleteUser(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  )
}

export default AccountRow