import klasikAnimation from "../../animations/klasik.json";
import sekuensialAnimation from "../../animations/sekuensial.json";
import sekuensialMobileAnimation from "../../animations/sequential_mobile.json";

export const klasikAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: klasikAnimation,
  renderer: "svg",
};
export const sekuensialAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: sekuensialAnimation,
  renderer: "svg",
};
export const sekuensialMobileAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: sekuensialMobileAnimation,
  renderer: "svg",
};
