import React, { useCallback, useRef } from 'react';

export default function BentoSpotlightCard({
  as: Component = 'div',
  accent = 'cyan',
  className = '',
  children,
  ...rest
}) {
  const cardRef = useRef(null);

  const handlePointerMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--bx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--by', `${e.clientY - rect.top}px`);
    el.style.setProperty('--b-opacity', '1');
  }, []);

  const handlePointerLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--b-opacity', '0');
  }, []);

  return (
    <Component
      ref={cardRef}
      data-accent={accent}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`bento-spotlight-card min-w-0 ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}

