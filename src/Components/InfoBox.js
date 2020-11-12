import { Card, CardContent, Typography } from '@material-ui/core'
import './InfoBox.css'
import React from 'react'

const InfoBox = ({title,cases ,total , isRed,  isGreen, isGrey, isPink , activestats,...props}) => {
    const CLASS = `infoBox__cases ${isRed ? "infoBox__cases--red" : isGreen ? "infoBox__cases--green" : isGrey ? "infoBox__cases--grey" : isPink ? "infoBox__cases--pink" : "" }`
    const TOP = `infoBox ${activestats && 'infoBox--selected'} ${isRed ? "infoBox--red" : isGreen ? "infoBox--green" : isGrey ? "infoBox--grey" : isPink ? "infoBox--pink" : ""}`
    return (
        <Card className = {TOP} onClick = {props.onClick}>
            <CardContent>
                <Typography className = "infoBox__title" color = "textSecondary">
                    {title}
                </Typography>
                <h2 className = {CLASS}>{cases}</h2>
                <Typography className = "infoBox__total" color = "textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
