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
import { KanjiDialog } from './kanji-dialog';
import { useState } from 'react';

export type Kanji = {
  text: string;
  phonetic: string;
  meaning: string;
  jlpt_level: string;
};

export const columns: ColumnDef<Kanji>[] = [
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
    cell: () => {
      const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState(false);
      const [isOpenViewDialog, setIsOpenViewDialog] = useState(false);

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
                  setIsOpenViewDialog(true);
                }}>
                Chi tiết
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setIsOpenUpdateDialog(true);
                }}>
                Cập nhật
              </DropdownMenuItem>
              <DropdownMenuItem>Xóa</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <KanjiDialog
            action='update'
            isOpen={isOpenUpdateDialog}
            setIsOpen={setIsOpenUpdateDialog}
            title='Cập nhật Hán tự'
            description='Điền thông tin Hán tự. Vui lòng bấm lưu xong khi điền xong.'
          />
          <KanjiDialog
            action='view'
            isOpen={isOpenViewDialog}
            setIsOpen={setIsOpenViewDialog}
            title='Hán tự'
            description=''
          />
        </>
      );
    },
  },
];
