import useWindowSize from "./windowSize";

export const useWindowsBreakpoints = () => {
  const { width } = useWindowSize();
  const isMobileBreakpoint = width < 768;
  const isTabletBreakpoint = width >= 768;
  const isDesktopBreakpoint = width >= 1024;
  const isXLDesktopBreakpoint = width >= 1280;

  return {
    isMobileBreakpoint,
    isTabletBreakpoint,
    isDesktopBreakpoint,
    isXLDesktopBreakpoint,
  };
};
