import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

interface IProps extends PropsWithChildren {
  className?: string;
}

const H4 = ({ children, className }: IProps) => {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
    >
      {children}
    </h1>
  );
};

export default H4;
