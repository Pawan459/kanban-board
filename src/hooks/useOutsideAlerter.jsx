import { useEffect } from "react";

export default function useOutsideAlerter(ref, cb) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref?.current && !ref?.current?.contains(event.target)) {
        cb();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, cb]);
}