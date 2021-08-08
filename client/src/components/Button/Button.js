import React from 'react'
import propTypes from 'prop-types'


export default function Button(props) {
    const className  = ["btn"]

    if(props.isPrimary){
        className.push("btn-primary")
    }
    if(props.isSmall){
        className.push("btn-sm")
    }
    if(props.isLarge){
        className.push("btn-lg")
    }
    return (
        <button className={className.join(" ")}>
            {props.children}
        </button>
    )
}

Button.propTypes = {
    isPrimary: propTypes.bool,
    isSmall: propTypes.bool,
    isLarge: propTypes.bool,
    
}
