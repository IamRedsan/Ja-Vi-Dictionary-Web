import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Composition, useComposition } from '@/context/composition-context';
import { useState } from 'react';

interface CompositionDialogProps {
  composition?: Composition;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  description: string;
  action: 'update' | 'create';
}

export function CompositionDialog({
  composition,
  title,
  description,
  isOpen,
  setIsOpen,
  action,
}: CompositionDialogProps) {
  const [rawText, setRawText] = useState<string>(composition?.raw_text ?? '');
  const [phonetic, setPhonetic] = useState<string>(composition?.phonetic ?? '');
  const { updateComposition, createComposition } = useComposition();

  const handleUpdateComposition = async () => {
    if (rawText === '' || phonetic === '') {
      return;
    }
    try {
      const updatedComp: Composition = {
        _id: composition!._id,
        phonetic: phonetic,
        raw_text: rawText,
      };
      await updateComposition(updatedComp);
      setIsOpen(false);
    } catch (error) {
      console.error('Cập nhật composition thất bại:', error);
    }
  };

  const handleCreateComposition = async () => {
    if (rawText === '' || phonetic === '') {
      return;
    }
    try {
      await createComposition(rawText, phonetic);
      setIsOpen(false);
    } catch (error) {
      console.error('Tạo composition thất bại:', error);
    }
  };

  const onSubmit =
    action === 'update' ? handleUpdateComposition : handleCreateComposition;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='h-fit'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Label className='text-sm my-2'>Bộ thủ</Label>
        <Input
          value={rawText}
          onChange={(e) => {
            setRawText(e.target.value);
          }}
        />
        <Label className='text-sm my-2'>Hán việt</Label>
        <Input
          value={phonetic}
          onChange={(e) => {
            setPhonetic(e.target.value);
          }}
        />
        <DialogFooter>
          <Button onClick={onSubmit} type='submit'>
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
