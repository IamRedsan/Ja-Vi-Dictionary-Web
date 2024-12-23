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
import { DataTable } from '@/components/word/data-table';
import { columns, WordRow } from '@/components/word/column';
import { WordDialog } from '@/components/word/word-dialog';
import { Button } from '@/components/ui/button';
import { useWord } from '@/context/word-context';
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
import { Loader2 } from 'lucide-react';

export default function WordPage() {
  const { data } = useWord();
  const {
    setWordById,
    setIsOpenDialog,
    isOpenDialog,
    setDialogAction,
    dialogAction,
    deleteWord,
    loading,
  } = useWord();

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
            <BreadcrumbPage>Từ vựng</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Button
        className='absolute top-20 right-8'
        onClick={() => {
          setWordById();
          setDialogAction('create');
          setIsOpenDialog(true);
        }}>
        Thêm từ vựng
      </Button>
      <WordDialog
        action='create'
        isOpen={isOpenDialog && dialogAction === 'create'}
        setIsOpen={setIsOpenDialog}
        description='Điền thông tin từ vựng. Vui lòng bấm lưu xong khi điền xong.'
        title='Thêm từ vựng'
      />
      <WordDialog
        action='update'
        isOpen={isOpenDialog && dialogAction === 'update'}
        setIsOpen={setIsOpenDialog}
        title='Cập nhật tự vựng'
        description='Điền thông tin từ vựng. Vui lòng bấm lưu xong khi điền xong.'
      />
      <WordDialog
        action='view'
        isOpen={isOpenDialog && dialogAction === 'view'}
        setIsOpen={setIsOpenDialog}
        title='Từ vựng'
        description=''
      />
      <AlertDialog open={isOpenDialog && dialogAction === 'delete'}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa từ vựng</AlertDialogTitle>
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
              <AlertDialogAction onClick={deleteWord}>Xóa</AlertDialogAction>
            ) : (
              <AlertDialogAction disabled>
                <Loader2 className='animate-spin' />
                Vui lòng đợi
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DataTable
        columns={columns}
        data={data.map<WordRow>((word) => ({
          _id: word._id,
          text: word.text,
          hiragana: word.hiragana[0],
          meaning: word.meaning[0].content,
        }))}
      />
    </ContentLayout>
  );
}
