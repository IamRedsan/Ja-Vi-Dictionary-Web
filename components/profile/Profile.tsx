import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { formatDate } from '@/utils/date-format';
import { FaLock } from 'react-icons/fa6';
import { FaPen } from 'react-icons/fa';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { IoKeySharp } from 'react-icons/io5';
import { useToast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';
import { authClient } from '@/client/axiosClient';
import { useAuth } from '@/context/auth-context';

interface ProfileProps {
  email: string;
  fullname: string;
  avatar: string;
  verified: boolean;
  createdAt: string;
  className?: string;
  isUserDetail?: boolean;
}

const Profile: React.FC<ProfileProps> = ({
  avatar = 'https://i.pinimg.com/736x/d9/15/81/d91581de263f6d3ac050e5e30f44ae2e.jpg',
  email = 'voviettruong141003@gmail.com',
  fullname = 'Võ Viết Trường',
  verified,
  createdAt = '2024-12-22T15:35:19.356Z',
  className,
  isUserDetail,
}) => {
  const [avatarValue, setAvatarValue] = useState<string>(avatar);
  const [fullnameValue, setFullnameValue] = useState<string>(fullname);
  const [values, setValues] = useState({
    password: '',
    newPassword: '',
    reNewPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { updateUser } = useAuth();

  const onChangeText = (key: keyof typeof values, value: string) => {
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const handleUpdateInfo = async () => {
    setLoading(true);
    try {
      const response = await authClient.put('/users/profile', {
        fullname: fullnameValue,
      });
      const { data: user } = response.data;
      updateUser(user);
      setFullnameValue(user.fullname);
      toast({
        title: 'Chúc mừng',
        description: 'Đã cập nhật thông tin thành công',
      });
    } catch (err) {
      const e = err as AxiosError;
      const message = (e.response?.data as any)?.message;

      toast({
        title: 'Đổi mật khẩu thất bại',
        description: message ?? 'Lỗi không xác định.',
      });
    }

    setLoading(false);
  };

  const handleUpdateAvatar = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await authClient.put('/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { data: user } = response.data;
      console.log(user);
      updateUser(user);
      setAvatarValue(user.avatar);
      toast({
        title: 'Chúc mừng',
        description: 'Đã cập nhật avatar thành công',
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

  const pickImage = async () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.click();

      input.onchange = async () => {
        if (input.files && input.files[0]) {
          const file = input.files[0];

          toast({
            title: 'Vui lòng đợi',
            description: 'Đang tải ảnh lên',
          });

          await handleUpdateAvatar(file);
        }
      };
    } catch (error) {
      console.error('Error picking image:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể chọn ảnh. Vui lòng thử lại.',
      });
    }
  };

  const handleChangePassword = async () => {
    if (values.password === '' || values.newPassword === '') {
      return;
    }

    if (values.newPassword !== values.reNewPassword) {
      toast({
        title: 'Mật khẩu không khớp',
        description: 'Vui lòng nhập lại',
      });
      return;
    }

    setLoading(true);

    try {
      await authClient.put('/users/profile', {
        password: values.newPassword,
        oldPassword: values.password,
      });
      toast({
        title: 'Chúc mừng',
        description: 'Bạn thay đổi mật khẩu thành công',
      });
      setValues({
        password: '',
        newPassword: '',
        reNewPassword: '',
      });
    } catch (err) {
      const e = err as AxiosError;
      const message = (e.response?.data as any)?.message;

      toast({
        title: 'Đổi mật khẩu thất bại',
        description: message ?? 'Lỗi không xác định.',
      });
    }

    setLoading(false);
  };

  return (
    <Card
      className={cn(
        'flex h-fit w-full rounded-lg overflow-hidden mx-auto',
        className
      )}>
      <div className='flex-[7] bg-background py-2 px-6'>
        <div className='text-sm my-2'>Email</div>
        <Input className=' my-2' disabled value={email} />
        {!verified && (
          <div className='rounded  p-2 my-4'>
            <div className='flex flex-row gap-2 items-center'>
              <FaLock />
              <span>Chưa xác thực</span>
            </div>
            <div className='text-sm'>Tài khoản này chưa xác thực</div>
          </div>
        )}
        <div className='text-sm my-2'>Tên</div>
        <Input
          className=' my-2'
          disabled={isUserDetail || loading}
          value={fullnameValue}
          onChange={(e) => setFullnameValue(e.target.value)}
        />
        <div className='text-sm my-2'>Ngày tham gia</div>
        <Input className=' my-2' disabled value={formatDate(createdAt)} />

        {!isUserDetail && (
          <>
            <div className='flex flex-row-reverse mt-4 mb-2 '>
              <Button onClick={handleUpdateInfo}>Cập nhật</Button>
            </div>
            <Accordion type='single' collapsible>
              <AccordionItem value='item-1' className='border-none'>
                <AccordionTrigger>
                  <div className='flex flex-row gap-2 items-center'>
                    <IoKeySharp size={20} />
                    <span>Thay đổi mật khẩu?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className='p-1'>
                    <Label className='text-sm my-2'>Mật khẩu cũ</Label>
                    <Input
                      type='password'
                      className=' my-2'
                      value={values.password}
                      disabled={loading}
                      onChange={(e) => onChangeText('password', e.target.value)}
                    />
                    <div className='text-sm my-2'>Mật khẩu mới</div>
                    <Input
                      type='password'
                      className=' my-2'
                      value={values.newPassword}
                      disabled={loading}
                      onChange={(e) =>
                        onChangeText('newPassword', e.target.value)
                      }
                    />
                    <div className='text-sm my-2'>Xác nhận mật khẩu</div>
                    <Input
                      type='password'
                      className=' my-2'
                      value={values.reNewPassword}
                      disabled={loading}
                      onChange={(e) =>
                        onChangeText('reNewPassword', e.target.value)
                      }
                    />
                    <div className='flex flex-row-reverse mt-4 mb-2 '>
                      <Button onClick={handleChangePassword}>
                        Đổi mật khẩu
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        )}
      </div>
      <div className='flex-[3] dark:bg-[#101012] bg-gray-100 flex justify-center'>
        <div className='relative group'>
          <Avatar className='size-[100px] mt-10 relative overflow-hidden'>
            <AvatarImage src={avatarValue} alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
            {!isUserDetail && (
              <div
                className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full'
                onClick={pickImage}>
                <div className='flex flex-row gap-1 items-center'>
                  <FaPen className='text-white' />
                  <span className='text-white text-sm font-medium'>
                    Chỉnh sửa
                  </span>
                </div>
              </div>
            )}
          </Avatar>
        </div>
      </div>
    </Card>
  );
};

export default Profile;
