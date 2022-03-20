import React from 'react'

interface Props {
  text: string,
  color: string,
}

const Button: React.FC<Props> = ({text, color}) => {
  return (
    <button className="btn" style={{backgroundColor: color}}>{text}</button>
  )
}

export default Button


