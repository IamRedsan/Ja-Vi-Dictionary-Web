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
import { ColumnDef } from '@tanstack/react-table';
import Profile from '../profile/Profile';
import { FaLockOpen, FaLock } from 'react-icons/fa';

export interface IUser {
  _id: string;
  email: string;
  username: string;
  fullname: string;
  avatar: string;
  role: 'user' | 'admin';
  isBanned: boolean;
  createdAt: string;
  isVerify: boolean;
}

const ActionCell = ({ user }: { user: IUser }) => {
  const [isDialogOpenDetail, setIsDialogOpenDetail] = useState(false);
  const [isDialogOpenBanned, setIsDialogOpenBanned] = useState(false);
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
          <DropdownMenuItem onClick={() => setIsDialogOpenDetail(true)}>
            Xem chi tiết
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpenBanned(true)}>
            Cấm
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpenDetail} onOpenChange={setIsDialogOpenDetail}>
        <DialogContent className='p-0  border-none w-[600px]'>
          <Profile {...user} isUserDetail />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDialogOpenBanned}
        onOpenChange={setIsDialogOpenBanned}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn không?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có muốn cấm {user.fullname}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpenBanned(false)}>
              Huỷ
            </AlertDialogCancel>
            <AlertDialogAction>Xác nhận</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: 'fullname',
    header: 'Họ và tên',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    header: 'Bị cấm',
    cell: ({ row }) => {
      const user = row.original;
      return user.isBanned ? (
        <div className='ml-2'>
          <FaLock />
        </div>
      ) : (
        <div className='ml-2'>
          <FaLockOpen />
        </div>
      );
    },
  },
  {
    header: 'Hành động',
    id: 'actions',
    cell: ({ row }) => <ActionCell user={row.original} />,
  },
];
