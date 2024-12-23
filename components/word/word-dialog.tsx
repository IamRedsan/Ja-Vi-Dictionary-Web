import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { WordForm } from './word-form';
import { ScrollArea } from '../ui/scroll-area';
import { ReactNode } from 'react';

interface WordDialogProps {
  action: 'view' | 'update' | 'create';
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  description: string;
}

export function WordDialog({
  action,
  title,
  description,
  isOpen,
  setIsOpen,
}: WordDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='md:h-[90%] h-full md:min-w-[90%] min-w-full'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className='rounded-md p-4'>
          <WordForm action={action} />
        </ScrollArea>
        <DialogFooter>
          <Button type='submit'>{action === 'view' ? 'Xong' : 'Lưu'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
