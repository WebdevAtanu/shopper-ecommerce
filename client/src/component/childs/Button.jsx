import React from 'react'

function Button(props) {
	return (
		<button className={`${props.class} py-1 px-4`}>{props.text}</button>
	)
}

export default Button