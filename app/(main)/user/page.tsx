'use client';
import Link from 'next/link';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { DataTable } from '@/components/user/data-table';
import { ActionCell, IUser } from '@/components/user/user-rows';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { authClient } from '@/client/axiosClient';
import { ColumnDef } from '@tanstack/react-table';
import { FaLockOpen, FaLock } from 'react-icons/fa';
export default function UserPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IUser[]>([]);

  useEffect(() => {
    const handleGetListUser = async () => {
      try {
        setLoading(true);
        const response = await authClient.get('/users');
        setData(response.data.data.data);
        setLoading(false);
      } catch (err) {
        const e = err as AxiosError;
        const message = (e.response?.data as any)?.message;
        toast({
          title: 'Lấy thông tin người dùng thất bại',
          description: message ?? 'Lỗi không xác định.',
        });
      }
    };
    handleGetListUser();
  }, [toast]);
  const columns: ColumnDef<IUser>[] = [
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
      cell: ({ row }) => <ActionCell user={row.original} setData={setData} />,
    },
  ];

  return (
    <ContentLayout title='Danh sách người dùng'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/'>Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Người dùng</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='container mx-auto py-10'>
        {loading ? (
          <Skeleton className='w-full h-[600px]' />
        ) : (
          <DataTable columns={columns} data={data} setData={setData} />
        )}
      </div>
    </ContentLayout>
  );
}
