interface INavPoint {
  title: string;
  href: string;
}

export const NavPoints: INavPoint[] = [
  {
    title: 'Загальна',
    href: '/',
  },
  {
    title: 'Додати бажання (З парсером)',
    href: '/add',
  },
  {
    title: 'Статистика',
    href: '/stats',
  },
  {
    title: 'Експорт в Excel',
    href: '/api/export',
  },
];
