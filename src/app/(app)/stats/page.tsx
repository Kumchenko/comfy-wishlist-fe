'use client';

import { useWishes } from '@/api/queries/WishQueries';
import H1 from '@/components/typography/H1';
import P from '@/components/typography/P';
import Loader from '@/components/ui/loader';

import { LineChart } from './components/LineChart/LineChart';

export default function Page() {
  const { data, isError } = useWishes();

  const getContent = () => {
    if (data) {
      return (
        <div className="mt-8 mx-auto w-4/5 xl:w-2/3 h-[22rem]">
          <LineChart wishes={data} />
        </div>
      );
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
      <H1>Статистика</H1>
      <P>Кількість додавань бажань по дням</P>
      {getContent()}
    </>
  );
}
