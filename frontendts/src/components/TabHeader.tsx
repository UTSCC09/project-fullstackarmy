import React from 'react'

interface Props {
  title: string,
  imgPath: string,
}

const TabHeader: React.FC<Props> = ({title, imgPath}) => {
  return (
    <div className="tab-header"><div className="tab-icon" style={{backgroundImage: `url(${imgPath})`}}></div>{title}</div>
  )
}

export default TabHeader


