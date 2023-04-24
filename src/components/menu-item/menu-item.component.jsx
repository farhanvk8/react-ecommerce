import React from 'react';
import './menu-item.styles.scss';
import {withRouter} from 'react-router-dom';
const MenuItem =    ({ title , imageUrl, history, linkUrl, match}) => (
<div
 className='menu-item'>
 <div 
     className='bgImage'
     style ={{ backgroundImage: `url(${ imageUrl })`   
}}
onClick ={() => history.push(`${match.url}${linkUrl}`)}
 />
<div className='content'>
<h1 className='title'>{title.toUpperCase()}</h1>
<span className='subtitle'>Shop Now</span>
</div> 
</div>
);
export default withRouter(MenuItem);