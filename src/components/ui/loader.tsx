import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};
const Loader = ({ className }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <Loader2Icon className={cn('w-5 h-5 animate-spin', className)} />
    </div>
  );
};

export default Loader;
