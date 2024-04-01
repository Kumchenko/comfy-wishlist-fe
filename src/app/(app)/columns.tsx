import { ColumnDef } from '@tanstack/react-table';

import { IWish } from '@/api/models/Wish';

export const columns: ColumnDef<IWish>[] = [
  {
    accessorKey: 'title',
    // cell: ({ row }) => {
    //   return (
    //     <div className="flex space-x-2">
    //       <span className="max-w-[500px] truncate font-medium">
    //         {row.original.email}
    //       </span>
    //     </div>
    //   );
    // },
  },
  {
    accessorKey: 'url',
    // cell: ({ row }) => {
    //   return (
    //     <div className="flex space-x-2">
    //       <span className="max-w-[500px] truncate font-medium">
    //         {row.original.email}
    //       </span>
    //     </div>
    //   );
    // },
  },
  {
    accessorKey: 'price',
    // cell: ({ row }) => {
    //   return (
    //     <div className="flex space-x-2">
    //       <span className="max-w-[500px] truncate font-medium">
    //         {row.original.email}
    //       </span>
    //     </div>
    //   );
    // },
  },
];
