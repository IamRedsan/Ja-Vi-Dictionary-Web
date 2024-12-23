import { Plus, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { useEffect, useState } from 'react';

interface Word {
  text: string;
  reading: string[];
  meaning: {
    type: string;
    meaning: string;
  }[];
  example: {
    text: string;
    hiragana: string;
    meaning: string;
  }[];
}

interface WordFormProps {
  action: 'view' | 'update' | 'create';
}

export function WordForm({ action }: WordFormProps) {
  const [word, setWord] = useState<Word>({
    text: '',
    reading: [''],
    meaning: [{ type: '', meaning: '' }],
    example: [],
  });

  const hanleChangeText = (text: string) => {
    setWord((prevWord) => ({
      ...prevWord,
      text,
    }));
  };

  const handleChangeReading = (text: string, index: number) => {
    setWord((prevWord) => ({
      ...prevWord,
      reading: prevWord.reading.map((value, i) => (i === index ? text : value)),
    }));
  };

  const handleChangeMeaning = (
    text: string,
    index: number,
    field: 'type' | 'meaning'
  ) => {
    setWord((prevWord) => ({
      ...prevWord,
      meaning: prevWord.meaning.map((value, i) =>
        i === index ? { ...value, [field]: text } : value
      ),
    }));
  };

  const handleChangeExample = (
    text: string,
    index: number,
    field: 'text' | 'hiragana' | 'meaning'
  ) => {
    setWord((prevWord) => ({
      ...prevWord,
      example: prevWord.example.map((value, i) =>
        i === index ? { ...value, [field]: text } : value
      ),
    }));
  };

  const handleAddReading = () => {
    setWord((prevWord) => ({
      ...prevWord,
      reading: [...prevWord.reading, ''],
    }));
  };

  const handleRemoveReading = (index: number) => {
    setWord((prevWord) => ({
      ...prevWord,
      reading: prevWord.reading.filter((_, i) => i !== index),
    }));
  };

  const handleAddMeaning = () => {
    setWord((prevWord) => ({
      ...prevWord,
      meaning: [...prevWord.meaning, { type: '', meaning: '' }],
    }));
  };

  const handleRemoveMeaning = (index: number) => {
    setWord((prevWord) => ({
      ...prevWord,
      meaning: prevWord.meaning.filter((_, i) => i !== index),
    }));
  };

  const handleAddExample = () => {
    setWord((prevWord) => ({
      ...prevWord,
      example: [...prevWord.example, { text: '', hiragana: '', meaning: '' }],
    }));
  };

  const handleRemoveExample = (index: number) => {
    setWord((prevWord) => ({
      ...prevWord,
      example: prevWord.example.filter((_, i) => i !== index),
    }));
  };

  const hardDisabled = action === 'view';

  useEffect(() => {
    if (action !== 'create') {
      setWord({
        text: '黄昏',
        reading: ['たそがれ', 'こうこん'],
        meaning: [
          { type: 'Danh từ', meaning: 'Hoàng hôn' },
          { type: 'Danh từ', meaning: 'Chiều tàn' },
        ],
        example: [
          {
            text: '黄昏の町',
            hiragana: 'たそがれのまち',
            meaning: 'Thị trấn chiều tàn',
          },
        ],
      });
    }
  }, [action]);

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
            value={word.text}
            onChange={(e) => {
              hanleChangeText(e.currentTarget.value);
            }}
            disabled={hardDisabled}
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='reading' className='text-right'>
            Cách đọc
          </Label>
          <Input
            id='reading'
            className='col-span-3'
            value={word.reading[0]}
            onChange={(e) => {
              handleChangeReading(e.currentTarget.value, 0);
            }}
            disabled={hardDisabled}
          />
        </div>
        {word.reading.map((reading, index) => {
          if (index === 0) return null;
          return (
            <div className='grid grid-cols-4 gap-4' key={index}>
              <div className='col-span-3 col-start-2 grid grid-cols-10 gap-2'>
                <Input
                  className='col-span-9'
                  value={reading}
                  onChange={(e) => {
                    handleChangeReading(e.currentTarget.value, index);
                  }}
                  disabled={hardDisabled}
                />
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-full aspect-square'
                  onClick={() => {
                    handleRemoveReading(index);
                  }}
                  disabled={hardDisabled}>
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
              onClick={handleAddReading}
              disabled={hardDisabled}>
              <Plus />
            </Button>
          </div>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='meaning' className='text-right'>
            Ý nghĩa
          </Label>
          <div className='col-span-3 col-start-2 grid grid-cols-10 gap-2'>
            <Input
              id='meaning'
              className='col-span-2 md:col-span-3'
              value={word.meaning[0].type}
              onChange={(e) => {
                handleChangeMeaning(e.currentTarget.value, 0, 'type');
              }}
              disabled={hardDisabled}
            />
            <Input
              className='col-span-8 md:col-span-7'
              value={word.meaning[0].meaning}
              onChange={(e) => {
                handleChangeMeaning(e.currentTarget.value, 0, 'meaning');
              }}
              disabled={hardDisabled}
            />
          </div>
        </div>
        {word.meaning.map((meaning, index) => {
          if (index === 0) return null;
          return (
            <div className='grid grid-cols-4 gap-4' key={index}>
              <div className='col-span-3 col-start-2 grid grid-cols-10 gap-2'>
                <Input
                  className='col-span-2 md:col-span-3'
                  value={meaning.type}
                  onChange={(e) => {
                    handleChangeMeaning(e.currentTarget.value, index, 'type');
                  }}
                  disabled={hardDisabled}
                />
                <Input
                  className='col-span-7 md:col-span-6'
                  value={meaning.meaning}
                  onChange={(e) => {
                    handleChangeMeaning(
                      e.currentTarget.value,
                      index,
                      'meaning'
                    );
                  }}
                  disabled={hardDisabled}
                />
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-full aspect-square'
                  onClick={() => {
                    handleRemoveMeaning(index);
                  }}
                  disabled={hardDisabled}>
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
              onClick={handleAddMeaning}
              disabled={hardDisabled}>
              <Plus />
            </Button>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        {word.example.map((example, index) => {
          return (
            <Card key={index}>
              <div className='relative p-4'>
                <div className='grid gap-4'>
                  <Label className='text-center'>Ví dụ</Label>
                  <div className='grid grid-cols-5 items-center gap-4'>
                    <Label htmlFor='example-text' className='text-right'>
                      Câu
                    </Label>
                    <Input
                      id='example-text'
                      className='col-span-4'
                      value={example.text}
                      onChange={(e) => {
                        handleChangeExample(
                          e.currentTarget.value,
                          index,
                          'text'
                        );
                      }}
                      disabled={hardDisabled}
                    />
                  </div>
                  <div className='grid grid-cols-5 items-center gap-4'>
                    <Label htmlFor='example-hiragana' className='text-right'>
                      Hiragana
                    </Label>
                    <Input
                      id='example-hiragana'
                      className='col-span-4'
                      value={example.hiragana}
                      onChange={(e) => {
                        handleChangeExample(
                          e.currentTarget.value,
                          index,
                          'hiragana'
                        );
                      }}
                      disabled={hardDisabled}
                    />
                  </div>
                  <div className='grid grid-cols-5 items-center gap-4'>
                    <Label htmlFor='example-meaning' className='text-right'>
                      Ý nghĩa
                    </Label>
                    <Input
                      id='example-meaning'
                      className='col-span-4'
                      value={example.meaning}
                      onChange={(e) => {
                        handleChangeExample(
                          e.currentTarget.value,
                          index,
                          'meaning'
                        );
                      }}
                      disabled={hardDisabled}
                    />
                  </div>
                </div>
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-full aspect-square absolute top-1 right-1'
                  onClick={() => {
                    handleRemoveExample(index);
                  }}
                  disabled={hardDisabled}>
                  <X />
                </Button>
              </div>
            </Card>
          );
        })}
        <div className='flex justify-center'>
          <Button
            variant='outline'
            size='icon'
            className='rounded-full aspect-square'
            onClick={handleAddExample}
            disabled={hardDisabled}>
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
}
