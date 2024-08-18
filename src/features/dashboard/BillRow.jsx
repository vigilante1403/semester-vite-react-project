/* eslint-disable react/prop-types */
import styled from 'styled-components'
import Table from '../../ui/Table'

const UserEmail = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const BookingName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const PaidAt = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-grey-500);
  font-family: 'Sono';
`

function BillRow({ bill }) {
  const { userEmail, booking, paidAt } = bill

  return (
    <Table.Row>
      <UserEmail>{userEmail}</UserEmail>
      <BookingName>{booking.tour.name}</BookingName>
      <PaidAt>{paidAt ? new Date(paidAt).toLocaleDateString() : 'N/A'}</PaidAt>
    </Table.Row>
  )
}

export default BillRow
