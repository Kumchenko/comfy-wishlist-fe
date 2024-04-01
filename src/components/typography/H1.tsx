import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

interface IProps extends PropsWithChildren {
  className?: string;
}

const H1 = ({ children, className }: IProps) => {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl',
        className
      )}
    >
      {children}
    </h1>
  );
};

export default H1;
