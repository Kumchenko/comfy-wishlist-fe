import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { randomUUID } from 'crypto';

import { getObjectAsync } from '@/utils/getObjectAsync';

import { Api } from '../Api';
import { IWish, IWishCreate, MockedWishes } from '../models/Wish';

const queryKeys = {
  all: ['wish'] as const,
  list: () => [...queryKeys.all, 'list'] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: string) => [...queryKeys.details(), id] as const,
};

export const useWishes = () =>
  useQuery({
    queryKey: queryKeys.list(),
    queryFn: () => getObjectAsync(MockedWishes),
  });

export const useCreateWish = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // mutationFn: Api.Wish.createOne,
    onMutate: async (newWish: IWishCreate) => {
      let prevWishes: IWish[] | undefined;
      await queryClient.cancelQueries({ queryKey: queryKeys.list() });

      queryClient.setQueryData<IWish[]>(['wish'], (prev) => [
        ...(prev || []),
        {
          ...newWish,
          id: randomUUID(),
          date: new Date().toISOString(),
        },
      ]);

      return { prevWishes };
    },
    onError: (err, newWish, context) => {
      queryClient.setQueryData(queryKeys.list(), context?.prevWishes);
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: queryKeys.list() });
    // },
  });
};

export const useDeleteWish = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // mutationFn: Api.Wish.deleteById,
    onMutate: async (id: string) => {
      let prevWishes: IWish[] | undefined;
      await queryClient.cancelQueries({ queryKey: queryKeys.list() });

      queryClient.setQueryData<IWish[]>(
        ['wish'],
        (prev) => prev?.filter((el) => el.id !== id) ?? []
      );

      return { prevWishes };
    },
    onError: (err, newWish, context) => {
      queryClient.setQueryData(queryKeys.list(), context?.prevWishes);
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: queryKeys.list() });
    // },
  });
};
