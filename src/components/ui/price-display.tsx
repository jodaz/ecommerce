import React from 'react';
import { getExchangeRates, formatUsd, formatVes } from '@/lib/currency';
import { cn } from '@/lib/utils';

interface PriceDisplayProps {
  amount: number;
  className?: string;
  vesClassName?: string;
}

export async function PriceDisplay({ amount, className, vesClassName }: PriceDisplayProps) {
  const rates = await getExchangeRates();
  const conversionRate = rates?.USD || 1;
  const vesAmount = amount * conversionRate;

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
