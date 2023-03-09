import { useCallback, useState } from "react";

export function useModalState(props?: { beforeOpen?: () => boolean }) {
  const [isShow, setShow] = useState(false);
  const handleOpen = useCallback(() => {
    if (!props?.beforeOpen || props.beforeOpen()) {
      setShow(true);
    }
  }, []);
  const handleClose = useCallback(() => {
    setShow(false);
  }, []);
  return { isShow, handleClose, handleOpen };
}
