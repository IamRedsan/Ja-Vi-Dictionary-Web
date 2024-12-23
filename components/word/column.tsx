/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWord } from '@/context/word-context';

export type WordRow = {
  _id: string;
  text: string;
  hiragana: string;
  meaning: string;
};

export const columns: ColumnDef<WordRow>[] = [
  {
    accessorKey: 'text',
    header: 'Từ vựng',
  },
  {
    accessorKey: 'hiragana',
    header: 'Hiragana',
  },
  {
    accessorKey: 'meaning',
    header: 'Ý nghĩa',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { setWordById, setDialogAction, setIsOpenDialog } = useWord();

      const word = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Mở menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              onClick={() => {
                setDialogAction('view');
                setWordById(word._id);
                setIsOpenDialog(true);
              }}>
              Chi tiết
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setDialogAction('update');
                setWordById(word._id);
                setIsOpenDialog(true);
              }}>
              Cập nhật
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setDialogAction('delete');
                setWordById(word._id);
                setIsOpenDialog(true);
              }}>
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
