import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'

export default function HeroSwiper() {
  return (
    <div className="h-72">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
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
