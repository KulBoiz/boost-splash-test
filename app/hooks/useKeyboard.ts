import { useCallback, useEffect, useState } from "react"
import { Keyboard } from "react-native"

export const useKeyboard = (
  didShow?: (keyboardHeight?: number) => void,
  didHide?: (keyboardHeight?: number) => void,
): [number] => {
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  const onKeyboardDidShow = useCallback(
    (e) => {
      setKeyboardHeight(e.endCoordinates.height)

      if (typeof didShow === "function") {
        didShow(e.endCoordinates.height)
      }
    },
    [didShow],
  )

  const onKeyboardDidHide = useCallback(() => {
    setKeyboardHeight(0)
    if (typeof didHide === "function") {
      didHide(0)
    }
  }, [didHide])

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", onKeyboardDidShow)
    const hideSubscription = Keyboard.addListener("keyboardDidHide", onKeyboardDidHide)

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [onKeyboardDidHide, onKeyboardDidShow])

  return [keyboardHeight]
}
