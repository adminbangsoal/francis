export const verticalSliderVariants = (n: number) => ({
  animate: {
    y: [-70, -(300 * (n + 1))],
    transition: {
      y: {
        repeat: Infinity,
        repeatType: "loop",
        duration: n * 3,
        ease: "linear",
      },
    },
  },
});

export const topicIndex = [
  "Kemampuan Penalaran Umum",
  "Pengetahuan Kuantitatif",
  "Pengetahuan dan Pemahaman Umum",
  "Pemahaman Bacaan dan Menulis",
  "Penalaran Matematika",
  "Bahasa Indonesia",
  "Bahasa Inggris",
];
