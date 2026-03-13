import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'Admin' | 'Editor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Category {
  id: string;
  name: string;
  has_page: boolean;
}

export type PaymentMethodType = 'PayPal' | 'Zelle' | 'Binance' | 'Pago Móvil' | 'Transferencia Bancaria';

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  label: string;
  details: string;
  isActive: boolean;
}

interface AdminState {
  // Auth
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;

  // Users
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;

  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Payment Methods
  paymentMethods: PaymentMethod[];
  addPaymentMethod: (pm: Omit<PaymentMethod, 'id'>) => void;
  updatePaymentMethod: (id: string, pm: Partial<PaymentMethod>) => void;
  deletePaymentMethod: (id: string) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      // INITIAL STATE
      isAuthenticated: false,
      currentUser: null,
      
      // Default dummy data for showcase
      users: [
        { id: '1', name: 'Admin Principal', email: 'admin@megaimport.com', role: 'Admin' }
      ],
      categories: [
        { id: '1', name: 'Línea Blanca', has_page: true },
        { id: '2', name: 'Electrónica', has_page: true },
        { id: '3', name: 'Hogar', has_page: false },
      ],
      paymentMethods: [
        { id: '1', type: 'Zelle', label: 'Zelle Principal', details: 'pagos@ejemplo.com', isActive: true },
        { id: '2', type: 'Pago Móvil', label: 'Banesco', details: '0412-1234567, V-12345678, 0102', isActive: true },
      ],

      // AUTH ACTIONS
      login: (user) => set({ isAuthenticated: true, currentUser: user }),
      logout: () => set({ isAuthenticated: false, currentUser: null }),

      // USER ACTIONS
      addUser: (user) => set((state) => ({
        users: [...state.users, { ...user, id: Math.random().toString(36).substr(2, 9) }]
      })),
      updateUser: (id, updatedFields) => set((state) => ({
        users: state.users.map(u => u.id === id ? { ...u, ...updatedFields } : u)
      })),
      deleteUser: (id) => set((state) => ({
        users: state.users.filter(u => u.id !== id)
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

      // PAYMENT METHOD ACTIONS
      addPaymentMethod: (pm) => set((state) => ({
        paymentMethods: [...state.paymentMethods, { ...pm, id: Math.random().toString(36).substr(2, 9) }]
      })),
      updatePaymentMethod: (id, updatedFields) => set((state) => ({
        paymentMethods: state.paymentMethods.map(p => p.id === id ? { ...p, ...updatedFields } : p)
      })),
      deletePaymentMethod: (id) => set((state) => ({
        paymentMethods: state.paymentMethods.filter(p => p.id !== id)
      })),
    }),
    {
      name: 'megaimport-admin-storage',
    }
  )
);
