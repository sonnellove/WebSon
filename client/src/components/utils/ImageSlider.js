import React from 'react'
import { Carousel } from 'antd'

function ImageSlider({ images }) {
    return (
        <>
            <Carousel autoplay>
                {images.map((image, index) =>
                    <React.Fragment key={index}>
                        <img src={`${image}`} alt={`postImg-${index}`} />
                    </React.Fragment>
                )}
            </Carousel>
        </>
    )
}

export default ImageSlider
