import {ACTION_LOAD_CONFIG, ACTION_CHECKIN, ACTION_CLAIM, ACTION_SET_SELECTED_CHARACTER, ACTION_CLICK_REWARD, ACTION_DRAW, ACTION_GIVE, ACTION_LOAD_HISTORY} from './actions'

const CHARACTER_LIST = [
    // {
    //     'id': 1,
    //     'name': 'YASUO',
    //     'favorite_score': 1,
    //     'thumb_img': '/images/character-small-img.png',
    //     'big_img': '/images/selected-character.png'
    // }, 
    // {
    //     'id': 2,
    //     'name': 'XXXX',
    //     'favorite_score': 1,
    //     'thumb_img': '/images/character-small-img-1.png',
    //     'big_img': '/images/selected-character-1.png'
    // }, 
    // {
    //     'id': 3,
    //     'name': 'kjaklda',
    //     'favorite_score': 1,
    //     'thumb_img': '/images/character-small-img-1.png',
    //     'big_img': '/images/selected-character-2.png'
    // }, 
    // {
    //     'id': 4,
    //     'name': 'KHDLASHD',
    //     'favorite_score': 1,
    //     'thumb_img': '/images/character-small-img.png',
    //     'big_img': '/images/selected-character-1.png'
    // }, 
    // {
    //     'id': 5,
    //     'name': 'HSKHSDFKH',
    //     'favorite_score': 1,
    //     'thumb_img': '/images/character-small-img.png',
    //     'big_img': '/images/selected-character.png'
    // }, 
]

let INVENTORY = []

for (let i=0; i<=30; i++) {
    INVENTORY.push({
        'id': i,
        'image': '/images/reward-img.png',
        'name': 'AAAAA',
        'selected': false
    })
}

const initialState = {
    user: null,
    character_list: [],
    selectedCharacterID: null,
    specials: [],
    remain_second: null,
    inventory: INVENTORY,
    price: {
        1: null, 
        10: null
    },
    history: []
};

const currentUser = (state=initialState, {type, payload}) => {
    switch (type) {
        case ACTION_LOAD_CONFIG:
            return {
                ...state,
                ...payload
            }
        case ACTION_SET_SELECTED_CHARACTER:
            return {
                ...state,
                selectedCharacterID: payload
            }
        case ACTION_CLICK_REWARD:
            let {inventory} = state
            let newInventory = []
            for (let e of inventory) {
                if (e.id == payload.id) {
                    e.selected = !e.selected
                }
                newInventory.push(e)
            }

            return {
                ...state,
                inventory: newInventory
            }
        case ACTION_DRAW:
            return {
                ...state,
                rp: payload.remain_rp
            }
        case ACTION_LOAD_HISTORY:
            return {
                ...state,
                history: payload
            }
        case ACTION_GIVE:
            let newCharacterConfig =  JSON.parse(JSON.stringify(state.character_list))
            for (let character of newCharacterConfig) {
                if (character.id === payload.characterId) {
                    character.user_point = payload.point
                }
            }
            console.log('equal', state.character_list === newCharacterConfig)
            return {
                ...state,
                character_list: newCharacterConfig,
            }
    }


    return state
}

export default currentUser
