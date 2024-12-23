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
import { Statistics } from '@/components/dashboard/statistics';
import { BookA, Languages, Users } from 'lucide-react';
import { Chart } from '@/components/dashboard/area-chart';

export default function DashboardPage() {
  return (
    <ContentLayout title='Dashboard'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/'>Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='grid auto-rows-min gap-4 md:grid-cols-3 mt-5'>
        <Statistics title='Tổng người dùng' count={3232} icon={Users} />
        <Statistics title='Tổng Hán tự' count={4544} icon={Languages} />
        <Statistics title='Tổng từ vựng' count={2322} icon={BookA} />
      </div>
      <div className='mt-5'>
        <Chart />
      </div>
    </ContentLayout>
  );
}
