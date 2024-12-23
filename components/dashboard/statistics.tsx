import { Card } from '../ui/card';
import { LucideIcon } from 'lucide-react';

interface StatisticsProps {
  title: string;
  count: number;
  icon: LucideIcon;
}

export function Statistics({ title, count, icon: Icon }: StatisticsProps) {
  return (
    <Card className='aspect-video flex items-center p-6'>
      <div className='flex-grow'>
        <span className='text-lg font-bold block'>{title}</span>
        <span className='text-4xl font-bold mt-5 block'>{count}</span>
      </div>
      <div>
        <span className='flex justify-center items-center p-2'>
          <Icon size={30} />
        </span>
      </div>
    </Card>
  );
}
