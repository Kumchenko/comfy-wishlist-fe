import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import { Api } from '../Api';
import { IWish, IWishCreate } from '../models/Wish';

const queryKeys = {
  all: ['wish'] as const,
  list: () => [...queryKeys.all, 'list'] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: string) => [...queryKeys.details(), id] as const,
};

export const useWishes = () =>
  useQuery({
    queryKey: queryKeys.list(),
    queryFn: Api.Wish.getAll,
  });

export const useCreateWish = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Api.Wish.createOne,
    onMutate: async (newWish: IWishCreate) => {
      let prevWishes: IWish[] | undefined;
      await queryClient.cancelQueries({ queryKey: queryKeys.list() });

      queryClient.setQueryData<IWish[]>(['wish'], (prev) => [
        ...(prev || []),
        {
          ...newWish,
          id: uuidv4(),
        },
      ]);

      return { prevWishes };
    },
    onError: (err, newWish, context) => {
      console.error(err);
      queryClient.setQueryData(queryKeys.list(), context?.prevWishes);
      toast('Помилка', {
        description: 'Виникла помилка під час додавання бажання!',
      });
    },
    onSuccess: () =>
      toast('Успіх', {
        description: 'Бажання успішно додано!',
      }),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.list() }),
  });
};

export const useDeleteWish = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Api.Wish.deleteById,
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
      toast('Помилка', {
        description: 'Виникла помилка під час видалення бажання!',
      });
    },
    onSuccess: () =>
      toast('Успіх', {
        description: 'Бажання видалено!',
      }),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.list() }),
  });
};
