import { ArrowUpRight, ArrowDownRight, Package, ShoppingBag, AlertTriangle } from 'lucide-react';
import React from 'react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-zinc-500 mt-2">Resumen de actividad de Mega Import</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard
          title="Ventas Hoy"
          value="$1,240.00"
          trend="+12%"
          isPositive={true}
          icon={<ShoppingBag className="w-5 h-5 text-zinc-500" />}
        />
        <KpiCard
          title="Órdenes Pendientes"
          value="14"
          trend="-2%"
          isPositive={false}
          icon={<Package className="w-5 h-5 text-amber-500" />}
        />
        <KpiCard
          title="Alertas Stock"
          value="3"
          trend="Crítico"
          isPositive={false}
          icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
        />
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold tracking-tight">Ventas Semanales</h2>
          <div className="border border-zinc-200 bg-white p-6 h-[400px] flex items-center justify-center">
            <p className="text-zinc-500 text-sm italic">[Gráfico de Ventas Semanales]</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight">Actividad Reciente</h2>
          <div className="border border-zinc-200 bg-white p-6 h-[400px] overflow-y-auto">
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-black shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">Nueva orden #{(1023 + i).toString()}</p>
                    <p className="text-sm text-zinc-500 mt-1">Hace {i * 12} minutos</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  title,
  value,
  trend,
  isPositive,
  icon
}: {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div className="border border-zinc-200 bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">{title}</h3>
        {icon}
      </div>
      <div className="flex items-end justify-between">
        <span className="text-4xl font-bold tracking-tight">{value}</span>
        <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-zinc-500'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          {trend}
        </div>
      </div>
    </div>
  );
}
