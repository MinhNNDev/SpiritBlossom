import api, { ENDPOINT } from '../utils/request'
import {confirm, showPopupDrawResult} from '../components/popup/popup'
export const ACTION_LOAD_CONFIG = 'LOAD_CONFIG'
export const ACTION_CHECKIN = 'CHECKIN'
export const ACTION_CLAIM = 'CLAIM'
export const ACTION_SET_SELECTED_CHARACTER = 'SET_SELECTED_CHARACTER'
export const ACTION_CLICK_REWARD = 'CLICK_REWARD'
export const ACTION_DRAW = 'DRAW'
export const ACTION_GIVE = 'GIVE'
export const ACTION_LOAD_HISTORY = 'HISTORY'

export const RESPONSE_SUCESS = "successful"
export const ERROR_MSG_MAP = {
    server_error: "Thao tác không thực hiện được, xin vui lòng thử lại sau.",
    invalid_action: "Thao tác không thực hiện được, xin vui lòng thử lại sau.",
    no_champion: "Bạn chưa sở hữu tướng",
    already_own: "Không thể nhận vật phẩm vì đã sở hữu",
    not_enough_ip: "Không đủ Tinh Hoa Lam",
    not_enough_rp: "Không đủ RP",
    api_error: "Thao tác không thực hiện được, xin vui lòng thử lại sau.",
    event_ended: "Sự kiện đã kết thúc",
    "invalid-token": "Bạn chưa đăng nhập",
    limit_convert: "Số lượng vượt quá giới hạn đổi 1 lần",
}

export const actionGive = (characterId, point) => ({
    type: ACTION_GIVE,
    payload: {
        characterId,
        point
    },
})

export const actionDraw = (nDraw) => async (dispatch, getState) => {
    const data = await api(ENDPOINT.draw, {
        body: {
            n_draw: nDraw
        }
    })
    console.log('data', data)
    if (!data) {
        return
    }
    if (data.status == RESPONSE_SUCESS) {
        showPopupDrawResult(data.payload.random_items)
        dispatch({
            type: ACTION_DRAW,
            payload: data.payload
        })
    }   else {
        showErrorPopup(data.error_code)
    }
}


export const actionClickReward = reward => ({
    type: ACTION_CLICK_REWARD,
    payload: reward,
})

export const setSelectedCharacterAction = character => ({
    type: ACTION_SET_SELECTED_CHARACTER,
    payload: character,
})

export const loadConfig = () => async (dispatch, getState) => {
    const data = await api(ENDPOINT.config)
    console.log('data', data)
    if (!data) {
        return
    }
    dispatch({
        type: ACTION_LOAD_CONFIG,
        payload: data.payload
    })
}

export const loadHistory = () => async (dispatch, getState) => {
    const data = await api(ENDPOINT.history)
    console.log('data', data)
    if (!data) {
        return
    }
    if (data.status == RESPONSE_SUCESS) {
        dispatch({
            type: ACTION_LOAD_HISTORY,
            payload: data.payload
        })
    }   else {
        showErrorPopup(data.error_code)
    }
    
}

export const showErrorPopup = (errorCode) => {
    let msg
    if (errorCode in ERROR_MSG_MAP) {
        msg = ERROR_MSG_MAP[errorCode]
    } else {
        msg = ERROR_MSG_MAP.server_error
    }
    confirm(msg, false)
}
