import PropTypes from 'prop-types'
import React, { useRef, useState, useEffect } from 'react'

import './scrollable.sass'


const Scrollable = ({ children }) => {
  const ref = useRef()
  const [ y, setY ] = useState(0)
  const [ height, setHeight ] = useState(0)

  useEffect(() => {
    const { current } = ref

    const handleScroll = () => {
      const { offsetHeight, scrollHeight } = current
      const scrollMax = scrollHeight - offsetHeight
      // thumb height
      const height = (offsetHeight ** 2) / scrollHeight
      const maxY = offsetHeight - height
      const scrollToY = maxY / scrollMax || 0

      setHeight(height)
      setY(current.scrollTop * scrollToY)
    }

    handleScroll()

    // not yet tested but passive events should make sense
    current.addEventListener('scroll', handleScroll, { passive: true })

    return () => current.removeEventListener('scroll', handleScroll)
  }, [ ref, children ])

  return (
    <div className='scrollable'>
      <div ref={ ref } className='content'>{ children }</div>
      <div className='scrollbar'>
        <div
          className='thumb'
          style={ {
            height: `${ height }px`,
            transform: `translateY(${ y }px)`,
          } }
        />
      </div>
    </div>
  )
}

Scrollable.propTypes = {
  children: PropTypes.node,
}

export default Scrollable
