import styled from "styled-components";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from '../../ui/Spinner'

import { useMoveBack } from "../../hooks/useMoveBack";
import {useUser} from './useUser'
import { useNavigate } from "react-router-dom";

import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
import { useDeleteUser } from "./useDeleteUser";
import AccountDataBox from "./AccountDataBox";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function AccountDetail() {
  const navigate=useNavigate()
  const {user,isLoading}=useUser();
  const {deleteUser,isDeleting}=useDeleteUser()
 
  const moveBack = useMoveBack();

  const statusToTagName = {
    ADMIN: "blue",
    GUIDE: "green",
    LEADGUIDE:"yellow",
    USER: "silver",
  };
  if(isLoading) return <Spinner />
  if(!user||user==null) return <Empty resourceName="user"/>
  const {role,id,fullName}=user;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">User {fullName}</Heading>
          <Tag type={statusToTagName[role]}>{role}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <AccountDataBox user={user} />
      

      <ButtonGroup>
      <Modal>
      <Modal.Open opens='delete'>
      <Button variation='danger'>Delete</Button>
      </Modal.Open>
      <Modal.Window name='delete'>
        <ConfirmDelete onConfirm={()=>deleteUser(id,{onSettled:navigate('/admin/users')})} resourceName={id}/>
      </Modal.Window>
      
      </Modal>
      
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default AccountDetail;