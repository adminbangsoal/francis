import { useEffect, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    // width: window.innerWidth,
    // height: window.innerHeight,
    width: 0,
    height: 0,
  });

  function handleResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      //
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      //

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    } else return () => {};
  }, []);
  // });

  return windowSize;
};

export default useWindowSize;
