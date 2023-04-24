import React from 'react';

import './button.style.scss';

export default function Button({ children, isGoogleSignIn, inverted, ...otherProps}) {
    return (<button className={`${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in': '' } custom-button`} {...otherProps}>
    {children}
    </button>
    );
}