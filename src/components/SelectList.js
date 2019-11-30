import React from 'react';


export const SelectList = (props) => {
	const _renderOptions = () => {
		return props.itemsList.map(item => {
			return(
				<option
					key={item.id}
					value={item.id}
				>
					{item.name}
				</option>
			)
		})
	} 
// Los siguientes dos eventos y el onchange controlan el tamaño de la lista
	const _handleMouseDown = (e) => {
		const selectLength = 25;

		if(e.target.options !== undefined){
			if(e.target.options.length > selectLength){
				e.target.size = selectLength;
			}
		}
	}

	const _handleBlur = (e) => {
		e.target.size = 0
	}

// TODO: el array de valores cuando tiene multiple=true
// propTypes y defaultProps
// Dejar comentario del valor que hay que poner en los eventos para controlar el tamaño de la lista
// manejar eventos para el tamaño de la lista con defaultProps
	return(
		<>
		{
			props.itemsList === undefined
			? 	null
			: 	<select
					className={props.className}
					value={props.selected}
					size={props.size}
					multiple={props.multiple}
					onChange={props.onChange}
					onBlur={_handleBlur}
					onMouseDown={_handleMouseDown}
				>
				{
					props.initialValue === undefined
					? null
					: <option value=''>{props.initialValue}</option>
				}
					{_renderOptions()}
				</select>
		}
		</>
	)
}