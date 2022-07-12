import { useEffect, useRef, useState } from "react";

export const useElementObserver = (options) => {
  const messageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const cbObserver = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(cbObserver, options);
    if(messageRef.current) observer.observe(messageRef.current);

    return () => {
      if(messageRef.current) observer.unobserve(messageRef.current);
    }
  }, [messageRef, options]);

  return [messageRef, isVisible];
};
