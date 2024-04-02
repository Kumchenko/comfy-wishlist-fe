import { ColumnDef } from '@tanstack/react-table';
import { format, formatDistanceToNow } from 'date-fns';
import { Trash } from 'lucide-react';
import Link from 'next/link';

import { IWish } from '@/api/models/Wish';
import { useDeleteWish } from '@/api/queries/WishQueries';

import { Button } from '../ui/button';

import { ColumnHeader } from './components/ColumnHeader';

export const useWishColumns = (): ColumnDef<IWish>[] => {
  const { mutate: deleteWish } = useDeleteWish();

  return [
    {
      accessorKey: 'title',
      size: 200,
      header: ({ column }) => (
        <ColumnHeader column={column} title="Назва бажання" />
      ),
      cell: ({
        row: {
          original: { title },
        },
      }) => <span className="font-medium">{title}</span>,
    },
    {
      accessorKey: 'dateCreated',
      size: 300,
      header: ({ column }) => (
        <ColumnHeader column={column} title="Дата створення" />
      ),
      cell: ({
        row: {
          original: { dateCreated },
        },
      }) => {
        return `${format(dateCreated, 'do MMMM y  H:mm')} – ${formatDistanceToNow(dateCreated, { addSuffix: true })}`;
      },
    },
    {
      accessorKey: 'url',
      size: 200,
      header: ({ column }) => <ColumnHeader column={column} title="URL" />,
      cell: ({
        row: {
          original: { url },
        },
      }) => (
        <Link className="underline break-words" href={url}>
          {url}
        </Link>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'price',
      size: 120,
      header: ({ column }) => <ColumnHeader column={column} title="Ціна" />,
      cell: ({
        row: {
          original: { price },
        },
      }) => `${price} UAH`,
    },
    {
      accessorKey: 'deletion',
      size: 75,
      header: ({ column }) => <ColumnHeader column={column} title="Дія" />,
      cell: ({
        row: {
          original: { id },
        },
      }) => (
        <Button
          variant="ghost"
          className="mx-auto"
          onClick={() => deleteWish(id)}
        >
          <Trash className="w-5 h-5 text-red-600" />
        </Button>
      ),
      enableSorting: false,
    },
  ];
};
