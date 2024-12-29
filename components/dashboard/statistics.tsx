import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { LucideIcon } from 'lucide-react';

interface StatisticsProps {
  title: string;
  count: number;
  icon: LucideIcon;
  loading: boolean;
}

export function Statistics({
  title,
  count,
  icon: Icon,
  loading,
}: StatisticsProps) {
  return (
    <Card className='aspect-video flex items-center p-6'>
      <div className='flex-grow'>
        {loading ? (
          <>
            <Skeleton className='h-6 w-1/2 mb-4' />
            <Skeleton className='h-10 w-1/3' />
          </>
        ) : (
          <>
            <span className='text-lg font-bold block'>{title}</span>
            <span className='text-4xl font-bold mt-5 block'>{count}</span>
          </>
        )}
      </div>
      <div>
        {loading ? (
          <Skeleton className='h-10 w-10 rounded-full' />
        ) : (
          <span className='flex justify-center items-center p-2'>
            <Icon size={30} />
          </span>
        )}
      </div>
    </Card>
  );
}
