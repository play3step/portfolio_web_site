export const windowVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
    y: 100,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    },
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
} as const;
