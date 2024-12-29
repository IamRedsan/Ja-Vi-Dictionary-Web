/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useKanji } from '@/context/kanji-context';

export type KanjiRow = {
  _id: string;
  text: string;
  phonetic: string;
  meaning: string;
  jlpt_level: string;
};

export const columns: ColumnDef<KanjiRow>[] = [
  {
    accessorKey: 'text',
    header: 'Hán tự',
  },
  {
    accessorKey: 'phonetic',
    header: 'Hán Việt',
  },
  {
    accessorKey: 'meaning',
    header: 'Ý nghĩa',
  },
  {
    accessorKey: 'jlpt_level',
    header: 'JLPT',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { setKanjiById, setDialogAction, setIsOpenDialog } = useKanji();
      const kanji = row.original;

      return (
        <>
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
                  setKanjiById(kanji._id);
                  setIsOpenDialog(true);
                }}>
                Chi tiết
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDialogAction('update');
                  setKanjiById(kanji._id);
                  setIsOpenDialog(true);
                }}>
                Cập nhật
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDialogAction('delete');
                  setKanjiById(kanji._id);
                  setIsOpenDialog(true);
                }}>
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
