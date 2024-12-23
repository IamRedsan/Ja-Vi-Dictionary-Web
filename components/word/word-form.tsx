import { Plus, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { useWord } from '@/context/word-context';

interface WordFormProps {
  action: 'view' | 'update' | 'create';
}

export function WordForm({ action }: WordFormProps) {
  const { word, setWord, loading } = useWord();

  const hanleChangeText = (text: string) => {
    setWord((prevWord) => ({
      ...prevWord,
      text,
    }));
  };

  const handleChangeHiragana = (text: string, index: number) => {
    setWord((prevWord) => ({
      ...prevWord,
      hiragana: prevWord.hiragana.map((value, i) =>
        i === index ? text : value
      ),
    }));
  };

  const handleChangeMeaning = (
    text: string,
    index: number,
    field: 'type' | 'content'
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
      examples: prevWord.examples.map((value, i) =>
        i === index ? { ...value, [field]: text } : value
      ),
    }));
  };

  const handleAddHiragana = () => {
    setWord((prevWord) => ({
      ...prevWord,
      hiragana: [...prevWord.hiragana, ''],
    }));
  };

  const handleRemoveHiragana = (index: number) => {
    setWord((prevWord) => ({
      ...prevWord,
      hiragana: prevWord.hiragana.filter((_, i) => i !== index),
    }));
  };

  const handleAddMeaning = () => {
    setWord((prevWord) => ({
      ...prevWord,
      meaning: [...prevWord.meaning, { type: '', content: '' }],
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
      examples: [...prevWord.examples, { text: '', hiragana: '', meaning: '' }],
    }));
  };

  const handleRemoveExample = (index: number) => {
    setWord((prevWord) => ({
      ...prevWord,
      examples: prevWord.examples.filter((_, i) => i !== index),
    }));
  };

  const disabled = action === 'view' || loading;

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
            disabled={disabled}
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='hiragana' className='text-right'>
            Cách đọc
          </Label>
          <Input
            id='hiragana'
            className='col-span-3'
            value={word.hiragana[0]}
            onChange={(e) => {
              handleChangeHiragana(e.currentTarget.value, 0);
            }}
            disabled={disabled}
          />
        </div>
        {word.hiragana.map((hiragana, index) => {
          if (index === 0) return null;
          return (
            <div className='grid grid-cols-4 gap-4' key={index}>
              <div className='col-span-3 col-start-2 grid grid-cols-10 gap-2'>
                <Input
                  className='col-span-9'
                  value={hiragana}
                  onChange={(e) => {
                    handleChangeHiragana(e.currentTarget.value, index);
                  }}
                  disabled={disabled}
                />
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-full aspect-square'
                  onClick={() => {
                    handleRemoveHiragana(index);
                  }}
                  disabled={disabled}>
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
              onClick={handleAddHiragana}
              disabled={disabled}>
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
              disabled={disabled}
            />
            <Input
              className='col-span-8 md:col-span-7'
              value={word.meaning[0].content}
              onChange={(e) => {
                handleChangeMeaning(e.currentTarget.value, 0, 'content');
              }}
              disabled={disabled}
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
                  disabled={disabled}
                />
                <Input
                  className='col-span-7 md:col-span-6'
                  value={meaning.content}
                  onChange={(e) => {
                    handleChangeMeaning(
                      e.currentTarget.value,
                      index,
                      'content'
                    );
                  }}
                  disabled={disabled}
                />
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-full aspect-square'
                  onClick={() => {
                    handleRemoveMeaning(index);
                  }}
                  disabled={disabled}>
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
              disabled={disabled}>
              <Plus />
            </Button>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        {word.examples?.map((examples, index) => {
          return (
            <Card key={index}>
              <div className='relative p-4'>
                <div className='grid gap-4'>
                  <Label className='text-center'>Ví dụ</Label>
                  <div className='grid grid-cols-5 items-center gap-4'>
                    <Label
                      htmlFor={`examples-text-${index}`}
                      className='text-right'>
                      Câu
                    </Label>
                    <Input
                      id={`examples-text-${index}`}
                      className='col-span-4'
                      value={examples.text}
                      onChange={(e) => {
                        handleChangeExample(
                          e.currentTarget.value,
                          index,
                          'text'
                        );
                      }}
                      disabled={disabled}
                    />
                  </div>
                  <div className='grid grid-cols-5 items-center gap-4'>
                    <Label
                      htmlFor={`examples-hiragana-${index}`}
                      className='text-right'>
                      Hiragana
                    </Label>
                    <Input
                      id={`examples-hiragana-${index}`}
                      className='col-span-4'
                      value={examples.hiragana}
                      onChange={(e) => {
                        handleChangeExample(
                          e.currentTarget.value,
                          index,
                          'hiragana'
                        );
                      }}
                      disabled={disabled}
                    />
                  </div>
                  <div className='grid grid-cols-5 items-center gap-4'>
                    <Label
                      htmlFor={`examples-meaning-${index}`}
                      className='text-right'>
                      Ý nghĩa
                    </Label>
                    <Input
                      id={`examples-meaning-${index}`}
                      className='col-span-4'
                      value={examples.meaning}
                      onChange={(e) => {
                        handleChangeExample(
                          e.currentTarget.value,
                          index,
                          'meaning'
                        );
                      }}
                      disabled={disabled}
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
                  disabled={disabled}>
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
            disabled={disabled}>
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
}
