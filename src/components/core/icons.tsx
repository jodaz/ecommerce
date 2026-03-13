'use client';

import { Icon as Iconify } from '@iconify/react';
import { cn } from '@/lib/utils';

interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  icon: string;
}

export function Icon({ icon, className, ...props }: IconProps) {
  return (
    <Iconify
      icon={icon}
      className={cn('h-4 w-4 shrink-0', className)}
      {...props}
    />
  );
}

// Payment Icons from simple-icons
export const PayPalIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="simple-icons:paypal" className={className} {...props} />
);

export const ZelleIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="simple-icons:zelle" className={className} {...props} />
);

export const BinanceIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="simple-icons:binance" className={className} {...props} />
);

export const PhoneIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:phone" className={className} {...props} />
);

export const SmartphoneIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:smartphone" className={className} {...props} />
);

export const BankIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:landmark" className={className} {...props} />
);

// Lucide equivalent icons via iconify (e.g. mdi, lucide sets)
export const DashboardIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:layout-dashboard" className={className} {...props} />
);

export const ShoppingBagIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:shopping-bag" className={className} {...props} />
);

export const PackageIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:package" className={className} {...props} />
);

export const SettingsIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:settings" className={className} {...props} />
);

export const TagIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:tag" className={className} {...props} />
);

export const PlusIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:plus" className={className} {...props} />
);

export const SearchIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:search" className={className} {...props} />
);

export const UserIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:user" className={className} {...props} />
);

export const XIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:x" className={className} {...props} />
);

export const ChevronRightIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:chevron-right" className={className} {...props} />
);

export const ChevronLeftIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:chevron-left" className={className} {...props} />
);

export const LogOutIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:log-out" className={className} {...props} />
);

export const StoreIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:store" className={className} {...props} />
);

export const MenuIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:menu" className={className} {...props} />
);

export const CheckIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:check" className={className} {...props} />
);

export const LayoutIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:layout" className={className} {...props} />
);

export const BarChartIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:bar-chart-3" className={className} {...props} />
);

export const GlobeIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:globe" className={className} {...props} />
);

export const CreditCardIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:credit-card" className={className} {...props} />
);

export const ShieldCheckIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:shield-check" className={className} {...props} />
);

export const PaintbrushIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:paintbrush" className={className} {...props} />
);

export const CoinsIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:coins" className={className} {...props} />
);

export const ShoppingCartIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:shopping-cart" className={className} {...props} />
);

export const TrendingUpIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:trending-up" className={className} {...props} />
);

export const DollarSignIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:dollar-sign" className={className} {...props} />
);

export const UsersIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:users" className={className} {...props} />
);

export const AlertCircleIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:alert-circle" className={className} {...props} />
);

export const ArrowLeftIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:arrow-left" className={className} {...props} />
);

export const PencilIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:pencil" className={className} {...props} />
);

export const Trash2Icon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:trash-2" className={className} {...props} />
);

export const ExternalLinkIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:external-link" className={className} {...props} />
);

export const Loader2Icon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:loader-2" className={className} {...props} />
);

export const UploadCloudIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:upload-cloud" className={className} {...props} />
);

export const FacebookIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:facebook" className={className} {...props} />
);

export const InstagramIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:instagram" className={className} {...props} />
);

export const TwitterIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="lucide:twitter" className={className} {...props} />
);

export const TikTokIcon = ({ className, ...props }: Omit<IconProps, 'icon'>) => (
  <Icon icon="simple-icons:tiktok" className={className} {...props} />
);
