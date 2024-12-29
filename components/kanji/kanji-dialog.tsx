import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { KanjiForm } from './kanji-form';
import { ScrollArea } from '../ui/scroll-area';
import { useKanji } from '@/context/kanji-context';
import { Loader2 } from 'lucide-react';

interface KanjiDialogProps {
  action: 'view' | 'update' | 'create';
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  description: string;
}

export function KanjiDialog({
  action,
  title,
  description,
  isOpen,
  setIsOpen,
}: KanjiDialogProps) {
  const { addKanji, loading, updateKanji, setIsOpenDialog } = useKanji();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='md:h-[90%] h-full md:min-w-[90%] min-w-full flex flex-col'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className='rounded-md flex-grow'>
          <div className='px-4'>
            <KanjiForm action={action} />
          </div>
        </ScrollArea>
        <DialogFooter>
          {!loading ? (
            <Button
              type='submit'
              onClick={() => {
                switch (action) {
                  case 'view':
                    setIsOpenDialog(false);
                    break;
                  case 'create':
                    addKanji();
                    break;
                  case 'update':
                    updateKanji();
                    break;
                }
              }}>
              {action === 'view' ? 'Xong' : 'Lưu'}
            </Button>
          ) : (
            <Button disabled>
              <Loader2 className='animate-spin' />
              Vui lòng đợi
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
