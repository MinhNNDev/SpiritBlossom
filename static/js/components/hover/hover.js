import PropTypes from 'prop-types'
import React, { useState } from 'react'

// mutable
export const actions = {}

const bindTo = target => {
  const { setRect } = actions

  const { height, left, top } = target.getBoundingClientRect()

  setRect({
    height,
    left,
    top,
  })
}

export const hover = (title, description, target) => {
  const { setTitle, setDescription } = actions

  if (!setTitle) {
      console.log('no set title')
    return
  }

  if (!title) {
    console.log('no title')
    return void setTitle(null)
  }

  setTitle(title)
  setDescription(description)

  bindTo(target)
}

export const HoverTooltip = () => {
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ rect, setRect ] = useState(null)

  actions.setTitle = setTitle
  actions.setDescription = setDescription
  actions.setRect = setRect

  console.log('title', title, 'rect', rect)

  if (!title || !rect) {
    return null
  }

  return (
    <div
      className='hover-tooltip'
      style={ rect }
    >
      <div className='wrapper'>
        <div className='title'>{ title }</div>
        { description && <div className='description'>{ description }</div> }
      </div>
    </div>
  )
}

const HoverCard = ({ title, description, children }) => {
  const handleMouseEnter = ({ target }) => {
    console.log('mouse enter', title, target)
    hover(title, description, target)
  }
  const handleMouseOut = () => {
    console.log('mouse out')
    hover(null)
  }

  return (
    <div
      className='hover-card'
      onMouseOver={ handleMouseEnter }
      onMouseOut={ handleMouseOut }
    >
      { children }
    </div>
  )
}

HoverCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node,
}

export default HoverCard
