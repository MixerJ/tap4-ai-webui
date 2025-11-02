'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Pagination from 'rc-pagination';

import { cn } from '@/lib/utils';
import { objToQueryStr } from '@/lib/utils/stringUtils';

type BasePaginationProps = {
  route: string;
  subRoute?: string;
  currentPage: number;
  pageSize: number;
  firstPageRoute?: string;
  total: number;
  searchParamsKeys?: string[];
  className?: string;
};

function LinkTag({
  className,
  title,
  href,
  children,
}: {
  className?: string;
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      title={title}
      className={cn(
        'flex-center h-10 min-h-[44px] w-10 min-w-[44px] touch-manipulation rounded-xl border border-white/5 bg-slate-800/60 text-white/60 backdrop-blur-sm transition-all duration-300 hover:cursor-pointer hover:border-indigo-500/20 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 hover:text-white active:scale-95',
        className,
      )}
    >
      {children}
    </Link>
  );
}

function itemRender({
  page,
  type,
  element,
  route,
  currentPage,
}: {
  page: number;
  type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next';
  element: React.ReactNode;
  route: string;
  currentPage: number;
}) {
  if (type === 'page') {
    return (
      <LinkTag
        href={route}
        title={page.toString()}
        className={
          page === currentPage
            ? 'border-indigo-500/50 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white shadow-lg shadow-indigo-500/20'
            : ''
        }
      >
        {page}
      </LinkTag>
    );
  }
  if (type === 'prev') {
    return (
      <LinkTag href={route} title={type}>
        <ChevronLeft className='h-4 w-4' />
      </LinkTag>
    );
  }
  if (type === 'next') {
    return (
      <LinkTag href={route} title={type}>
        <ChevronRight className='h-4 w-4' />
      </LinkTag>
    );
  }
  if (type === 'jump-prev' || type === 'jump-next') {
    return <div>...</div>;
  }
  return element;
}

export default function BasePagination({
  route,
  subRoute = '',
  firstPageRoute,
  currentPage,
  pageSize,
  total,
  searchParamsKeys,
  className,
}: BasePaginationProps) {
  const searchParams = useSearchParams();

  const getRoute = (nextNum: number): string => {
    let routeStr = `${route}${subRoute}/${nextNum}`;

    if (nextNum === 1 || nextNum === 0) {
      routeStr = firstPageRoute || route;
    }

    const searchParamsObj: Record<string, string | null> = {};
    searchParamsKeys?.forEach((key) => {
      searchParamsObj[key] = searchParams.get(key);
    });

    return objToQueryStr(routeStr, searchParamsObj);
  };

  return (
    <Pagination
      className={cn('[&>li]:flex-center flex gap-3 text-xs text-white', className)}
      pageSize={pageSize}
      defaultCurrent={currentPage}
      total={total}
      showLessItems
      itemRender={(page, type, element) => itemRender({ page, type, element, route: getRoute(page), currentPage })}
      locale={{
        next_page: 'next',
        prev_page: 'prev',
      }}
      prevIcon={<ChevronLeft className='h-4 w-4' />}
      nextIcon={<ChevronRight className='h-4 w-4' />}
    />
  );
}
