import { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUpIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
};

export const ColumnHeader = <TData, TValue>({
  title,
  column,
}: ColumnHeaderProps<TData, TValue>) => {
  const handleSorting = () =>
    column.toggleSorting(column.getIsSorted() === 'asc');

  return (
    <div className={'flex items-center space-x-1'}>
      <span>{title}</span>
      {column.getCanSort() && (
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-1 print:hidden"
          onClick={handleSorting}
        >
          {column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="h-4 w-4" />
          ) : (
            <ArrowDown
              className={cn('h-4 w-4', {
                ['opacity-35']: !column.getIsSorted(),
              })}
            />
          )}
        </Button>
      )}
    </div>
  );
};
