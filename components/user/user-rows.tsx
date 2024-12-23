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
import Profile from '../profile/Profile';
import { authClient } from '@/client/axiosClient';
import { useToast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';

export interface IUser {
  _id: string;
  email: string;
  username: string;
  fullname: string;
  avatar: string;
  role: 'user' | 'admin';
  isBanned: boolean;
  createdAt: string;
  verified: boolean;
}

export const ActionCell = ({
  user,
  setData,
}: {
  user: IUser;
  setData: React.Dispatch<React.SetStateAction<IUser[]>>;
}) => {
  const [isDialogOpenDetail, setIsDialogOpenDetail] = useState(false);
  const [isDialogOpenBanned, setIsDialogOpenBanned] = useState(false);
  const { toast } = useToast();
  const handleBann = async () => {
    try {
      await authClient.put(`/users/ban/${user._id}`);
      setData((prevData) =>
        prevData.map((u) =>
          u._id === user._id ? { ...u, isBanned: !u.isBanned } : u
        )
      );
      toast({
        title: 'Chúc mừng',
        description: `Bạn đã ${user.isBanned ? 'mở cấm' : 'cấm'} ${
          user.fullname
        } thành công`,
      });
    } catch (err) {
      const e = err as AxiosError;
      const message = (e.response?.data as any)?.message;
      toast({
        title: 'Đổi mật khẩu thất bại',
        description: message ?? 'Lỗi không xác định.',
      });
    }
  };
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
            {`${user.isBanned ? 'Mở cấm' : 'Cấm'}`}
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
              Bạn có muốn {`${user.isBanned ? 'mở cấm' : 'cấm'}`}{' '}
              {user.fullname}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpenBanned(false)}>
              Huỷ
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleBann}>Xác nhận</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
