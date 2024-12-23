import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Dialog, DialogContent } from '@/components/ui/dialog';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Composition, useComposition } from '@/context/composition-context';
import { Card } from '../ui/card';
import { CompositionDialog } from './composition-dialog';

export const ActionCell = ({ composition }: { composition: Composition }) => {
  const [isDialogOpenEdit, setIsDialogOpenEdit] = useState(false);
  const [isDialogOpenDelete, setIsDialogOpenDelete] = useState(false);
  const { deleteComposition } = useComposition();
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
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setIsDialogOpenEdit(true)}>
            Chỉnh sửa
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpenDelete(true)}>
            Xoá
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CompositionDialog
        action='update'
        composition={composition}
        isOpen={isDialogOpenEdit}
        setIsOpen={setIsDialogOpenEdit}
        description='Chỉnh sửa bộ thủ'
        title='Bộ thẻ'
      />

      <AlertDialog
        open={isDialogOpenDelete}
        onOpenChange={setIsDialogOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn không?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có muốn xoá bộ thủ {composition.raw_text} không ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpenDelete(false)}>
              Huỷ
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteComposition(composition._id);
              }}>
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
