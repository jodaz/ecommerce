---
name: react-admin-dashboard
description: Generates a striking, professional, and fully responsive React Admin Dashboard for order and inventory management using Tailwind CSS. Use this skill when the user requests a new admin dashboard, internal tool, or inventory management interface.
---

# React Admin Dashboard Generator

This skill guides the creation of a professional, fully responsive React Admin Dashboard for order and inventory management using Tailwind CSS. 

When triggered, you must follow these architecture, interaction, and styling rules strictly to generate the dashboard.

## 1. Architecture & Interaction Rules

- **Authentication:** All admin routes must be protected by an authentication system. Unauthenticated users are redirected to a dedicated `/admin/login` page.
- **Pages over Modals:** Strictly use dedicated, full-page views for all "Create" and "Edit" actions (e.g., a specific page for creating or editing a product).
- **Modals:** Reserve Modals ONLY for destructive actions (e.g., a "Delete" confirmation popup).

## 2. Layout Strategy (Top Navbar)

- **Fixed Top Navbar:** A fixed top horizontal navigation bar.
- **Brand Logo:** The Brand Logo/Name is on the far left.
- **Main Navigation Tabs:** The main navigation tabs are aligned horizontally on the far right: `Inicio`, `Pedidos`, `Inventario`, and `Configuración`.
- **Main Content Area:** Sits below the navbar, taking up the full width.

## 3. Behavior & Views

Implement state or routing to handle navigation between main views and sub-pages.

### 'Inicio' (Dashboard)
- 3 KPI cards (`Ventas Hoy`, `Órdenes Pendientes`, `Alertas Stock`) at the top.
- Below the KPIs, display a weekly sales chart and a recent activity list.

### 'Pedidos' (Orders)
- A full-width Kanban board with columns (`Nuevo`, `Preparando`, `Entregado`).
- Populate with dummy order cards.

### 'Inventario' (Inventory)
- A data table for products.
- **Columns:** Image (small thumbnail), Name, Categories, Stock, and Delivery (a visual indicator like a checkmark or "Yes/No" pill).
- **Category Badges:** Display categories as small, colorful inline badges (rounded pills). 
  - *Crucial rule:* Categories can optionally have a dedicated page (a `has_page` boolean). If a category has a page, display a small "link" or "external" icon inside or next to its badge.
- **Actions:** 
  - Add a "New Product" primary button aligned right. Clicking this switches the view to the "Create/Edit Product" page.
  - Add "Edit" and "Delete" action icons on each row.

### 'Create/Edit Product' Page
- A dedicated form page with the following exact fields:
  - **Image:** An image upload drag-and-drop area with a preview.
  - **Name:** Standard text input.
  - **Description:** A textarea for longer text.
  - **Stock:** A numeric input for the quantity in existence.
  - **Available for Delivery:** A sleek boolean Toggle/Switch component.
  - **Categories:** A multi-select or tagging input for categories.
- Include primary "Save" and secondary "Cancel" (Back) buttons.

### 'Configuración' (Settings)
- A form view with Company Profile (Name, Description, Logo upload).
- Optional Social Media Links (Facebook, TikTok, Instagram, X, LinkedIn).
- A section for managing "Categorías" (Categories) as a data table.
  - **Categorías Columns:** Name, Shows as Page (`has_page` boolean indicator), and Actions.
  - **Categorías Actions:** Add a "New Category" button. Edit and Delete action icons on each row.
- A section for managing "Usuarios" (Users) as a data table.
  - **Usuarios Columns:** Name, Email, Role (e.g., Admin, Editor), and Actions.
  - **Usuarios Actions:** Add a "New User" button. Edit and Delete action icons on each row.
- Include a "Guardar Cambios" button for the main company profile.

### 'Create/Edit Category' Modal or Sub-page
- A dedicated form (can be a modal or sub-page within settings) with the following exact fields:
  - **Name:** Standard text input.
  - **Shows as Page (`has_page`):** A sleek boolean Toggle/Switch component. If true, the category must be listed as a page in the website.
- Include primary "Save" and secondary "Cancel" (Back) buttons.

### 'Create/Edit User' Modal or Sub-page
- A dedicated form with the following exact fields:
  - **Name:** Standard text input.
  - **Email:** Email input.
  - **Role:** Select/Dropdown (e.g., Administrador, Editor).
  - **Password:** Password input (only required on creation, optional on edit).
- Include primary "Save" and secondary "Cancel" (Back) buttons.

### 'Login' Page
- A clean, centered, premium minimalist login card.
- Standard Email and Password fields.
- Primary "Ingresar" button.

## 4. Styling

- **Aesthetic:** Modern, professional, and visually striking. Refined color palette, high contrast text.
- **UI Elements:** Clean card designs with subtle shadows and rounded corners. Use modern form UI elements (custom toggles, styled file uploads).
- **Responsive:** Ensure the layout adapts gracefully to mobile screens.
