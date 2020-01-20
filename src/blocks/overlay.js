import React from 'react';

const OverlayItem = ({item}) => {
  const position = item.position || {};
  const styles = {position: 'absolute', ...position};
  return <div style={styles}>{item.content}</div>;
};

// TODO(slandow) support theme styles and responsive values
const Overlay = ({items, children}) => (
  <div style={{position: 'relative', textAlign: 'center'}}>
    {children}
    {items.map((item, i) => (
      <OverlayItem key={`overlay-item-${i}`} item={item} />
    ))}
  </div>
);

export default Overlay;
