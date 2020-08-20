import React, { useState, useEffect, useRef } from 'react'
import './menu.sass'
import { useHistory } from 'react-router-dom';
import { RulePopupContent, HistoryPopup, InventoryPopup, normalOpenPopup, normalPopup, popupWithTitle } from '../popup/popup';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../redux/selectors';

export const Menu = () => {
    const {user} = useSelector(getCurrentUser)

    const onClickRule = () => {
        popupWithTitle("THỂ LỆ", <RulePopupContent />)
    }

    const onClickHistory = () => {
        popupWithTitle("LỊCH SỬ", <HistoryPopup />)
    }

    const onClickInventory = () => {
        normalOpenPopup(<InventoryPopup />)
    }

    const onClickLogin = () => {
        window.location = '/user/login'
    }



    return (
        <div className="menu">
            <div className="menu-btn" onClick={onClickInventory}>
                <div className="left inventory"></div>
                <div className="right inventory-hover"></div>
            </div>
            <div className="menu-btn" onClick={onClickRule}>
                <div className="left rule"></div>
                <div className="right rule-hover"></div>
            </div>
            <div className="menu-btn" onClick={onClickHistory}>
                <div className="left history"></div>
                <div className="right history-hover"></div>
            </div>
            <div className="menu-btn" onClick={onClickLogin} style={{visibility: user ? "hidden": ""}}>
                <div className="left login"></div>
                <div className="right login-hover"></div>
            </div>
        </div>
    )
}