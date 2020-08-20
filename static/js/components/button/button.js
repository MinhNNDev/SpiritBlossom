import React, { useState, useEffect, useRef } from 'react'
import "./button.sass"

export const Button = ({title, extraClass, onClick}) => {
    return (
        <div className={`btn ${extraClass}`} onClick={onClick}>{title}</div>
    )
}

export const GiveButton = ({point, onClick}) => {
    return (
        <div className={`btn btn-give`} onClick={onClick}>Tặng <span>+{point}</span></div>
    )
}

export const CancelBtn = (props) => {
    return (
        <Button title="HỦY" extraClass="cancel" {...props}/>
    )
}


export const ExtraCheckinBtn = (props) => {
    return (
        <Button title="ĐIỂM DANH BÙ" extraClass="missed" {...props}/>
    )
}
export const CheckinBtn = (props) => (
    <Button title="ĐIỂM DANH" extraClass="can_checkin" {...props}/>
)

export const DisabledCheckinBtn = (props) => (
    <Button title="ĐIỂM DANH" extraClass="future" {...props}/>
)

export const DisabledClaimBtn = (props) => (
    <Button title="MỞ QUÀ" extraClass="future" {...props}/>
)

export const ClaimBtn = (props) => (
    <Button title="MỞ QUÀ" extraClass="can_checkin" {...props}/>
)