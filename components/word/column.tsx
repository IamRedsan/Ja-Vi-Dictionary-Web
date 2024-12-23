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
import { WordDialog } from './word-dialog';
import { useState } from 'react';

export type Word = {
  text: string;
  hiragana: string;
  meaning: string;
};

export const columns: ColumnDef<Word>[] = [
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
          <WordDialog
            action='update'
            isOpen={isOpenUpdateDialog}
            setIsOpen={setIsOpenUpdateDialog}
            title='Cập nhật tự vựng'
            description='Điền thông tin từ vựng. Vui lòng bấm lưu xong khi điền xong.'
          />
          <WordDialog
            action='view'
            isOpen={isOpenViewDialog}
            setIsOpen={setIsOpenViewDialog}
            title='Từ vựng'
            description=''
          />
        </>
      );
    },
  },
];
