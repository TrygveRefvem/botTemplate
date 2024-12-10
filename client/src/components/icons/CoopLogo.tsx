import { SVGProps } from 'react';

export function CoopLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="10.5" cy="21" r="10.5" fill="currentColor"/>
      <circle cx="31.5" cy="21" r="10.5" fill="currentColor"/>
    </svg>
  );
}
