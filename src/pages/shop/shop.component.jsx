import React from 'react';
import SHOP_DATA from './shop.data'
import CollectionPreview from '../../components/preview-collection/preview-collection.component';
function ShopPage() {

const itemData = SHOP_DATA;
 return (
<div className='shop-page'> 
    {itemData.map(({id, ...otherProps}) => (<CollectionPreview key={id} {...otherProps}  />) )}
</div>
 )

}
export default ShopPage;