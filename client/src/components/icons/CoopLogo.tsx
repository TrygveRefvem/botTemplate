import { SVGProps } from 'react';

export function CoopLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="12" fill="currentColor"/>
      <circle cx="36" cy="12" r="12" fill="currentColor"/>
    </svg>
  );
}
