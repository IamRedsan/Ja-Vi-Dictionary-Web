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
import { Composition } from './composition-context';

export interface Kanji {
  _id: string;
  text: string;
  phonetic: string[];
  onyomi: string[];
  kunyomi: string[];
  stroke: number;
  jlpt_level: number;
  composition: Composition[];
  meaning: string;
  romanji: string[];
}

type DialogActionType = 'create' | 'update' | 'delete' | 'view';

interface KanjiContextType {
  kanji: Kanji;
  setKanji: React.Dispatch<React.SetStateAction<Kanji>>;
  setKanjiById: (_id?: string) => void;
  isOpenDialog: boolean;
  dialogAction: DialogActionType;
  setDialogAction: React.Dispatch<React.SetStateAction<DialogActionType>>;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  data: Kanji[];
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
  addKanji: () => Promise<void>;
  updateKanji: () => Promise<void>;
  deleteKanji: () => Promise<void>;
}

const KanjiContext = createContext<KanjiContextType | undefined>(undefined);

interface KanjiProviderProps {
  children: ReactNode;
}

const getEmtpyKanji = (): Kanji => {
  return {
    _id: '',
    text: '',
    phonetic: [''],
    onyomi: [''],
    kunyomi: [''],
    stroke: 0,
    jlpt_level: 5,
    composition: [],
    meaning: '',
    romanji: [''],
  };
};

export const KanjiProvider: React.FC<KanjiProviderProps> = ({ children }) => {
  const [kanji, setKanji] = useState(getEmtpyKanji());
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [data, setData] = useState<Kanji[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [dialogAction, setDialogAction] = useState<DialogActionType>('view');

  const setKanjiById = (_id?: string) => {
    if (_id) {
      setKanji(data.find((Kanji) => Kanji._id === _id) ?? getEmtpyKanji());
    } else {
      setKanji(getEmtpyKanji());
    }
  };

  const getKanjis = async () => {
    try {
      setLoading(true);
      const response = await authClient.get(
        `/kanjis/?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`
      );
      const { data, totalPages } = response.data.data;

      setData(data);
      setPageCount(totalPages);
    } catch (error) {
      console.error('Failed to load Kanjis:', error);
    } finally {
      setLoading(false);
    }
  };

  const addKanji = async () => {
    try {
      setLoading(true);
      await authClient.post('/kanjis', kanji);

      await getKanjis();

      setIsOpenDialog(false);
    } catch (error) {
      const e = error as AxiosError;
      const message = (e.response?.data as any)?.message as any;

      toast({
        title: 'Lỗi khi tạo hán tự. ',
        description: message ?? 'Lỗi không xác định.',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateKanji = async () => {
    if (
      !kanji.text ||
      !kanji.phonetic[0] ||
      !kanji.onyomi[0] ||
      !kanji.kunyomi[0] ||
      !kanji.meaning ||
      !kanji.romanji[0]
    ) {
      return;
    }

    try {
      setLoading(true);
      await authClient.put(`/kanjis/${kanji._id}`, kanji);

      await getKanjis();

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

  const deleteKanji = async () => {
    if (
      !kanji.text ||
      !kanji.phonetic[0] ||
      !kanji.onyomi[0] ||
      !kanji.kunyomi[0] ||
      !kanji.meaning ||
      !kanji.romanji[0]
    ) {
      return;
    }

    try {
      setLoading(true);
      await authClient.delete(`/kanjis/${kanji._id}`);

      await getKanjis();

      setIsOpenDialog(false);
    } catch (error) {
      const e = error as AxiosError;
      const message = (e.response?.data as any)?.message as any;

      toast({
        title: 'Lỗi khi xóa hán tự',
        description: message ?? 'Lỗi không xác định.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getKanjis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageIndex, pagination.pageSize]);

  return (
    <KanjiContext.Provider
      value={{
        kanji,
        data,
        loading,
        pagination,
        pageCount,
        setPagination,
        isOpenDialog,
        setIsOpenDialog,
        setKanjiById,
        setKanji,
        addKanji,
        dialogAction,
        setDialogAction,
        updateKanji,
        deleteKanji,
      }}>
      {children}
    </KanjiContext.Provider>
  );
};

export const useKanji = (): KanjiContextType => {
  const context = useContext(KanjiContext);
  if (!context) {
    throw new Error('useKanji must be used within an KanjiProvider');
  }
  return context;
};
