'use client';

import { authClient } from '@/client/axiosClient';
import { useToast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useAuth } from './auth-context';

export interface Composition {
  _id: string;
  raw_text: string;
  phonetic: string;
}

interface CompositionContextType {
  compositions: Composition[];
  getAllCompositions: () => Promise<Composition[]>;
  createComposition: (raw_text: string, phonetic: string) => Promise<void>;
  updateComposition: (updatedComp: Composition) => Promise<void>;
  deleteComposition: (compId: string) => Promise<void>;
  getCompositionById: (compId: string) => Promise<Composition | undefined>;
  getCompositionByRawText: (
    rawText: string
  ) => Promise<Composition | undefined>;
}

interface CompositionProviderProps {
  children: ReactNode;
}

const CompositionContext = createContext<CompositionContextType | undefined>(
  undefined
);

export const CompositionProvider: React.FC<CompositionProviderProps> = ({
  children,
}) => {
  const [compositions, setCompositions] = useState<Composition[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();
  const getAllCompositions = async () => {
    try {
      const response = await authClient.get('/compositions');
      setCompositions(response.data.data.data);
      return response.data.data.data;
    } catch (err) {
      const e = err as AxiosError;
      const message = (e.response?.data as any)?.message;
      toast({
        title: 'Lấy thông tin bộ thủ thất bại',
        description: message ?? 'Lỗi không xác định.',
      });
    }
  };

  const createComposition = async (raw_text: string, phonetic: string) => {
    try {
      const response = await authClient.post('/compositions', {
        raw_text: raw_text,
        phonetic: phonetic,
      });
      const composition = response.data.data;
      if (composition) {
        setCompositions((prevCompositions) => [
          ...prevCompositions,
          composition,
        ]);
        toast({
          title: 'Thành công',
          description: 'Thêm bộ thủ mới thành công.',
        });
      } else {
        throw new Error('Dữ liệu trả về không hợp lệ.');
      }
    } catch (err) {
      const e = err as AxiosError;
      const message = (e.response?.data as any)?.message;
      toast({
        title: 'Thêm bộ thủ thất bại',
        description: message ?? 'Lỗi không xác định.',
      });
    }
  };

  const updateComposition = async (updatedComp: Composition) => {
    try {
      const response = await authClient.put(
        `/compositions/${updatedComp._id}`,
        {
          raw_text: updatedComp.raw_text,
          phonetic: updatedComp.phonetic,
        }
      );
      const composition = response.data.data;
      if (composition) {
        setCompositions((prevCompositions) =>
          prevCompositions.map((comp) =>
            comp._id === updatedComp._id ? composition : comp
          )
        );
        toast({
          title: 'Chúc mừng',
          description: 'Chỉnh sửa bộ thủ thành công.',
        });
      } else {
        throw new Error('Dữ liệu trả về không hợp lệ.');
      }
    } catch (err) {
      const e = err as AxiosError;
      const message = (e.response?.data as any)?.message;
      toast({
        title: 'Chỉnh sửa bộ thủ thất bại',
        description: message ?? 'Lỗi không xác định.',
      });
    }
  };

  const deleteComposition = async (compId: string) => {
    try {
      await authClient.delete(`/compositions/${compId}`);
      setCompositions((prevCompositions) =>
        prevCompositions.filter((comp) => comp._id !== compId)
      );
      toast({
        title: 'Chúc mừng',
        description: 'Xoá bộ thủ thành công.',
      });
    } catch (err) {
      const e = err as AxiosError;
      const message = (e.response?.data as any)?.message;
      toast({
        title: 'Xoá bộ thủ thất bại',
        description: message ?? 'Lỗi không xác định.',
      });
    }
  };

  const getCompositionById = async (compId: string) => {
    try {
      const response = await authClient.get(`/compositions/${compId}`);
      const composition: Composition = response.data.data;
      return composition;
    } catch (err) {
      const e = err as AxiosError;
      const message = (e.response?.data as any)?.message;
      toast({
        title: 'Lấy bộ thủ theo mã thất bại',
        description: message ?? 'Lỗi không xác định.',
      });
    }
  };

  const getCompositionByRawText = async (rawText: string) => {
    try {
      const response = await authClient.get(`/compositions/${rawText}`);
      const composition: Composition = response.data.data;
      return composition;
    } catch (err) {
      const e = err as AxiosError;
      const message = (e.response?.data as any)?.message;
      toast({
        title: 'Lấy bộ thủ theo bộ thất bại',
        description: message ?? 'Lỗi không xác định.',
      });
    }
  };

  useEffect(() => {
    if (user) {
      getAllCompositions();
    }
  }, [user]);

  return (
    <CompositionContext.Provider
      value={{
        compositions,
        getAllCompositions,
        createComposition,
        deleteComposition,
        updateComposition,
        getCompositionById,
        getCompositionByRawText,
      }}>
      {children}
    </CompositionContext.Provider>
  );
};

export const useComposition = (): CompositionContextType => {
  const context = useContext(CompositionContext);
  if (!context) {
    throw new Error(
      'useComposition must be used within an CompositionProvider'
    );
  }
  return context;
};
