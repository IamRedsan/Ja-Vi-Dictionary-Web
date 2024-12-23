import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { formatDate } from '@/utils/date-format';
import { FaLock } from 'react-icons/fa6';
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

interface ProfileProps {
  email: string;
  fullname: string;
  avatar: string;
  isVerify: boolean;
  createdAt: string;
  className?: string;
  isUserDetail?: boolean;
}

const Profile: React.FC<ProfileProps> = ({
  avatar = 'https://i.pinimg.com/736x/d9/15/81/d91581de263f6d3ac050e5e30f44ae2e.jpg',
  email = 'voviettruong141003@gmail.com',
  fullname = 'Võ Viết Trường',
  isVerify = false,
  createdAt = '2024-12-22T15:35:19.356Z',
  className,
  isUserDetail,
}) => {
  return (
    <Card
      className={cn(
        'flex h-fit w-full rounded-lg overflow-hidden mx-auto',
        className
      )}>
      <div className='flex-[7] bg-background py-2 px-6'>
        <div className='text-sm my-2'>Email</div>
        <Input className=' my-2' disabled={isUserDetail} value={email} />
        {!isVerify && (
          <div className='rounded  p-2 my-4'>
            <div className='flex flex-row gap-2 items-center'>
              <FaLock />
              <span>Chưa xác thực</span>
            </div>
            <div className='text-sm'>Tài khoản này chưa xác thực</div>
          </div>
        )}
        <div className='text-sm my-2'>Tên</div>
        <Input className=' my-2' disabled={isUserDetail} value={fullname} />
        <div className='text-sm my-2'>Ngày tham gia</div>
        <Input className=' my-2' disabled value={formatDate(createdAt)} />

        {!isUserDetail && (
          <>
            <div className='flex flex-row-reverse mt-4 mb-2 '>
              <Button>Cập nhật</Button>
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
                    <Input type='password' className=' my-2' value={fullname} />
                    <div className='text-sm my-2'>Mật khẩu mới</div>
                    <Input type='password' className=' my-2' value={fullname} />
                    <div className='text-sm my-2'>Xác nhận mật khẩu</div>
                    <Input type='password' className=' my-2' value={fullname} />
                    <div className='flex flex-row-reverse mt-4 mb-2 '>
                      <Button>Đổi mật khẩu</Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        )}
      </div>
      <div className='flex-[3] dark:bg-[#101012] bg-gray-100 flex justify-center'>
        <Avatar className='size-[100px] mt-10'>
          <AvatarImage src={avatar} alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </Card>
  );
};

export default Profile;
