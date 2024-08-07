/*eslint-disable*/

import { cloneElement, createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { HiXMark } from 'react-icons/hi2'
import styled from 'styled-components'
import { useOutsideClick } from '../hooks/useOutsideClick'

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  max-height: 90vh; /* Ensure the modal does not exceed the viewport height */
  overflow-y: auto; /* Enable vertical scrolling if content overflows */
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
  scrollbar-width: none;
  &::-webkit-scrollbar{
    display: none;
  }
  /* scrollbar-width: 0; */
`

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`
const ModalContext = createContext()

export default function Modal({ children }) {
  const [openName, setOpenName] = useState('') // empty window
  const close = () => setOpenName('')
  // const open = (name)=>setOpenName(name)
  const open = setOpenName
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  )
}
export function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext)
  return cloneElement(children, { onClick: () => open(opensWindowName) }) // parsing open to children by clone in react
}
export function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext)
  const {ref} = useOutsideClick(close);
  if (name !== openName) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children,{onClose:close})}</div>
      </StyledModal>
    </Overlay>,
    document.body, // can render this component in any where of dom
  )
}
Modal.Open = Open
Modal.Window = Window
