import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'

export default function HeroSwiper() {
  return (
    <div className="h-72">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="rounded-lg shadow-lg"
      >
        <SwiperSlide>
          <img src="/women_swiper.jpg" alt="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/men_swiper.jpg" alt="cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
