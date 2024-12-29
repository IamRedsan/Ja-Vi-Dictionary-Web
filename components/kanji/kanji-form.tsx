import { Plus, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useKanji } from '@/context/kanji-context';

interface KanjiFormProps {
  action: 'view' | 'update' | 'create';
}

export function KanjiForm({ action }: KanjiFormProps) {
  const { kanji, setKanji, loading } = useKanji();
  const compositionValue =
    kanji.composition
      ?.map((item) => `${item.raw_text} ${item.phonetic}`)
      .join(', ') || 'N/A';

  const hanleChangeField = (
    value: string | number,
    field: 'text' | 'meaning' | 'stroke' | 'jlpt_level' | 'stroke'
  ) => {
    setKanji((prevKanji) => ({
      ...prevKanji,
      [field]: value,
    }));
  };

  const handleChangeFieldArray = (
    value: string | number,
    index: number,
    field: 'phonetic' | 'onyomi' | 'kunyomi'
  ) => {
    setKanji((prevKanji) => ({
      ...prevKanji,
      [field]: prevKanji[field].map((v, i) => (i === index ? value : v)),
    }));
  };

  const handleAddFieldArray = (field: 'phonetic' | 'onyomi' | 'kunyomi') => {
    setKanji((prevKanji) => ({
      ...prevKanji,
      [field]: [...prevKanji[field], ''],
    }));
  };

  const handleRemoveFieldArray = (
    index: number,
    field: 'phonetic' | 'onyomi' | 'kunyomi'
  ) => {
    setKanji((prevKanji) => ({
      ...prevKanji,
      [field]: prevKanji[field].filter((_, i) => i !== index),
    }));
  };

  const hardDisabled = action === 'view';
  return (
    <div className='grid md:grid-cols-2 gap-8 py-4 grid-cols-1 items-start'>
      <div className='grid gap-4'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='text' className='text-right'>
            Từ vựng
          </Label>
          <Input
            id='text'
            className='col-span-3'
            value={kanji.text}
            onChange={(e) => {
              hanleChangeField(e.currentTarget.value, 'text');
            }}
            disabled={hardDisabled || loading}
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='phonetic' className='text-right'>
            Hán việt
          </Label>
          <Input
            id='phonetic'
            className='col-span-3'
            value={kanji.phonetic[0]}
            onChange={(e) => {
              handleChangeFieldArray(e.currentTarget.value, 0, 'phonetic');
            }}
            disabled={hardDisabled || loading}
          />
        </div>
        {kanji.phonetic.map((phonetic, index) => {
          if (index === 0) return null;
          return (
            <div className='grid grid-cols-4 gap-4' key={index}>
              <div className='col-span-3 col-start-2 grid grid-cols-10 gap-2'>
                <Input
                  className='col-span-9'
                  value={phonetic}
                  onChange={(e) => {
                    handleChangeFieldArray(
                      e.currentTarget.value,
                      index,
                      'phonetic'
                    );
                  }}
                  disabled={hardDisabled || loading}
                />
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-full aspect-square'
                  onClick={() => {
                    handleRemoveFieldArray(index, 'phonetic');
                  }}
                  disabled={hardDisabled || loading}>
                  <X />
                </Button>
              </div>
            </div>
          );
        })}
        <div className='grid grid-cols-4 gap-4'>
          <div className='col-span-3 col-start-2 flex justify-center'>
            <Button
              variant='outline'
              size='icon'
              className='rounded-full aspect-square'
              onClick={() => {
                handleAddFieldArray('phonetic');
              }}
              disabled={hardDisabled || loading}>
              <Plus />
            </Button>
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='onyomi' className='text-right'>
            Âm on
          </Label>
          <Input
            id='onyomi'
            className='col-span-3'
            value={kanji.onyomi[0]}
            onChange={(e) => {
              handleChangeFieldArray(e.currentTarget.value, 0, 'onyomi');
            }}
            disabled={hardDisabled || loading}
          />
        </div>
        {kanji.onyomi.map((onyomi, index) => {
          if (index === 0) return null;
          return (
            <div className='grid grid-cols-4 gap-4' key={index}>
              <div className='col-span-3 col-start-2 grid grid-cols-10 gap-2'>
                <Input
                  className='col-span-9'
                  value={onyomi}
                  onChange={(e) => {
                    handleChangeFieldArray(
                      e.currentTarget.value,
                      index,
                      'onyomi'
                    );
                  }}
                  disabled={hardDisabled || loading}
                />
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-full aspect-square'
                  onClick={() => {
                    handleRemoveFieldArray(index, 'onyomi');
                  }}
                  disabled={hardDisabled || loading}>
                  <X />
                </Button>
              </div>
            </div>
          );
        })}
        <div className='grid grid-cols-4 gap-4'>
          <div className='col-span-3 col-start-2 flex justify-center'>
            <Button
              variant='outline'
              size='icon'
              className='rounded-full aspect-square'
              onClick={() => {
                handleAddFieldArray('onyomi');
              }}
              disabled={hardDisabled || loading}>
              <Plus />
            </Button>
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='kunyomi' className='text-right'>
            Âm kun
          </Label>
          <Input
            id='kunyomi'
            className='col-span-3'
            value={kanji.kunyomi[0]}
            onChange={(e) => {
              handleChangeFieldArray(e.currentTarget.value, 0, 'kunyomi');
            }}
            disabled={hardDisabled || loading}
          />
        </div>
        {kanji.kunyomi.map((kunyomi, index) => {
          if (index === 0) return null;
          return (
            <div className='grid grid-cols-4 gap-4' key={index}>
              <div className='col-span-3 col-start-2 grid grid-cols-10 gap-2'>
                <Input
                  className='col-span-9'
                  value={kunyomi}
                  onChange={(e) => {
                    handleChangeFieldArray(
                      e.currentTarget.value,
                      index,
                      'kunyomi'
                    );
                  }}
                  disabled={hardDisabled || loading}
                />
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-full aspect-square'
                  onClick={() => {
                    handleRemoveFieldArray(index, 'kunyomi');
                  }}
                  disabled={hardDisabled || loading}>
                  <X />
                </Button>
              </div>
            </div>
          );
        })}
        <div className='grid grid-cols-4 gap-4'>
          <div className='col-span-3 col-start-2 flex justify-center'>
            <Button
              variant='outline'
              size='icon'
              className='rounded-full aspect-square'
              onClick={() => {
                handleAddFieldArray('kunyomi');
              }}
              disabled={hardDisabled || loading}>
              <Plus />
            </Button>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='jltp_level' className='text-right'>
            JLPT
          </Label>
          <Select value={String(kanji.jlpt_level)}>
            <SelectTrigger
              className='col-span-3'
              id='jltp_level'
              disabled={hardDisabled || loading}>
              <SelectValue placeholder='Chọn level JLPT' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='1'>N1</SelectItem>
                <SelectItem value='2'>N2</SelectItem>
                <SelectItem value='3'>N3</SelectItem>
                <SelectItem value='4'>N4</SelectItem>
                <SelectItem value='5'>N5</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='stroke' className='text-right'>
            Số nét
          </Label>
          <Input
            value={kanji.stroke}
            onChange={(e) => {
              hanleChangeField(e.currentTarget.value, 'stroke');
            }}
            id='stroke'
            className='col-span-3'
            type='number'
            min={0}
            disabled={hardDisabled || loading}
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='stroke' className='text-right'>
            Ý nghĩa
          </Label>
          <Textarea
            value={kanji.meaning}
            onChange={(e) => {
              hanleChangeField(e.currentTarget.value, 'meaning');
            }}
            className='col-span-3'
            disabled={hardDisabled || loading}
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='compositions' className='text-right'>
            Bộ thủ
          </Label>
          <Input className='col-span-3' disabled value={compositionValue} />
        </div>
      </div>
    </div>
  );
}
