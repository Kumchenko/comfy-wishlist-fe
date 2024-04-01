import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

interface IProps extends PropsWithChildren {
  className?: string;
}

const P = ({ children, className }: IProps) => {
  return (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>
      {children}
    </p>
  );
};

export default P;
