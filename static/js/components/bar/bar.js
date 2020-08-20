import React from 'react';
import './bar.sass'
import {RulePopupContent, normalPopup} from '../popup/popup'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../redux/selectors';

export const Top = () => {
    const handleClickRule = () => {
        normalPopup("Thể lệ", <RulePopupContent />)
    }

    return (
        <div className="top">
            <div className="logo"></div>
            <div className="top-btn-list">
                <div className="btn-rule" onClick={handleClickRule}></div>
            </div>
         </div>
    )
}

export const Bottom = () => {
    const handleClickRule = () => {
        normalPopup("Thể lệ", <RulePopupContent />)
    }
    const {rp, user} = useSelector(getCurrentUser)

    if (!user) {
        return null
    }

    const clickTopup = () => {
        window.open("https://napthe.vn")
    }
    
    return (
        <div className="bottom-bar">
            <div className="logo"></div>
            {/* <Link to="/about">Home</Link> */}
            <div className="rp">
                <div className="username">XIN CHÀO {user && user.account_name}</div>
                <div className="space">|</div> <a href="/user/logout">ĐĂNG XUẤT</a>
                <div className="user-rp">{rp}</div>
                <div className="rp-plus" onClick={clickTopup}></div>
                {/* <div className="btn-rule" onClick={handleClickRule}></div> */}
            </div>
         </div>
    )
}