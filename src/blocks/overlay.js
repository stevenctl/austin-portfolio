import React from 'react';

const overlayStyle = {position: 'absolute', top: 0, left: 0};

const OverlayItemWrapper = ({item}) => {
  return <div style={overlayStyle}>{item}</div>;
};

/**
 * Usage:
 * <Overlay>
 *     <Child on top/>
 *     <Another child on top, independent over other childern/>
 *     <The last child gets overlaid upon/>
 */
const Overlay = ({children}) => {
  if (children.length < 1) {
    console.error('Overlay should have at least 1 child');
    return;
  }
  const items = children.slice(0, children.length - 1);
  const overlaidItem = children[children.length - 1];
  return (
    <div style={{position: 'relative', textAlign: 'center'}}>
      {overlaidItem}
      {items.map((item, i) => (
        <OverlayItemWrapper key={`overlay-item-${i}`} item={item} />
      ))}
    </div>
  );
};

export default Overlay;
