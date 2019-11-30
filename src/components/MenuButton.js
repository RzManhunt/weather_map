import React from 'react';

export const MenuButton = (props) => {
	const style = {
		width: props.size,
		height: props.size
	}

	return(
		<div
			className={`menu-button ${props.isOpen ? 'open' : 'close'}`}
			style={style}
			onClick={props.onClick}
		>
			<div className="circle-bar top"></div>
			<div className="circle-bar center"></div>
			<div className="circle-bar bottom"></div>
		</div>
	)
}