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
import { useEffect, useState } from 'react';
import { authClient } from '@/client/axiosClient';
import { AxiosError } from 'axios';
import { useToast } from '@/hooks/use-toast';

interface DasboardData {
  user: number;
  kanji: number;
  word: number;
  userRegister: {
    count: number;
    month: number;
    year: number;
  }[];
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DasboardData>();
  const [title, setTitle] = useState<string>('');
  const [chartData, setChartData] = useState<
    {
      month: string;
      count: number;
    }[]
  >();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getDashBoardData = async () => {
      try {
        setLoading(true);
        const response = await authClient.get('/dashboard/');
        const data: DasboardData = response.data.data;
        console.log(data);
        setDashboardData(data);

        const mappedChartData = data.userRegister.map((item) => ({
          month: `Tháng ${item.month}`,
          count: item.count,
        }));
        setChartData(mappedChartData);

        const startMonth = data.userRegister[0];
        const endMonth = data.userRegister[data.userRegister.length - 1];
        const chartTitle = `Tháng ${startMonth.month}, Năm ${startMonth.year} - Tháng ${endMonth.month}, Năm ${endMonth.year}`;
        setTitle(chartTitle);
      } catch (error) {
        const e = error as AxiosError;
        const message = (e.response?.data as any)?.message as any;

        toast({
          title: 'Lỗi khi lấy thông tin biểu đồ.',
          description: message ?? 'Lỗi không xác định.',
        });
      } finally {
        setLoading(false);
      }
    };

    getDashBoardData();
  }, []);

  return (
    <ContentLayout title='Tổng quan'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/'>Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tổng quan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='grid auto-rows-min gap-4 md:grid-cols-3 mt-5'>
        <Statistics
          title='Tổng người dùng'
          count={dashboardData?.user ?? 0}
          icon={Users}
          loading={loading}
        />
        <Statistics
          title='Tổng Hán tự'
          count={dashboardData?.kanji ?? 0}
          loading={loading}
          icon={Languages}
        />
        <Statistics
          title='Tổng từ vựng'
          count={dashboardData?.word ?? 0}
          icon={BookA}
          loading={loading}
        />
      </div>
      <div className='mt-5'>
        <Chart
          chartData={chartData ?? []}
          title={title}
          user={dashboardData?.user ?? 0}
          loading={loading}
        />
      </div>
    </ContentLayout>
  );
}
