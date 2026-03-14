-- Add has_page column to business_categories
ALTER TABLE public.business_categories
ADD COLUMN has_page BOOLEAN DEFAULT false NOT NULL;

COMMENT ON COLUMN public.business_categories.has_page IS 'Indicates if this category should have its own dedicated collection page (Crear colección)';
