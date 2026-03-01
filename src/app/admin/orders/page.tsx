import React from 'react';

export default function AdminOrdersPage() {
  const columns = [
    { title: 'Nuevo', status: 'new' },
    { title: 'Preparando', status: 'preparing' },
    { title: 'Entregado', status: 'delivered' },
  ];

  const dummyOrders = [
    { id: '1024', customer: 'Carlos Mendoza', items: 3, total: '$145.00', status: 'new' },
    { id: '1025', customer: 'Andrea Gil', items: 1, total: '$30.00', status: 'new' },
    { id: '1026', customer: 'Luis Silva', items: 5, total: '$320.00', status: 'preparing' },
    { id: '1027', customer: 'Maria Torres', items: 2, total: '$90.00', status: 'delivered' },
  ];

  return (
    <div className="space-y-8 flex flex-col h-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
        <p className="text-zinc-500 mt-2">Gestión de órdenes en curso</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-start">
        {columns.map((col) => {
          const orders = dummyOrders.filter(o => o.status === col.status);
          return (
            <div key={col.status} className="flex flex-col border border-zinc-200 bg-zinc-50 h-[calc(100vh-14rem)]">
              <div className="p-4 border-b border-zinc-200 bg-white flex justify-between items-center shrink-0">
                <h2 className="text-sm font-bold uppercase tracking-widest">{col.title}</h2>
                <span className="text-xs font-semibold bg-zinc-100 px-2 py-1 rounded-sm text-zinc-500">
                  {orders.length}
                </span>
              </div>
              
              <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                {orders.map(order => (
                  <div 
                    key={order.id} 
                    className="border border-zinc-200 bg-white p-4 hover:border-black cursor-pointer transition-colors shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-sm">#{order.id}</span>
                      <span className="font-semibold text-sm">{order.total}</span>
                    </div>
                    <p className="text-sm text-zinc-600 mb-4">{order.customer}</p>
                    <div className="flex justify-between items-center text-xs text-zinc-500">
                      <span>{order.items} {order.items === 1 ? 'artículo' : 'artículos'}</span>
                      <button className="text-black font-semibold hover:underline">
                        Ver detalle
                      </button>
                    </div>
                  </div>
                ))}
                
                {orders.length === 0 && (
                  <div className="text-center text-zinc-400 text-sm py-8 border-2 border-dashed border-zinc-200">
                    No hay órdenes
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
