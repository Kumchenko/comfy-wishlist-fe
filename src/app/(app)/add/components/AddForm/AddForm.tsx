'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { toast } from 'sonner';
import { z } from 'zod';

import { Api } from '@/api/Api';
import { useCreateWish } from '@/api/queries/WishQueries';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const schema = z.object({
  title: z
    .string()
    .min(5, 'Назва повинна бути мінімум 5 символів')
    .max(64, 'Назва повинна бути мінімум 64 символів'),
  url: z.string().includes('comfy.ua', {
    message: 'Посилання має бути саме на товар з магазину Comfy',
  }),
  price: z
    .string()
    .refine((arg) => !!parseFloat(arg), 'Значення має бути числом'),
});

type Values = z.infer<typeof schema>;

export const AddForm = () => {
  const { mutate: createWish } = useCreateWish();

  const [isParsing, setIsParsing] = useState(false);

  const form = useForm<Values>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      url: '',
    },
  });

  const { handleSubmit, getValues, setValue } = form;

  const onParse = async () => {
    try {
      setIsParsing(true);
      const url = getValues().url;
      const { price } = await Api.Wish.parsePrice(url);
      toast('Успіх', {
        description: `Ціна товару складає ${price}грн!`,
      });
      setValue('price', price.toString());
    } catch (e) {
      toast('Помилка', {
        description: 'Досягнуто ліміт розпізнавань або ціну не знайдено!',
      });
    } finally {
      setIsParsing(false);
    }
  };

  const onSubmit = ({ title, price, url }: Values) => {
    createWish({
      title,
      price: parseFloat(price),
      url,
      dateCreated: new Date().toISOString(),
    });
  };

  return (
    <Card className="max-w-96 mx-auto">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Створити новий Comfy Wish</CardTitle>
            <CardDescription>
              <span>Функція парсеру активна лише для веб-сайту</span>
              <span>{` `}</span>
              <Link className="underline" href="https://comfy.ua">
                comfy.ua
              </Link>
              <span>{` `}</span>
              <span>та має ліміт на запити</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Назва</FormLabel>
                  <FormControl>
                    <Input placeholder="Смарт-годинник" {...field} />
                  </FormControl>
                  <FormDescription>Назва вашого бажання</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://comfy.ua/" {...field} />
                  </FormControl>
                  <FormDescription>Посилання на бажаний товар</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ціна (грн)</FormLabel>
                  <FormControl>
                    <Input placeholder="1200.99" {...field} />
                  </FormControl>
                  <FormDescription>Ціна на товар</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => onParse()}
              disabled={isParsing}
            >
              Спарсити ціну
            </Button>
            <Button type="submit">Створити</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
