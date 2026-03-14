export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      businesses: {
        Row: {
          id: string
          name: string
          slug: string
          logo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          logo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      business_settings: {
        Row: {
          business_id: string
          description: string | null
          phone: string | null
          facebook_url: string | null
          instagram_url: string | null
          tiktok_url: string | null
          twitter_url: string | null
          whatsapp_number: string | null
          support_email: string | null
          currency_code: string
          theme_config: Json
          updated_at: string
        }
        Insert: {
          business_id: string
          description?: string | null
          phone?: string | null
          facebook_url?: string | null
          instagram_url?: string | null
          tiktok_url?: string | null
          twitter_url?: string | null
          whatsapp_number?: string | null
          support_email?: string | null
          currency_code?: string
          theme_config?: Json
          updated_at?: string
        }
        Update: {
          business_id?: string
          description?: string | null
          phone?: string | null
          facebook_url?: string | null
          instagram_url?: string | null
          tiktok_url?: string | null
          twitter_url?: string | null
          whatsapp_number?: string | null
          support_email?: string | null
          currency_code?: string
          theme_config?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_settings_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
      business_payment_methods: {
        Row: {
          id: string
          business_id: string
          type: string
          label: string
          details: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          type: string
          label: string
          details: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          type?: string
          label?: string
          details?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_payment_methods_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
      stores: {
        Row: {
          id: string
          business_id: string
          name: string
          address: string | null
          phone: string | null
          is_main: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          name: string
          address?: string | null
          phone?: string | null
          is_main?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          name?: string
          address?: string | null
          phone?: string | null
          is_main?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stores_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          business_id: string | null
          full_name: string | null
          role: 'owner' | 'administrative'
          assigned_store_id: string | null
          created_at: string
        }
        Insert: {
          id: string
          business_id?: string | null
          full_name?: string | null
          role: 'owner' | 'administrative'
          assigned_store_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          business_id?: string | null
          full_name?: string | null
          role?: 'owner' | 'administrative'
          assigned_store_id?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_assigned_store_id_fkey"
            columns: ["assigned_store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          }
        ]
      }
      business_categories: {
        Row: {
          id: string
          business_id: string
          name: string
          slug: string
          has_page: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          name: string
          slug: string
          has_page?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          name?: string
          slug?: string
          has_page?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_categories_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
      business_products: {
        Row: {
          id: string
          business_id: string
          category_id: string | null
          name: string
          slug: string
          description: string | null
          base_price: number
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          category_id?: string | null
          name: string
          slug: string
          description?: string | null
          base_price: number
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          category_id?: string | null
          name?: string
          slug?: string
          description?: string | null
          base_price?: number
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_products_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "business_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      store_inventory: {
        Row: {
          id: string
          store_id: string
          product_id: string
          stock: number
        }
        Insert: {
          id?: string
          store_id: string
          product_id: string
          stock: number
        }
        Update: {
          id?: string
          store_id?: string
          product_id?: string
          stock?: number
        }
        Relationships: [
          {
            foreignKeyName: "store_inventory_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "business_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_inventory_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          }
        ]
      }
      global_exchange_rates: {
        Row: {
          id: string
          currency: string
          rate: number
          last_synced_at: string
        }
        Insert: {
          id?: string
          currency: string
          rate: number
          last_synced_at?: string
        }
        Update: {
          id?: string
          currency?: string
          rate?: number
          last_synced_at?: string
        }
        Relationships: []
      }
      business_orders: {
        Row: {
          id: string
          business_id: string
          customer_name: string
          customer_id_number: string
          customer_phone: string
          customer_address: string
          total_amount: number
          payment_method_id: string | null
          payment_reference: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          customer_name: string
          customer_id_number: string
          customer_phone: string
          customer_address: string
          total_amount: number
          payment_method_id?: string | null
          payment_reference?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          customer_name?: string
          customer_id_number?: string
          customer_phone?: string
          customer_address?: string
          total_amount?: number
          payment_method_id?: string | null
          payment_reference?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_orders_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_orders_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "business_payment_methods"
            referencedColumns: ["id"]
          }
        ]
      }
      business_order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "business_order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "business_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "business_products"
            referencedColumns: ["id"]
          }
        ]
      }
      inventory_logs: {
        Row: {
          id: string
          business_id: string
          store_id: string
          product_id: string
          order_id: string | null
          user_id: string | null
          change_amount: number
          previous_quantity: number
          new_quantity: number
          reason: string
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          business_id: string
          store_id: string
          product_id: string
          order_id?: string | null
          user_id?: string | null
          change_amount: number
          previous_quantity: number
          new_quantity: number
          reason: string
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          store_id?: string
          product_id?: string
          order_id?: string | null
          user_id?: string | null
          change_amount?: number
          previous_quantity?: number
          new_quantity?: number
          reason?: string
          metadata?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_logs_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_logs_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_logs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "business_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_logs_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "business_orders"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
