import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'

const images = [
  'women_swiper.jpg',
  'men_swiper.jpg',
  'jewelry.jpg',
  'electronics.jpg',
]

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
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`/${image}`}
              alt="cover"
              layout="fill"
              objectFit="cover"
              priority={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
