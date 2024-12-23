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

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { KanjiDialog } from '@/components/kanji/kanji-dialog';
import { DataTable } from '@/components/kanji/data-table';
import { columns, Kanji } from '@/components/kanji/column';

const data: Kanji[] = [
  { text: '私', phonetic: 'tư', meaning: 'tôi', jlpt_level: 'N5' },
  { text: '日', phonetic: 'nhật', meaning: 'ngày, mặt trời', jlpt_level: 'N5' },
  { text: '人', phonetic: 'nhân', meaning: 'người', jlpt_level: 'N5' },
  { text: '本', phonetic: 'bổn', meaning: 'sách, gốc', jlpt_level: 'N5' },
  { text: '学', phonetic: 'học', meaning: 'học', jlpt_level: 'N5' },
  { text: '生', phonetic: 'sinh', meaning: 'sống, sinh ra', jlpt_level: 'N5' },
  { text: '食', phonetic: 'thực', meaning: 'ăn', jlpt_level: 'N5' },
  { text: '水', phonetic: 'thủy', meaning: 'nước', jlpt_level: 'N5' },
  { text: '大', phonetic: 'đại', meaning: 'lớn', jlpt_level: 'N5' },
  { text: '小', phonetic: 'tiểu', meaning: 'nhỏ', jlpt_level: 'N5' },
  {
    text: '時間',
    phonetic: 'thời gian',
    meaning: 'thời gian',
    jlpt_level: 'N4',
  },
  { text: '手', phonetic: 'thủ', meaning: 'tay', jlpt_level: 'N5' },
  {
    text: '月',
    phonetic: 'nguyệt',
    meaning: 'tháng, mặt trăng',
    jlpt_level: 'N5',
  },
  { text: '火', phonetic: 'hỏa', meaning: 'lửa', jlpt_level: 'N5' },
  { text: '木', phonetic: 'mộc', meaning: 'cây, gỗ', jlpt_level: 'N5' },
  { text: '目', phonetic: 'mục', meaning: 'mắt', jlpt_level: 'N5' },
  { text: '耳', phonetic: 'nhĩ', meaning: 'tai', jlpt_level: 'N5' },
  { text: '目', phonetic: 'mục', meaning: 'mắt', jlpt_level: 'N5' },
  { text: '車', phonetic: 'xa', meaning: 'xe', jlpt_level: 'N5' },
  { text: '川', phonetic: 'xuyên', meaning: 'sông', jlpt_level: 'N5' },
];

export default function KanjiPage() {
  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
  return (
    <ContentLayout title='Dashboard'>
      <Breadcrumb className='mb-5'>
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
            <BreadcrumbPage>Hán tự</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Button
        className='absolute top-20 right-8'
        onClick={() => {
          setIsOpenCreateDialog((prev) => !prev);
        }}>
        Thêm từ vựng
      </Button>
      <KanjiDialog
        action='create'
        isOpen={isOpenCreateDialog}
        setIsOpen={setIsOpenCreateDialog}
        description='Điền thông tin từ vựng. Vui lòng bấm lưu xong khi điền xong.'
        title='Thêm từ vựng'
      />
      <DataTable columns={columns} data={data} />
    </ContentLayout>
  );
}
