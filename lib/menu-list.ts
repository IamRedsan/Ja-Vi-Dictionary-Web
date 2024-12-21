import {
  Users,
  Settings,
  LayoutGrid,
  LucideIcon,
  Library,
  MessageSquareMore,
} from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          icon: LayoutGrid,
        },
      ],
    },
    {
      groupLabel: 'Quản lý',
      menus: [
        {
          href: '#',
          label: 'Từ điển',
          icon: Library,
          submenus: [
            {
              href: '/word',
              label: 'Từ vựng',
            },
            {
              href: '/kanji',
              label: 'Hán tự',
            },
          ],
        },
        {
          href: '/user',
          label: 'Người dùng',
          icon: Users,
        },
        {
          href: '/comment',
          label: 'Bình luận',
          icon: MessageSquareMore,
        },
      ],
    },
    {
      groupLabel: 'Cài đặt',
      menus: [
        {
          href: '/profile',
          label: 'Tài khoản',
          icon: Settings,
        },
      ],
    },
  ];
}
