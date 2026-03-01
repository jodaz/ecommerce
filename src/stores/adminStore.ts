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
    }),
    {
      name: 'megaimport-admin-storage',
    }
  )
);
