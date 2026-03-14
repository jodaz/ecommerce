'use client';

import React from 'react';
import { formatUsd, formatVes } from '@/lib/currency-shared';
import { cn } from '@/lib/utils';

interface PriceDisplayClientProps {
  amount: number;
  exchangeRate: number;
  className?: string;
  vesClassName?: string;
}

export function PriceDisplayClient({ 
  amount, 
  exchangeRate, 
  className, 
  vesClassName 
}: PriceDisplayClientProps) {
  const vesAmount = amount * exchangeRate;

  return (
    <div className={cn("flex flex-col", className)}>
      <span className="font-bold tracking-tight text-zinc-900 leading-none">
        {formatUsd(amount)}
      </span>
      <span className={cn("text-xs font-semibold text-zinc-400 mt-1", vesClassName)}>
        Bs. {formatVes(vesAmount)}
      </span>
    </div>
  );
}
