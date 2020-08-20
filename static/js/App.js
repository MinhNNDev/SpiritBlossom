import React, { useEffect } from 'react'
import './App.sass';
import './components/hover/hover.sass'
import { Top, Bottom } from './components/bar/bar'
import { Popup } from './components/popup/popup'
import Countdown from './components/countdown/countdown'
import { CheckinList, CharacterContainer } from './components/character/character'

import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import { loadConfig } from "./redux/actions"
import { DrawList } from './components/draw/draw';
import { Link } from 'react-router-dom';
import { Menu } from './components/menu/menu';
import { getSelectedCharacter, character_listSelector } from './redux/selectors';
import { HoverTooltip, hover } from './components/hover/hover';
import { Button } from './components/button/button';


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadConfig())
  }, [0])
  

  const characterList = useSelector(character_listSelector)

  if (characterList.length === 0) {
    return (<div className="App" style={{justifyContent: "center", display: "flex", alignItems: "center"}}><div className="loader"></div></div>)
  }

  return (
    <div className="App">
      <CharacterContainer /> 
      <Countdown/>
      <DrawList></DrawList>
      <Menu></Menu>
      <Bottom></Bottom>
      <Popup />
      <HoverTooltip />
    </div>
  )
}


export default App;
