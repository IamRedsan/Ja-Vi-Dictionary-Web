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
import { Composition, useComposition } from '@/context/composition-context';
import { ColumnDef } from '@tanstack/react-table';
import { ActionCell } from '@/components/composition/column';
import { useEffect, useState } from 'react';
import { DataTable } from '@/components/composition/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import { AxiosError } from 'axios';
import { Button } from '@/components/ui/button';
import { CompositionDialog } from '@/components/composition/composition-dialog';

export default function CompositionPage() {
  const { compositions } = useComposition();
  const [data, setData] = useState<Composition[]>([]);
  const [isOpenDialogCreate, setIsOpenDialogCreate] = useState<boolean>(false);

  const columns: ColumnDef<Composition>[] = [
    {
      accessorKey: 'raw_text',
      header: 'Bộ thủ',
    },
    {
      accessorKey: 'phonetic',
      header: 'Hán Việt',
    },
    {
      header: 'Hành động',
      id: 'actions',
      cell: ({ row }) => <ActionCell composition={row.original} />,
    },
  ];

  useEffect(() => {
    setData(compositions);
  }, [compositions]);

  return (
    <ContentLayout title='Danh sách bộ thủ'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/'>Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='#'>Từ điển</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Bộ thủ</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Button
        className='absolute top-20 right-8'
        onClick={() => {
          setIsOpenDialogCreate(true);
        }}>
        Thêm bộ thủ
      </Button>
      <CompositionDialog
        action='create'
        description='Tạo bộ thủ mới'
        isOpen={isOpenDialogCreate}
        setIsOpen={setIsOpenDialogCreate}
        title='Bộ thủ'
      />
      <div className='container mx-auto py-10'>
        <DataTable columns={columns} data={data} />
      </div>
    </ContentLayout>
  );
}
