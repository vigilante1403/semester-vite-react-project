import { useRef,useEffect } from "react"
export function useOutsideClick(handler,listenCapturing=true) {
  const ref = useRef()
  useEffect(
    function () {
      function handleClickCb(event) {
        // select el using ref
        if (ref.current && !ref.current.contains(event.target)) handler() // currently the dom node
      }
      document.addEventListener('click', handleClickCb, listenCapturing) // change event from bubling to capturing
      return () => document.removeEventListener('click', handleClickCb, listenCapturing) //remove event when unmount
    },
    [handler,listenCapturing],
  )
  return {ref};
}