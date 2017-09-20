import React from 'react';

import Item from './Item';
import Wrapper from './Wapper';

function ListItem(props) {
  return (
    <Wrapper>
      <Item>
        {props.item}
      </Item>
    </Wrapper>
  );
}

ListItem.propTypes = {
  item: React.PropTypes.any,
};

export default ListItem;
