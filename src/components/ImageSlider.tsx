import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
  urls: string[];
};

export default function ImageSlider({ urls }: Props) {
  const activeStyles = "";

  return (
    <div>
      <div>
        <button></button>
        <button></button>
      </div>

      <Swiper></Swiper>
    </div>
  );
}
