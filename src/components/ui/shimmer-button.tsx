import React, { type ComponentPropsWithoutRef, type CSSProperties } from 'react';

import { cn } from '@/lib/utils';

export interface ShimmerButtonProps extends ComponentPropsWithoutRef<'button'> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  href?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = '#FCF1D0',
      shimmerSize = '0.05em',
      shimmerDuration = '3s',
      borderRadius = '9999px',
      background = '#010736',
      className,
      href,
      children,
      ...props
    },
    ref,
  ) => {
    const sharedStyle = {
      '--spread': '90deg',
      '--shimmer-color': shimmerColor,
      '--radius': borderRadius,
      '--speed': shimmerDuration,
      '--cut': shimmerSize,
      '--bg': background,
    } as CSSProperties;

    const sharedClass = cn(
      'group relative z-0 inline-flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border border-[#010736]/15 px-6 py-3 text-sm font-semibold whitespace-nowrap text-[#FCF1D0] [background:var(--bg)]',
      'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px',
      className,
    );

    const inner = (
      <>
        <div
          className={cn('-z-30 blur-[2px]', '@container-[size] absolute inset-0 overflow-visible')}
        >
          <div className="animate-shimmer-slide absolute inset-0 aspect-[1] h-[100cqh] rounded-none [mask:none]">
            <div className="animate-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
          </div>
        </div>
        {children}
        <div
          className={cn(
            'absolute inset-0 size-full rounded-full px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_rgba(252,241,208,0.12)]',
            'transform-gpu transition-all duration-300 ease-in-out',
            'group-hover:shadow-[inset_0_-6px_10px_rgba(252,241,208,0.22)]',
            'group-active:shadow-[inset_0_-10px_10px_rgba(252,241,208,0.22)]',
          )}
        />
        <div
          className={cn(
            'absolute inset-(--cut) -z-20 [border-radius:var(--radius)] [background:var(--bg)]',
          )}
        />
      </>
    );

    if (href) {
      return (
        <a href={href} style={sharedStyle} className={sharedClass}>
          {inner}
        </a>
      );
    }

    return (
      <button style={sharedStyle} className={sharedClass} ref={ref} {...props}>
        {inner}
      </button>
    );
  },
);

ShimmerButton.displayName = 'ShimmerButton';
