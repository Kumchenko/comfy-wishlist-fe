import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

interface IProps extends PropsWithChildren {
  className?: string;
}

const H3 = ({ children, className }: IProps) => {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
    >
      {children}
    </h3>
  );
};

export default H3;
