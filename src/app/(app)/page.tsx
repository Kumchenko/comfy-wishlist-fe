'use client';

import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useWishes } from '@/api/queries/WishQueries';
import H1 from '@/components/typography/H1';
import Loader from '@/components/ui/loader';
import { useWishColumns } from '@/components/WishTable/columns';
import { WishTable } from '@/components/WishTable/WishTable';

export default function Page() {
  const { data, isError } = useWishes();

  const columns = useWishColumns();

  const table = useReactTable({
    data: data ?? [],
    columns,
    initialState: {
      sorting: [{ desc: true, id: 'dateCreated' }],
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const getContent = () => {
    if (data) {
      return <WishTable table={table} columns={columns} />;
    }
    if (isError) {
      return 'Сталася помилка :(';
    }
    return (
      <div className="py-8">
        <Loader />
      </div>
    );
  };

  return (
    <>
      <H1 className="mb-6">Усі бажання</H1>
      {getContent()}
    </>
  );
}
