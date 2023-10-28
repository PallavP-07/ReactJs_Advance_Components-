import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../Assets/Styles/Carousel.css"
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import Card from './Card';
import Heading from './Heading';
import Fixturecard from './Fixture/Fixturecard';
import { useTranslation } from "react-i18next";

const Carousels = ({ data, responsive }) => {
    const { t, i18n } = useTranslation();
    const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
        const { carouselState: { currentSlide } } = rest;
        return (
            <div className=" col-12 p-2 d-flex flex-row justify-content-end gap-2">
                <LeftCircleOutlined className={currentSlide === 0 ? 'disable' : ''} style={{ fontSize: "22px" }} onClick={() => previous()}  />
                <RightCircleOutlined className={currentSlide === rest.carouselState.totalItems - 1 ? 'disable' : ''} style={{ fontSize: "22px", }} onClick={() => next()}  />
            </div>
        );
    };

    return (
        <div className='Carsoul pb-4'>
            <Carousel
                arrows={false}
                responsive={responsive}
                renderButtonGroupOutside={true}
                customButtonGroup={<ButtonGroup />}
            >
                {data.map((datas, idx) => {
                    return (
                        datas.Navcard ?
                            <Fixturecard
                                data={datas}
                                style={{ borderRight: "1px solid gray" }}
                                
                            /> : <Card
                                data={datas}                           
                            />
                    )
                })}
            </Carousel>
        </div>

    )
}

export default Carousels