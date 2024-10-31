export const useAnimations = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  const buttonAnimation = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  }

  return {
    fadeInUp,
    buttonAnimation,
  }
}
