import React, { MouseEventHandler } from 'react'
import { IconType } from 'react-icons'
import { Link } from 'react-router-dom'

interface Props {
  title: string,
  icon: IconType,
  selected: boolean,
  path: string,
}

const TabHeader: React.FC<Props> = ({title, icon, selected, path}) => {
  return (
    <Link to={path} style={{textDecoration: 'none'}}>
      <div className={`tab-header ${selected ? 'tab-header-selected' : ''}`} >
        <div className="tab-icon">{React.createElement(icon)}</div>
        {title}
      </div>
    </Link>
  )
}

export default TabHeader


