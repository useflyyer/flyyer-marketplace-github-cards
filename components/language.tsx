import React from 'react';

import colorsJSON from '../utils/colors.json';
const colors: Record<string, {color: string}> = colorsJSON as any;

/**
 * Github language color bar.
 */
export function Language({weight, name}: {weight: number; name?: string}) {
  const bg = name && colors[name] ? colors[name].color : "lightslategray";
  return <div style={{flex: weight, backgroundColor: bg}} />;
}
