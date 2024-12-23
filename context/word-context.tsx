'use client';

import { authClient } from '@/client/axiosClient';
import { useToast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface Word {
  _id: string;
  text: string;
  hiragana: string[];
  meaning: {
    type: string;
    content: string;
  }[];
  examples: {
    text: string;
    hiragana: string;
    meaning: string;
  }[];
}

type DialogActionType = 'create' | 'update' | 'delete' | 'view';

interface WordContextType {
  word: Word;
  setWord: React.Dispatch<React.SetStateAction<Word>>;
  setWordById: (_id?: string) => void;
  isOpenDialog: boolean;
  dialogAction: DialogActionType;
  setDialogAction: React.Dispatch<React.SetStateAction<DialogActionType>>;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  data: Word[];
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
  pageCount: number;
  loading: boolean;
  addWord: () => Promise<void>;
  updateWord: () => Promise<void>;
  deleteWord: () => Promise<void>;
}

const WordContext = createContext<WordContextType | undefined>(undefined);

interface WordProviderProps {
  children: ReactNode;
}

const getEmtpyWord = (): Word => {
  return {
    _id: '',
    text: '',
    hiragana: [''],
    meaning: [{ type: '', content: '' }],
    examples: [],
  };
};

export const WordProvider: React.FC<WordProviderProps> = ({ children }) => {
  const [word, setWord] = useState(getEmtpyWord());
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [data, setData] = useState<Word[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [dialogAction, setDialogAction] = useState<DialogActionType>('view');

  const setWordById = (_id?: string) => {
    if (_id) {
      setWord(data.find((word) => word._id === _id) ?? getEmtpyWord());
    } else {
      setWord(getEmtpyWord());
    }
  };

  const getWords = async () => {
    try {
      setLoading(true);
      const response = await authClient.get(
        `/words/?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`
      );
      const { data, totalPages } = response.data.data;

      setData(data);
      setPageCount(totalPages);
    } catch (error) {
      console.error('Failed to load words:', error);
    } finally {
      setLoading(false);
    }
  };

  const addWord = async () => {
    if (
      !word.text ||
      !word.hiragana[0] ||
      !word.meaning[0].content ||
      !word.meaning[0].type
    ) {
      return;
    }

    try {
      setLoading(true);
      await authClient.post('/words', word);

      await getWords();

      setIsOpenDialog(false);
    } catch (error) {
      const e = error as AxiosError;
      const message = (e.response?.data as any)?.message as any;

      toast({
        title: 'Lỗi khi tạo từ vựng',
        description: message ?? 'Lỗi không xác định.',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateWord = async () => {
    if (
      !word.text ||
      !word.hiragana[0] ||
      !word.meaning[0].content ||
      !word.meaning[0].type
    ) {
      return;
    }

    try {
      setLoading(true);
      await authClient.put(`/words/${word._id}`, word);

      await getWords();

      setIsOpenDialog(false);
    } catch (error) {
      const e = error as AxiosError;
      const message = (e.response?.data as any)?.message as any;

      toast({
        title: 'Lỗi khi cập nhật từ vựng',
        description: message ?? 'Lỗi không xác định.',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteWord = async () => {
    if (
      !word.text ||
      !word.hiragana[0] ||
      !word.meaning[0].content ||
      !word.meaning[0].type
    ) {
      return;
    }

    try {
      setLoading(true);
      await authClient.delete(`/words/${word._id}`);

      await getWords();

      setIsOpenDialog(false);
    } catch (error) {
      const e = error as AxiosError;
      const message = (e.response?.data as any)?.message as any;

      toast({
        title: 'Lỗi khi xóa từ vựng',
        description: message ?? 'Lỗi không xác định.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageIndex, pagination.pageSize]);

  return (
    <WordContext.Provider
      value={{
        word,
        data,
        loading,
        pagination,
        pageCount,
        setPagination,
        isOpenDialog,
        setIsOpenDialog,
        setWordById,
        setWord,
        addWord,
        dialogAction,
        setDialogAction,
        updateWord,
        deleteWord,
      }}>
      {children}
    </WordContext.Provider>
  );
};

export const useWord = (): WordContextType => {
  const context = useContext(WordContext);
  if (!context) {
    throw new Error('useWord must be used within an WordProvider');
  }
  return context;
};
