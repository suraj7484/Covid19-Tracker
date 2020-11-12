import React from 'react'
import ReactDom from 'react-dom'
import Precautions from './Components/Precautions'
import App from './App'

const change = () => {
    document.getElementsByClassName('__app')[0].style.display = 'none'
    document.getElementsByClassName('_precautions')[0].style.display = 'block'
}
const change2 = () => {
    document.getElementsByClassName('__app')[0].style.display = 'block'
    document.getElementsByClassName('_precautions')[0].style.display = 'none'
}

ReactDom.render(
    <>
        <App Change = {change}/>
        <Precautions Change = {change2} />
    </>,
    document.getElementById('root'))