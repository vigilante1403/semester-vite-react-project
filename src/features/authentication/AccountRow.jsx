/* eslint-disable react/prop-types */
import styled from 'styled-components'
import toast from 'react-hot-toast'
import Table from '../../ui/Table'
import { HiEye, HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Menus from '../../ui/Menus'
import CreateUserForm from './CreateUserForm'

import { useDeleteUser } from './useDeleteUser'
import { useCreateUser } from './useCreateUser'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AdminContext } from '../../ui/ProtectedRouteAdmin'


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
const Country = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;
const Flag = styled.img`
  width: 3rem;
  height: auto;
`;
function AccountRow({ user }) {
  const { deleteUser, isDeleting } = useDeleteUser()
  const { createUser } = useCreateUser()
  const { id,email, name, role, enabled, photo, countryFlag,nationality } = user
  const navigate = useNavigate()
  const {user:userAuthenticated}=useContext(AdminContext)
  function handleDuplicate() {
    const formData = new FormData()
    formData.append("name", "Copy of " + name)
    formData.append("email","Copy" +Math.floor(Math.random() * 100) + email)
    formData.append("password",Math.floor(Math.random() * 1000000) )
    formData.append("role", role)
    formData.append("photo", photo)
    createUser(formData)
  }
  const isAdmin = userAuthenticated.authorities.some(role => role.authority === 'ADMIN')
  const canEdit = isAdmin 
  const canDelete = isAdmin;
  return (
    <Table.Row>
      <Img src={'http://localhost:8080/api/v1/file/image/user/' + photo || ''} />
      <Email>{email}</Email>
      <UserName>{name}</UserName>
      <Role>{role}</Role>
      <Enable>{enabled ? 'Enabled' : 'Disabled'}</Enable>
      <Country>
        {countryFlag && <Flag src={countryFlag} alt={`${nationality} flag`} />}
        <div>{nationality}</div>
      </Country>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
            {canEdit && (
                <>
                  <Menus.Button icon={<HiSquare2Stack />} onClick={() => handleDuplicate()}>
                    Duplicate
                  </Menus.Button>
                  <Modal.Open opens={`edit-${id}`}>
                    <Menus.Button icon={<HiPencil />}>
                      Edit
                    </Menus.Button>
                  </Modal.Open>
                </>
              )}
              <Menus.Button icon={<HiEye />} onClick={() => navigate(`/admin/accounts/${id}`)}>
                See details
              </Menus.Button>
              {canDelete && (
                <Modal.Open opens={`delete-${id}`}>
                  <Menus.Button icon={<HiTrash />}>
                    Delete
                  </Menus.Button>
                </Modal.Open>
              )}
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