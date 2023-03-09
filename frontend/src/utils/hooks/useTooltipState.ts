import { useCallback, useState } from "react";

export function useTooltip() {
  const [isShow, setShow] = useState(false);
  const handleOnMouseEnter = useCallback(() => {
    setShow(true);
  }, []);
  const handleOnMouseLeave = useCallback(() => {
    setShow(false);
  }, []);
  return { isShow, handleOnMouseLeave, handleOnMouseEnter };
}
