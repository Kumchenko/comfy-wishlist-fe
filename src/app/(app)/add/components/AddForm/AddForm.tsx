'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { z } from 'zod';

import {
  useCreateWish,
  useParseWishByHtml,
  useParseWishByUrl,
} from '@/api/queries/WishQueries';
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
  file: z.instanceof(File).nullable(),
});

type Values = z.infer<typeof schema>;

export const AddForm = () => {
  const { mutate: createWish } = useCreateWish();
  const {
    mutate: parseByUrl,
    isPending: isParsingByUrl,
    isError,
    reset: resetParsingStatus,
  } = useParseWishByUrl();
  const { mutate: parseByHtml, isPending: isParsingByHtml } =
    useParseWishByHtml();

  const form = useForm<Values>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      url: '',
      price: '',
      file: null,
    },
  });

  const { handleSubmit, getValues, setValue, watch, reset } = form;

  const isFileUploaded = !!watch('file');

  const onUrlParse = async () => {
    const url = getValues().url;

    parseByUrl(url, {
      onSuccess: ({ name, price }) => {
        setValue('title', name);
        setValue('price', price.toString());
      },
    });
  };

  const onHtmlParse = async () => {
    const file = getValues().file;

    file &&
      parseByHtml(file, {
        onSuccess: ({ name, price }) => {
          setValue('title', name);
          setValue('price', price.toString());
        },
      });
  };

  const onSubmit = ({ title, price, url }: Values) => {
    createWish(
      {
        title,
        price: parseFloat(price),
        url,
        dateCreated: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          resetParsingStatus();
          reset();
        },
      }
    );
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

            {isError && (
              <FormField
                control={form.control}
                name="file"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel>HTML файл</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="text/html,.html,.htm"
                        {...field}
                        onChange={(e) => onChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormDescription>
                      Збережена HTML-сторінка Comfy з товаром
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex gap-4 justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={onUrlParse}
                disabled={isParsingByUrl}
              >
                {isError ? 'Спробувати ще раз' : 'Спарсити URL'}
              </Button>
              {isError && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onHtmlParse}
                  disabled={isParsingByHtml || !isFileUploaded}
                >
                  Спарсити HTML
                </Button>
              )}
            </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mt-8">
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
          <CardFooter className="flex justify-center">
            <Button type="submit">Додати бажання до списку</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
