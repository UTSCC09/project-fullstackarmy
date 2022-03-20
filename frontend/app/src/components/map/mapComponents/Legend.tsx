import React from 'react'

interface Props {
  map: google.maps.Map | null;
  LegendItems: [String, String][];
}

const Legend: React.FC<Props> = ({map, LegendItems}) => {
  
  const legend = document.createElement('div');
  
  legend.style.marginLeft = '7px';
  legend.style.backgroundColor = 'white';
  legend.style.opacity = '0.7';
  legend.style.cursor = 'default';
  legend.style.borderRadius = '2px';
  legend.style.boxShadow = 'rgb(0 0 0 / 30%) 0px 1px 4px -1px';
  legend.style.userSelect = 'none';

  LegendItems.forEach(rangeToColor => {
    let legendItem = document.createElement('div');

    legendItem.style.display = 'flex';

    legendItem.innerHTML= `
      <div
        style="background-color:${rangeToColor[0]}; height: 20px; width: 20px; 
        border-radius: 3px; margin: 5px 10px 5px 13px;"
      ></div>
      <div style="display: grid;place-items: center;
        margin: 5px 13px 5px 10px;font-size: 14px;">
        ${rangeToColor[1]}
      </div>
    `
    legend.append(legendItem);
  })

  legend.addEventListener('mouseenter', (e) => {
    legend.style.opacity = '1';
  })

  legend.addEventListener('mouseleave', (e) => {
    legend.style.opacity = '0.7';
  })

  if(map) {
    const leftBottomControls = map.controls[google.maps.ControlPosition.LEFT_BOTTOM];
    leftBottomControls.clear();
    leftBottomControls.push(legend); 
  }

  return null;
}

export default Legend