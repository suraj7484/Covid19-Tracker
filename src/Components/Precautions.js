import React from 'react'
import BackArrow from './BackArrow.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Precautions.css'
import Carousel from 'react-bootstrap/Carousel'
import covid1 from '../Images/covid1.jpg'
import covid2 from '../Images/covid5.jpg'
import covid3 from '../Images/covid6.jpg'
import covid4 from '../Images/covid8.jpg'

const Precautions = ({Change}) => {

    return (
        <>
            <div className="_precautions">
                <div className="containerr">
                    <div className="container_top">
                        <a className="return" onClick = {Change}><img src={BackArrow} alt="image" className="back" />Return</a>
                        <h1 className="header">PRECAUTIONS</h1>
                        <div />
                    </div>
                    <div className="container_below">
                        <Carousel className="main">
                            <Carousel.Item className="mySlides">
                                <img className="image" src={covid1} />

                            </Carousel.Item>
                            <Carousel.Item className="mySlides">
                                <img className="image" src={covid2} />


                            </Carousel.Item>
                            <Carousel.Item className="mySlides">
                                <img className="image" src={covid3} />

                            </Carousel.Item>
                            <Carousel.Item className="mySlides">
                                <img className="image" src={covid4} />

                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Precautions
