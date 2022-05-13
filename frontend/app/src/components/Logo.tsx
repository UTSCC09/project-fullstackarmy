import React from 'react';

interface Props {}

const Logo: React.FC<Props> = () => {
  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    window.location.href = '/';
  };

  return (
    <div className='logo' onClick={onClick}>
      <span>COVID-19 | </span>
      <span>Vax Tracker</span>
    </div>
  );
};

export default Logo;
