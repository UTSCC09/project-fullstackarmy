export const TabHeader = ({title, imgPath}) => {
  return (
    <div className="tab-header"><div className="tab-icon" style={{backgroundImage: `url(${imgPath})`}}></div>{title}</div>
  )
}
