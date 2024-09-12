import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import ButtonIcon from '../../ui/ButtonIcon'

import SpinnerMini from '../../ui/SpinnerMini'
import { useLogout } from './useLogout'
function Logout() {
    const {logout}=useLogout();
    return (
        <ButtonIcon onClick={logout}>
            <HiArrowRightOnRectangle/>
        </ButtonIcon>
    )
}

export default Logout
