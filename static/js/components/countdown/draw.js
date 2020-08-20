import React, { useState, useEffect, useRef } from 'react'
import './draw.sass'
import { confirm } from '../popup/popup'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUser } from '../../redux/selectors'
import { actionDraw } from '../../redux/actions'

export const DrawList = () => {
    const {price} = useSelector(getCurrentUser)
    const dispatch = useDispatch()

    const clickDraw = async (nDraw) => {
        if (await confirm(`Dùng ${price[nDraw]} RP để rút ${nDraw} lượt`, true)) {
            dispatch(actionDraw(nDraw))
        }
    }

    return (
        <div className="draw-btns">
            <DrawOne clickDraw={clickDraw}></DrawOne>
            <DrawTen clickDraw={clickDraw}></DrawTen>
        </div>
    )   
}


const DrawOne = ({clickDraw}) => {
    return (
        <div className="btn-draw-one" onClick={()=>clickDraw(1)}>
            
        </div>
    )
}

const DrawTen = ({clickDraw}) => {
    return (
        <div className="btn-draw-ten" onClick={()=>clickDraw(10)}></div>
    )
}