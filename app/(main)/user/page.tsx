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
import { DataTable } from '@/components/table/data-table';
import { columns, IUser } from '@/components/table/user-rows';
const generateISODate = (): string => {
  return new Date().toISOString();
};
export default function UserPage() {
  const data: IUser[] = [
    {
      _id: '1',
      email: 'johndoe@example.com',
      username: 'johndoe',
      fullname: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'user',
      isBanned: false,
      createdAt: generateISODate(),
      isVerify: true,
    },
    {
      _id: '2',
      email: 'janedoe@example.com',
      username: 'janedoe',
      fullname: 'Jane Doe',
      avatar: 'https://i.pravatar.cc/150?img=2',
      role: 'admin',
      isBanned: false,
      createdAt: generateISODate(),
      isVerify: false,
    },
    {
      _id: '3',
      email: 'bobjohnson@example.com',
      username: 'bobjohnson',
      fullname: 'Bob Johnson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: 'user',
      isBanned: true,
      createdAt: generateISODate(),
      isVerify: true,
    },
    {
      _id: '4',
      email: 'alicewong@example.com',
      username: 'alicewong',
      fullname: 'Alice Wong',
      avatar: 'https://i.pravatar.cc/150?img=4',
      role: 'user',
      isBanned: false,
      createdAt: generateISODate(),
      isVerify: true,
    },
    {
      _id: '5',
      email: 'michaelbrown@example.com',
      username: 'michaelbrown',
      fullname: 'Michael Brown',
      avatar: 'https://i.pravatar.cc/150?img=5',
      role: 'admin',
      isBanned: true,
      createdAt: generateISODate(),
      isVerify: false,
    },
    {
      _id: '1',
      email: 'johndoe@example.com',
      username: 'johndoe',
      fullname: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'user',
      isBanned: false,
      createdAt: generateISODate(),
      isVerify: true,
    },
    {
      _id: '2',
      email: 'janedoe@example.com',
      username: 'janedoe',
      fullname: 'Jane Doe',
      avatar: 'https://i.pravatar.cc/150?img=2',
      role: 'admin',
      isBanned: false,
      createdAt: generateISODate(),
      isVerify: false,
    },
    {
      _id: '3',
      email: 'bobjohnson@example.com',
      username: 'bobjohnson',
      fullname: 'Bob Johnson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: 'user',
      isBanned: true,
      createdAt: generateISODate(),
      isVerify: true,
    },
    {
      _id: '4',
      email: 'alicewong@example.com',
      username: 'alicewong',
      fullname: 'Alice Wong',
      avatar: 'https://i.pravatar.cc/150?img=4',
      role: 'user',
      isBanned: false,
      createdAt: generateISODate(),
      isVerify: true,
    },
    {
      _id: '5',
      email: 'michaelbrown@example.com',
      username: 'michaelbrown',
      fullname: 'Michael Brown',
      avatar: 'https://i.pravatar.cc/150?img=5',
      role: 'admin',
      isBanned: true,
      createdAt: generateISODate(),
      isVerify: false,
    },
    {
      _id: '1',
      email: 'johndoe@example.com',
      username: 'johndoe',
      fullname: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'user',
      isBanned: false,
      createdAt: generateISODate(),
      isVerify: true,
    },
    {
      _id: '2',
      email: 'janedoe@example.com',
      username: 'janedoe',
      fullname: 'Jane Doe',
      avatar: 'https://i.pravatar.cc/150?img=2',
      role: 'admin',
      isBanned: false,
      createdAt: generateISODate(),
      isVerify: false,
    },
    {
      _id: '3',
      email: 'bobjohnson@example.com',
      username: 'bobjohnson',
      fullname: 'Bob Johnson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: 'user',
      isBanned: true,
      createdAt: generateISODate(),
      isVerify: true,
    },
    {
      _id: '4',
      email: 'alicewong@example.com',
      username: 'alicewong',
      fullname: 'Alice Wong',
      avatar: 'https://i.pravatar.cc/150?img=4',
      role: 'user',
      isBanned: false,
      createdAt: generateISODate(),
      isVerify: true,
    },
    {
      _id: '5',
      email: 'michaelbrown@example.com',
      username: 'michaelbrown',
      fullname: 'Michael Brown',
      avatar: 'https://i.pravatar.cc/150?img=5',
      role: 'admin',
      isBanned: true,
      createdAt: generateISODate(),
      isVerify: false,
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
        <DataTable columns={columns} data={data} />
      </div>
    </ContentLayout>
  );
}
