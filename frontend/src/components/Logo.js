export const Logo = () => {
  const onClick = (e) => {
      window.location.href = "/" 
  }  
    
  return (
    <div className="logo" onClick={onClick}>
          <span>COVID-19 | </span>
          <span>Vax Tracker</span>
    </div>
  )
}
