import React from 'react'
import { IconType } from 'react-icons'

interface Props {
  icon: IconType;
}

const Icon: React.FC<Props> = ({icon}) => {
  return (
    <div className="icon">{React.createElement(icon)}</div>
  )
}

export default Icon


