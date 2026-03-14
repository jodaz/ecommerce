'use client';

import { useEffect } from 'react';
import { useAdminStore, Profile, Business, BusinessSettings, Subscription } from '@/stores/adminStore';

interface AdminStoreHydratorProps {
  profile: Profile;
  business: Business;
  settings: BusinessSettings | null;
  subscription: Subscription | null;
}

export function AdminStoreHydrator({ profile, business, settings, subscription }: AdminStoreHydratorProps) {
  const login = useAdminStore(state => state.login);
  
  useEffect(() => {
    // Only hydrate if data has changed or if not authenticated
    // We can be more specific here if needed
    login(profile, business, settings, subscription);
  }, [profile.id, business.id, subscription?.plan_id, login, settings]);

  return null;
}
