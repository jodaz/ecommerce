import Link from 'next/link';
import { ExternalLink, Check, X, Pencil, Trash2, Image as ImageIcon } from 'lucide-react';

export default function AdminInventoryPage() {
  const products = [
    {
      id: 'P001',
      name: 'Nevera Daewoo 12 Pies',
      stock: 5,
      delivery: true,
      categories: [
        { name: 'Línea Blanca', has_page: true },
        { name: 'Electrodomésticos', has_page: false }
      ]
    },
    {
      id: 'P002',
      name: 'Cocina Mabe 4 Hornillas',
      stock: 0,
      delivery: false,
      categories: [
        { name: 'Línea Blanca', has_page: true }
      ]
    },
    {
      id: 'P003',
      name: 'Televisor Samsung 50" 4K',
      stock: 12,
      delivery: true,
      categories: [
        { name: 'Electrónica', has_page: true },
        { name: 'Hogar', has_page: false }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventario</h1>
          <p className="text-zinc-500 mt-2">Gestión de productos y stock</p>
        </div>
        <Link 
          href="/admin/inventory/new"
          className="bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shrink-0"
        >
          Nuevo Producto
        </Link>
      </div>

      <div className="bg-white border border-zinc-200 overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="border-b border-zinc-200 bg-zinc-50 uppercase tracking-widest text-xs font-semibold text-zinc-500">
            <tr>
              <th className="px-6 py-4 w-16">Imagen</th>
              <th className="px-6 py-4">Producto</th>
              <th className="px-6 py-4">Categorías</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Envío</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-zinc-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center border border-zinc-200">
                    <ImageIcon className="w-6 h-6 text-zinc-300" />
                  </div>
                </td>
                <td className="px-6 py-4 font-bold">{p.name}</td>
                <td className="px-6 py-4 space-x-2">
                  {p.categories.map((cat, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center gap-1 bg-zinc-100 border border-zinc-200 px-3 py-1 rounded-full text-xs font-semibold"
                    >
                      {cat.name}
                      {cat.has_page && <ExternalLink className="w-3 h-3 text-zinc-500" />}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4">
                  <span className={`font-bold ${p.stock === 0 ? 'text-red-600' : 'text-black'}`}>
                    {p.stock}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {p.delivery ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-black text-white rounded-full">
                      <Check className="w-4 h-4" />
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-zinc-100 border border-zinc-200 text-zinc-400 rounded-full">
                      <X className="w-4 h-4" />
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-zinc-500 hover:text-black transition-colors" title="Editar">
                    <Pencil className="w-5 h-5 inline-block" />
                  </button>
                  <button className="text-zinc-500 hover:text-red-600 transition-colors" title="Eliminar">
                    <Trash2 className="w-5 h-5 inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
