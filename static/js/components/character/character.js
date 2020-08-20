import React, { useState, useEffect, useRef } from 'react'
import './character.sass'
import { Button, ExtraCheckinBtn, CheckinBtn, DisabledCheckinBtn, DisabledClaimBtn, ClaimBtn } from '../button/button'
import { confirm, select, skinPopup, normalOpenPopup, ChampionPopup } from '../popup/popup'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUser } from 'redux/selectors'
import { setSelectedCharacterAction } from 'redux/actions'
import { getSelectedCharacter, getSelectedFavorLevel, getSelectedCharacterPoint } from '../../redux/selectors'
import { actionGive } from '../../redux/actions'

export const CharacterContainer = () => {
    const [isChanging, setIsChanging] = useState(false)
    return (
        <div className="character-container">
            <SelectedCharacter isChanging={isChanging} setIsChanging={setIsChanging}/>
            <CharacterList setIsChanging={setIsChanging}/>
            <Gift />
        </div>
    )
}

const Gift = () => {
    const clickGift = () => {
        normalOpenPopup(<ChampionPopup />)
    }

    return (
        <div className="gift" onClick={clickGift}>
        </div>
    )
}

const SelectedCharacter = ({isChanging}) => {
    // console.log('render character')
    const dispatch = useDispatch()
    const [favoriteProgress, setfavoriteProgress] = useState(0)
    const selectedCharacter = useSelector(getSelectedCharacter)
    const favorLevel = useSelector(getSelectedFavorLevel)

    const [tooltipVisible, setTooltipVisible] = useState("hidden")
    const [tooltipX, setTooltipX] = useState(50)
    const [tooltipY, setTooltipY] = useState(50)

    const tooltipStyle = {
        top: `${tooltipY}%`,
        left: `${tooltipX}%`,
        visibility: tooltipVisible
    }


    const hoverCharacter = (e) => {
        setTooltipVisible("visible")
    }

    const moveOutCharacter =  () => {
        setTooltipVisible("hidden")
    }

    const mouseMove = (e) => {
        let x
        if (window.innerWidth <= 1055) {
            x = e.clientX / window.innerWidth * 100
        }   else {
            x = (e.clientX - (window.innerWidth - 1055) / 2) / 1055 * 100
        }
        let y
        if (window.innerWidth <= 1055) {
            y = e.clientY / (window.innerWidth * 638 / 1055) * 100
        }   else {
            y = (e.clientY ) / 638 * 100
        }
        if ((Math.abs(x - tooltipX) >= 2) || (Math.abs(y - tooltipY) >= 2)) {
            setTooltipX(x)
            setTooltipY(y)
        }
    }

    // setTimeout(() => {
    //     dispatch(actionGive(selectedCharacter.id, 300))
    // }, 1000)

    return (
        <div className={`selected-character ${isChanging ? "appear": ""}`}>
            <img className="character-img" src={selectedCharacter && selectedCharacter.image_main} onMouseMove={mouseMove} onMouseEnter={(e) => hoverCharacter(e)} onMouseOut={moveOutCharacter}></img>
            <div className="character-tooltip" style={tooltipStyle}>
                <ul>
                    {selectedCharacter && selectedCharacter.level_rewards.map((item, index) => (
                        <div className="reward" key={index}>
                            <div className={`level level-${item.level}`}></div>
                            <div className="point">{item.require_point} điểm</div>
                            <img src={item.image} />
                        </div>
                    ))}
                </ul>
            </div>
            <div className={`favorite-progress favorite-progress-${favorLevel}`}>
            {/* <Button title="change" onClick={() => dispatch(actionGive(selectedCharacter.id, 300))}/> {useSelector(getSelectedCharacterPoint)} | {selectedCharacter && selectedCharacter.user_point}  */}
            </div>
        </div>
    )
}

const CharacterList = ({setIsChanging}) => {

    // console.log('render CharacterList')
    const dispatch = useDispatch()
    const { character_list } = useSelector(getCurrentUser)
    
    let [nRotate, setNRotate] = useState(0)
    let [fetched, setFetched] = useState(false)
    let [selectedIdx, setSelectedIdx] = useState(null)

    // console.log('render CharacterList', character_list, selectedIdx)


    if (selectedIdx === null && character_list.length > 0) {
        const selectedIndex = 2
        setSelectedIdx(selectedIndex)
        setFetched(true)
    }
    useEffect(()=> {
        console.log('run when fetched change', fetched, selectedIdx)
        if (selectedIdx) {
            dispatch(setSelectedCharacterAction(character_list[selectedIdx].id))
        }
    }, [fetched])
    

    const onClickCharacter = (index) => {
        console.log('click pos', index)
        setIsChanging(true)
        setNRotate(nRotate => nRotate + selectedIdx - index)
        setTimeout(() => {
            setSelectedIdx(index)
            dispatch(setSelectedCharacterAction(character_list[index].id))
        }, 250)
        setTimeout(() => {setIsChanging(false)}, 500)
    }

    return (
        <ul className="character-list" style={{transform: `rotate(${nRotate * 30}deg)`}}>
            {character_list.map((character, index) => (
                <div key={index} className="single-character" style={{transform: `rotate(${(index+1) * 30}deg)`}}>
                    <CharacterOption  index={index} character={character} nRotate={nRotate} isSelected={index === selectedIdx} handleClick={onClickCharacter}/>
                </div>)
            )}
            {/* <div className="tmp-btn">
                <Button title="Next" onClick={onClickNext}></Button>
                <Button title="Prev" onClick={onClickPrev}></Button>
            </div> */}
        </ul>
    )
}

export const CharacterOption = ({ character, index, nRotate, handleClick, isSelected }) => {
    const dispatch = useDispatch()

    // const clickExtraCheckin = async () => {
    //     // if (await(confirm("Cần điểm danh tất cả các ngày để nhận quà đặc biệt"))) {
    //     if (await(confirm(`Dùng ${item.require_ip} Tinh Hoa Lam để điểm danh bù?`))) {
    //         dispatch(checkin(item.day_number))
    //     }
    // }

    return (
        <div className={`character ${isSelected ? "active": ""}`} style={{transform: `rotate(${-nRotate * 30 -index * 30 - 30}deg)`}}>
            <div className="name" onClick={() => handleClick(index)}>{character.name}</div>
            <img className="thumbnail" src={character.image_icon} onClick={() => handleClick(index)}></img>
        </div>
    )
}

