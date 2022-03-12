import React from 'react'

interface Props {
  imgPath: string;
}

const Icon: React.FC<Props> = ({imgPath}) => {
  return (
    <div className="icon" style={{backgroundImage: `url(${imgPath})`}}></div>
  )
}

export default Icon


