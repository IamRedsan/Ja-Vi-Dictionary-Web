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

import { Button } from '@/components/ui/button';
import { KanjiDialog } from '@/components/kanji/kanji-dialog';
import { DataTable } from '@/components/kanji/data-table';
import { columns, KanjiRow } from '@/components/kanji/column';
import { useKanji } from '@/context/kanji-context';
import { Loader2 } from 'lucide-react';

export default function KanjiPage() {
  const { data } = useKanji();
  const {
    setKanjiById,
    setIsOpenDialog,
    isOpenDialog,
    setDialogAction,
    dialogAction,
    deleteKanji,
    loading,
  } = useKanji();
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
          setKanjiById();
          setDialogAction('create');
          setIsOpenDialog(true);
        }}>
        Thêm từ vựng
      </Button>
      <KanjiDialog
        action='create'
        isOpen={isOpenDialog && dialogAction === 'create'}
        setIsOpen={setIsOpenDialog}
        description='Điền thông tin hán tự. Vui lòng bấm lưu xong khi điền xong.'
        title='Thêm hán tự'
      />
      <KanjiDialog
        action='update'
        isOpen={isOpenDialog && dialogAction === 'update'}
        setIsOpen={setIsOpenDialog}
        title='Cập nhật Hán tự'
        description='Điền thông tin hán tự. Vui lòng bấm lưu xong khi điền xong.'
      />
      <KanjiDialog
        action='view'
        isOpen={isOpenDialog && dialogAction === 'view'}
        setIsOpen={setIsOpenDialog}
        title='Hán tự'
        description=''
      />
      <AlertDialog open={isOpenDialog && dialogAction === 'delete'}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa hán tự</AlertDialogTitle>
            <AlertDialogDescription>
              Thao tác này không thể hoàn tác
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsOpenDialog(false);
              }}>
              Hủy
            </AlertDialogCancel>
            {!loading ? (
              <AlertDialogAction onClick={deleteKanji}>Xóa</AlertDialogAction>
            ) : (
              <AlertDialogAction disabled>
                <Loader2 className='animate-spin' />
                Vui lòng đợi
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DataTable columns={columns} data={data as any} />
    </ContentLayout>
  );
}
