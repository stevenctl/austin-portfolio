import React from 'react';

const OverlayItem = ({item}) => {
  const styles = {position: 'absolute'};
  if (item.x) {
    styles.left = item.x;
  }
  if (item.y) {
    styles.top = item.y;
  }

  return <div style={styles}>{item.content}</div>;
};

const Overlay = ({items, children}) => (
  <div style={{position: 'relative', textAlign: 'center'}}>
    {children}
    {items.map((item, i) => (
      <OverlayItem key={`overlay-item-${i}`} item={item} />
    ))}
  </div>
);

export default Overlay;
