import React from 'react'
import "./AuthSlider.scss"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const AuthSlider = () => {
    return (
        <div className="auth-slider-area">
            <Swiper
                pagination={{
                    clickable: true,
                }}
                spaceBetween={0}
                speed={1000}
                autoplay={{
                    delay: 2000,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper">
                <SwiperSlide>
                    <div className="slider-img-area">
                        <img src="./assets/images/slider_img_1.png" className="img-fluid" alt='slider-img' />
                    </div>
                    <div className="text-center">
                        <h1 className='auth-slider-heading'>Hospital</h1>
                        <h6 className="auth-sub-heading">You Can stay your Hospital and Contact With Your Facility</h6>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slider-img-area">
                        <img src="./assets/images/slider_img_2.png" className="img-fluid" alt='slider-img' />
                    </div>
                    <div className="text-center">
                        <h1 className='auth-slider-heading'>Hospital</h1>
                        <h6 className="auth-sub-heading">You Can stay your Hospital and Contact With Your Facility</h6>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default AuthSlider