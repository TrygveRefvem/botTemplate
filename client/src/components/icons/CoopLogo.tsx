import { SVGProps } from 'react';

export function CoopLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="40" height="40" viewBox="0 0 84 43" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="21" cy="21" r="21" fill="currentColor"/>
      <circle cx="63" cy="21" r="21" fill="currentColor"/>
    </svg>
  );
}
