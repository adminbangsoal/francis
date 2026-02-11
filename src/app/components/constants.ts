export const infiniteSliderVariants = (minWidth: number, n: number) => ({
  animate: {
    x: [-minWidth + 300, 313],
    transition: {
      x: {
        repeat: Infinity,
        duration: n * 3, // Duration based on the number of images
        ease: "linear",
      },
    },
  },
});
