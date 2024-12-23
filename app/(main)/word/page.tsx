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
import { columns, Word } from '@/components/word/column';
import { WordDialog } from '@/components/word/word-dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const data: Word[] = [
  { text: '怖い', hiragana: 'こわい', meaning: 'Sợ hãi' },
  { text: '恐れ', hiragana: 'おそれ', meaning: 'Nỗi sợ' },
  { text: '不安', hiragana: 'ふあん', meaning: 'Lo âu' },
  { text: '緊張', hiragana: 'きんちょう', meaning: 'Căng thẳng' },
  { text: '怖気', hiragana: 'おじけ', meaning: 'Sự run sợ' },
  { text: '心配', hiragana: 'しんぱい', meaning: 'Lo lắng' },
  { text: '恐怖症', hiragana: 'きょうふしょう', meaning: 'Chứng sợ hãi' },
  { text: '戦慄', hiragana: 'せんりつ', meaning: 'Rùng mình' },
  { text: '不安定', hiragana: 'ふあんてい', meaning: 'Không ổn định' },
  { text: '恐ろしい', hiragana: 'おそろしい', meaning: 'Kinh khủng' },
  {
    text: '精神的な苦痛',
    hiragana: 'せいしんてきなくつう',
    meaning: 'Đau khổ về mặt tinh thần',
  },
  { text: '戦争', hiragana: 'せんそう', meaning: 'Chiến tranh' },
  { text: '衝撃', hiragana: 'しょうげき', meaning: 'Cú sốc' },
  { text: '恐慌', hiragana: 'きょうこう', meaning: 'Hoảng loạn' },
  { text: '危険', hiragana: 'きけん', meaning: 'Nguy hiểm' },
  { text: '恐竜', hiragana: 'きょうりゅう', meaning: 'Khủng long' },
  { text: '暗闇', hiragana: 'くらやみ', meaning: 'Bóng tối' },
  { text: 'パニック', hiragana: 'ぱにっく', meaning: 'Hoảng loạn' },
  { text: '不安感', hiragana: 'ふあんかん', meaning: 'Cảm giác lo âu' },
  { text: '恐怖映画', hiragana: 'きょうふえいが', meaning: 'Phim kinh dị' },
];

export default function WordPage() {
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
            <BreadcrumbPage>Từ vựng</BreadcrumbPage>
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
      <WordDialog
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
