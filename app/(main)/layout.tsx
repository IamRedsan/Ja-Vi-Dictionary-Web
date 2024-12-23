'use client';

import AdminPanelLayout from '@/components/admin-panel/admin-panel-layout';
import { useAuth } from '@/context/auth-context';
import { redirect } from 'next/navigation';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (user === null) {
    redirect('/login');
  }

  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
