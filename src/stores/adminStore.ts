import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'owner' | 'administrative';

export interface Profile {
  id: string;
  business_id: string | null;
  full_name: string | null;
  role: UserRole;
  assigned_store_id: string | null;
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
}

export interface BusinessSettings {
  business_id: string;
  description: string;
  phone: string;
  facebook_url: string;
  instagram_url: string;
  tiktok_url: string;
  twitter_url: string;
  whatsapp_number: string;
  support_email: string;
  currency_code: string;
  theme_config: any;
}

export type PaymentMethodType = 'PayPal' | 'Zelle' | 'Binance' | 'Pago Móvil' | 'Transferencia Bancaria';

export interface BusinessPaymentMethod {
  id: string;
  business_id: string;
  type: PaymentMethodType;
  label: string;
  details: string;
  isActive: boolean;
}

export interface Store {
  id: string;
  business_id: string;
  name: string;
  address: string;
  phone: string;
  is_main: boolean;
  is_active: boolean;
}

export interface Category {
  id: string;
  name: string;
  has_page: boolean;
}

export interface Subscription {
  plan_id: string;
  plan_name: string;
  status: 'active' | 'expired' | 'pending_activation' | 'cancelled';
  end_date: string | null;
  max_stores: number;
}

interface AdminState {
  // Auth & Context
  isAuthenticated: boolean;
  currentProfile: Profile | null;
  activeBusiness: Business | null;
  businessSettings: BusinessSettings | null;
  activeSubscription: Subscription | null;
  activeStore: Store | null;
  
  login: (profile: Profile, business: Business | null, settings: BusinessSettings | null, subscription?: Subscription | null) => void;
  logout: () => void;
  setActiveStore: (store: Store) => void;
  updateBusinessSettings: (settings: Partial<BusinessSettings>) => void;
  setSubscription: (subscription: Subscription | null) => void;

  // Stores (Branches)
  stores: Store[];
  addStore: (store: Omit<Store, 'id'>) => void;
  updateStore: (id: string, store: Partial<Store>) => void;
  deleteStore: (id: string) => void;

  // Users (Profiles)
  profiles: Profile[];
  addProfile: (profile: Omit<Profile, 'id'>) => void;
  updateProfile: (id: string, profile: Partial<Profile>) => void;
  deleteProfile: (id: string) => void;

  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      // INITIAL STATE
      isAuthenticated: false,
      currentProfile: null,
      activeBusiness: null,
      businessSettings: null,
      activeSubscription: null,
      activeStore: null,
      
      // Default dummy data for showcase
      profiles: [
        { id: '1', business_id: 'b1', full_name: 'Admin Demo', role: 'owner', assigned_store_id: null }
      ],
      stores: [
        { id: 's1', business_id: 'b1', name: 'Sucursal Central', address: 'Caracas', phone: '0412', is_main: true, is_active: true },
        { id: 's2', business_id: 'b1', name: 'Sucursal Express', address: 'Chacao', phone: '0414', is_main: false, is_active: true },
      ],
      categories: [
        { id: '1', name: 'Línea Blanca', has_page: true },
        { id: '2', name: 'Electrónica', has_page: true },
      ],

      // CONTEXT ACTIONS
      login: (profile, business, settings, subscription) => set({ 
        isAuthenticated: true, 
        currentProfile: profile, 
        activeBusiness: business,
        businessSettings: settings,
        activeSubscription: subscription || null
      }),
      logout: () => set({ 
        isAuthenticated: false, 
        currentProfile: null, 
        activeBusiness: null, 
        businessSettings: null, 
        activeSubscription: null,
        activeStore: null 
      }),
      setActiveStore: (store) => set({ activeStore: store }),
      updateBusinessSettings: (updatedFields) => set((state) => ({
        businessSettings: state.businessSettings ? { ...state.businessSettings, ...updatedFields } : null
      })),
      setSubscription: (subscription) => set({ activeSubscription: subscription }),

      // STORE ACTIONS
      addStore: (store) => set((state) => ({
        stores: [...state.stores, { ...store, id: Math.random().toString(36).substr(2, 9) }]
      })),
      updateStore: (id, updatedFields) => set((state) => ({
        stores: state.stores.map(s => s.id === id ? { ...s, ...updatedFields } : s)
      })),
      deleteStore: (id) => set((state) => ({
        stores: state.stores.filter(s => s.id !== id)
      })),

      // PROFILE ACTIONS
      addProfile: (profile) => set((state) => ({
        profiles: [...state.profiles, { ...profile, id: Math.random().toString(36).substr(2, 9) }]
      })),
      updateProfile: (id, updatedFields) => set((state) => ({
        profiles: state.profiles.map(p => p.id === id ? { ...p, ...updatedFields } : p)
      })),
      deleteProfile: (id) => set((state) => ({
        profiles: state.profiles.filter(p => p.id !== id)
      })),

      // CATEGORY ACTIONS
      addCategory: (category) => set((state) => ({
        categories: [...state.categories, { ...category, id: Math.random().toString(36).substr(2, 9) }]
      })),
      updateCategory: (id, updatedFields) => set((state) => ({
        categories: state.categories.map(c => c.id === id ? { ...c, ...updatedFields } : c)
      })),
      deleteCategory: (id) => set((state) => ({
        categories: state.categories.filter(c => c.id !== id)
      })),

    }),
    {
      name: 'megaimport-admin-storage',
    }
  )
);
