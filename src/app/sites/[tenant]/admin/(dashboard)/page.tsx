import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Calendar,
  Package,
  ArrowUpRight,
  UploadCloud,
  Euro,
  ExternalLink,
} from 'lucide-react';
import React, { Suspense } from 'react';

import { PriceDisplay } from '@/components/ui/price-display';

// ─── Palette helpers ──────────────────────────────────────────────────────────
// Primary accent: emerald-600 (#059669) – keeping brand consistency
// Cards: white with zinc-100 borders, zinc-900 headings, zinc-500 sub-text

// ─── Static mock data ─────────────────────────────────────────────────────────
const recentOrders = [
  {
    id: 'PED-1024',
    product: 'Macbook Pro',
    customer: 'Rodney Cannon',
    email: 'rodney.cannon@gmail.com',
    shipping: 18.00,
    total: 118.00,
    status: 'Enviado',
    statusColor: 'text-emerald-600 bg-emerald-50',
  },
  {
    id: 'PED-1025',
    product: 'Dell Laptop',
    customer: 'Mike Franklin',
    email: 'mike.franklin@gmail.com',
    shipping: 28.00,
    total: 208.00,
    status: 'Procesando',
    statusColor: 'text-amber-600 bg-amber-50',
  },
  {
    id: 'PED-1026',
    product: 'Macbook Air',
    customer: 'Louis Franklin',
    email: 'louis.franklin@gmail.com',
    shipping: 18.00,
    total: 118.00,
    status: 'Procesando',
    statusColor: 'text-amber-600 bg-amber-50',
  },
] as const;

const messages = [
  { name: 'Carlos García',   time: '10m', msg: 'Hola, ¿cuándo llega mi pedido?'            },
  { name: 'María López',     time: '1h',  msg: 'Gracias por el excelente servicio.'          },
  { name: 'Daniel Martínez', time: '2h',  msg: 'Quisiera hacer un cambio en mi orden.'      },
  { name: 'Ana Rodríguez',   time: '3h',  msg: 'El producto llegó en perfectas condiciones.' },
] as const;

const latestUpdates = [
  { icon: ShoppingCart,  label: 'Venta item #340-00', amount: 890.00, time: '',      accent: true  },
  { icon: Users,         label: 'Nuevo lead creado',   amount: 0,         time: '30 min', accent: false },
  { icon: ShoppingCart,  label: 'Venta item #360-20', amount: 940.00, time: '',      accent: false },
  { icon: UploadCloud,   label: 'Carga de items completa', amount: 0,    time: '45 min', accent: false },
] as const;

// ─── Mini donut SVG ───────────────────────────────────────────────────────────
function DonutChart({ rate = 1 }: { rate: number }) {
  // Three segments: 50% (zinc-900), 30% (emerald-600), 20% (emerald-200)
  const r = 60;
  const cx = 80;
  const cy = 80;
  const circumference = 2 * Math.PI * r;

  const segments = [
    { pct: 0.50, color: '#18181b', dashOffset: 0 },
    { pct: 0.30, color: '#059669', dashOffset: circumference * 0.50 },
    { pct: 0.20, color: '#a7f3d0', dashOffset: circumference * 0.80 },
  ];

  const totalUsd = 85000;
  const totalVes = totalUsd * rate;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="160" height="160" className="-rotate-90">
        {/* background ring */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f4f4f5" strokeWidth="22" />
        {segments.map((s, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="22"
            strokeDasharray={`${circumference * s.pct} ${circumference * (1 - s.pct)}`}
            strokeDashoffset={-s.dashOffset}
            strokeLinecap="butt"
          />
        ))}
      </svg>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold tracking-tight text-zinc-900 leading-none">$85k</span>
        <span className="text-[10px] font-semibold text-zinc-400 mt-1">Bs. {new Intl.NumberFormat('es-VE').format(Math.round(totalVes/1000))}k</span>
      </div>
    </div>
  );
}

// ─── Mini sparkline SVG ───────────────────────────────────────────────────────
function SparklineChart() {
  // Simple polyline representing monthly income trend
  const points = [
    [10,  80],
    [45,  50],
    [80,  30],
    [115, 55],
    [150, 20],
    [185, 40],
  ] as [number, number][];

  const toSvgPoints = (pts: [number, number][]) =>
    pts.map(([x, y]) => `${x},${y}`).join(' ');

  // Build area fill path
  const firstX = points[0][0];
  const lastX  = points[points.length - 1][0];
  const areaPath = `M${firstX},90 ` + points.map(([x, y]) => `L${x},${y}`).join(' ') + ` L${lastX},90 Z`;

  return (
    <svg viewBox="0 0 195 90" className="w-full h-28" preserveAspectRatio="none">
      {/* Area fill */}
      <path d={areaPath} fill="#d1fae5" opacity="0.5" />
      {/* Line */}
      <polyline
        points={toSvgPoints(points)}
        fill="none"
        stroke="#059669"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Highlight dot at peak */}
      <circle cx={150} cy={20} r="5" fill="#059669" />
      <circle cx={150} cy={20} r="9" fill="#059669" opacity="0.2" />
    </svg>
  );
}

// ─── Avatar initials ──────────────────────────────────────────────────────────
function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');
  return (
    <div className="w-9 h-9 rounded-full bg-zinc-200 flex items-center justify-center shrink-0">
      <span className="text-xs font-bold text-zinc-600">{initials}</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function AdminDashboardPage() {
  const { getExchangeRates } = await import('@/lib/currency');
  const rates = await getExchangeRates();
  const bcvRate = rates?.USD || 1;

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500 font-medium">Bienvenido de nuevo,</p>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Panel de Control</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-sm font-medium text-zinc-500 bg-white border border-zinc-200 px-3 py-2 rounded-lg hover:border-zinc-300 transition-colors">
            <Calendar className="w-4 h-4" />
            Hoy
          </button>
        </div>
      </div>

      {/* ── KPI cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Nuevas ventas"
          value="1.345"
          delta="+8.2%"
          positive
          icon={<TrendingUp className="w-5 h-5 text-zinc-400" />}
        />
        <KpiCard
          label="Nuevos clientes"
          value="2.890"
          delta="+3.1%"
          positive
          icon={<Users className="w-5 h-5 text-zinc-400" />}
        />
        <KpiCardAmount
          label="Ingreso promedio"
          amountUsd={1870}
          bcvRate={bcvRate}
          delta="+5.4%"
          positive
          icon={<DollarSign className="w-5 h-5 text-zinc-400" />}
        />
        <Suspense fallback={<AkomoRatesCardSkeleton />}>
          <AkomoRatesCard />
        </Suspense>
      </div>

      {/* ── Middle row: Charts + Right panel ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Charts column (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Charts row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Income Breakdown (donut) */}
            <div className="bg-white border border-zinc-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-zinc-900">Desglose de Ingresos</h2>
                <span className="text-xs text-zinc-400 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Diario
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <DonutChart rate={bcvRate} />
                <div className="space-y-2.5 text-sm">
                  <LegendItem color="bg-zinc-900"   label="Canales Marketing" />
                  <LegendItem color="bg-emerald-500" label="Canales Offline"   />
                  <LegendItem color="bg-emerald-200" label="Ventas Directas"   />
                </div>
              </div>
            </div>

            {/* Planned Income (sparkline) */}
            <div className="bg-white border border-zinc-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold text-zinc-900">Ingresos Planificados</h2>
                <Calendar className="w-4 h-4 text-zinc-400" />
              </div>
              <SparklineChart />
              {/* X-axis labels */}
              <div className="flex justify-between mt-1 text-xs text-zinc-400 font-medium px-1">
                {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Latest sales table */}
          <div className="bg-white border border-zinc-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-zinc-900">Últimas Ventas</h2>
              <span className="text-xs text-zinc-400 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Diario
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-100">
                    {['Producto', 'Cliente', 'Envío', 'Total', 'Estado'].map((h) => (
                      <th
                        key={h}
                        className="text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider pb-3 pr-4 last:pr-0"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0">
                            <Package className="w-4 h-4 text-zinc-500" />
                          </div>
                          <div>
                            <p className="font-semibold text-zinc-900">{order.product}</p>
                            <p className="text-xs text-zinc-400">{order.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <p className="font-medium text-zinc-700">{order.customer}</p>
                        <p className="text-xs text-zinc-400">{order.email}</p>
                      </td>
                      <td className="py-3 pr-4 align-top">
                        <Suspense fallback={<div className="h-6 w-12 bg-zinc-100 animate-pulse rounded" />}>
                          <PriceDisplay amount={order.shipping} />
                        </Suspense>
                      </td>
                      <td className="py-3 pr-4 align-top">
                        <Suspense fallback={<div className="h-6 w-16 bg-zinc-100 animate-pulse rounded" />}>
                           <PriceDisplay amount={order.total} />
                        </Suspense>
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right panel (1/3) */}
        <div className="space-y-4">
          {/* Messages */}
          <div className="bg-white border border-zinc-200 rounded-xl p-5">
            <h2 className="text-sm font-bold text-zinc-900 mb-4">Mensajes</h2>
            <div className="space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors ${
                    i === 0 ? 'bg-zinc-50 border border-zinc-200' : 'hover:bg-zinc-50'
                  }`}
                >
                  <Avatar name={m.name} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-zinc-900 truncate">{m.name}</p>
                      <span className="text-xs text-zinc-400 whitespace-nowrap">{m.time}</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed line-clamp-2">{m.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Updates */}
          <div className="bg-white border border-zinc-200 rounded-xl p-5">
            <h2 className="text-sm font-bold text-zinc-900 mb-4">Últimas Actualizaciones</h2>
            <div className="space-y-2">
              {latestUpdates.map((u, i) => {
                const Icon = u.icon;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      u.accent ? 'bg-zinc-900 text-white' : 'bg-zinc-50 border border-zinc-100'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        u.accent ? 'bg-white/10' : 'bg-white border border-zinc-200'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${u.accent ? 'text-white' : 'text-zinc-600'}`} />
                    </div>
                    <p className={`text-xs font-medium flex-1 ${u.accent ? 'text-white' : 'text-zinc-700'}`}>
                      {u.label}
                    </p>
                    {u.amount && (
                      <span className={`text-xs font-bold ${u.accent ? 'text-emerald-400' : 'text-emerald-600'}`}>
                        {u.amount}
                      </span>
                    )}
                    {u.time && (
                      <span className="text-xs text-zinc-400">{u.time}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function KpiCard({
  label,
  value,
  delta,
  positive,
  icon,
}: {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">{label}</p>
        <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold tracking-tight text-zinc-900">{value}</p>
      <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
        <ArrowUpRight className="w-3.5 h-3.5" />
        {delta} vs ayer
      </div>
    </div>
  );
}

function KpiCardAmount({
  label,
  amountUsd,
  bcvRate,
  delta,
  positive,
  icon,
}: {
  label: string;
  amountUsd: number;
  bcvRate: number;
  delta: string;
  positive: boolean;
  icon: React.ReactNode;
}) {
  const amountVes = amountUsd * bcvRate;
  
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">{label}</p>
        <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-3xl font-bold tracking-tight text-zinc-900 leading-none">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amountUsd)}
        </p>
        <p className="text-xs font-semibold text-zinc-400 mt-1">
          Bs. {new Intl.NumberFormat('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amountVes)}
        </p>
      </div>
      <div className={`flex items-center gap-1 mt-3 text-xs font-semibold ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
        <ArrowUpRight className="w-3.5 h-3.5" />
        {delta} vs ayer
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`inline-block w-3 h-3 rounded-sm shrink-0 ${color}`} />
      <span className="text-xs text-zinc-600 font-medium">{label}</span>
    </div>
  );
}

async function AkomoRatesCard() {
  let bcvUsd = '---';
  let bcvEur = '---';
  let binanceUsdt = '---';

  try {
    const [bcvRes, usdtRes] = await Promise.all([
      fetch('https://api.akomo.xyz/api/exchange-rates', { cache: 'no-store' }),
      fetch('https://api.akomo.xyz/api/exchange-rates/binance/average?asset=USDT&fiat=VES&tradeType=SELL', { cache: 'no-store' })
    ]);

    if (bcvRes.ok) {
      const bcvData = await bcvRes.json();
      const usdRate = bcvData?.rates?.find((r: any) => r.label === 'USD')?.value;
      const eurRate = bcvData?.rates?.find((r: any) => r.label === 'EUR')?.value;
      
      bcvUsd = usdRate ? parseFloat(usdRate.replace(',', '.')).toFixed(4).replace('.', ',') : bcvUsd;
      bcvEur = eurRate ? parseFloat(eurRate.replace(',', '.')).toFixed(4).replace('.', ',') : bcvEur;
    }
    if (usdtRes.ok) {
      const usdtData = await usdtRes.json();
      binanceUsdt = usdtData?.average ? parseFloat(usdtData.average).toFixed(4).replace('.', ',') : binanceUsdt;
    }
  } catch (error) {
    // Silently fail on rate fetch
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Tasas de Cambio 🇻🇪</p>
      </div>
      
      <div className="space-y-3 mt-1 flex-1 flex flex-col justify-center mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-500">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm font-medium">USD BCV</span>
          </div>
          <span className="text-sm font-bold text-zinc-900">Bs. {bcvUsd}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-500">
            <Euro className="w-4 h-4" />
            <span className="text-sm font-medium">EUR BCV</span>
          </div>
          <span className="text-sm font-bold text-zinc-900">Bs. {bcvEur}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-500">
            <span className="text-[10px] font-bold px-1 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-600">USDT</span>
            <span className="text-sm font-medium">Binance</span>
          </div>
          <span className="text-sm font-bold text-zinc-900">Bs. {binanceUsdt}</span>
        </div>
      </div>

      <div className="absolute bottom-[4px] right-3">
        <a 
          href="https://akomo.xyz" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-emerald-600 transition-colors"
          title="Powered by Akomo"
        >
          Powered by Akomo <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

function AkomoRatesCardSkeleton() {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col justify-between items-center animate-pulse min-h-[140px]">
      <div className="w-full flex items-center justify-between mb-3">
        <div className="h-4 bg-zinc-200 rounded w-24"></div>
      </div>
      <div className="w-full space-y-3 mt-1 mb-4">
        <div className="h-4 w-full bg-zinc-100 rounded"></div>
        <div className="h-4 w-full bg-zinc-100 rounded"></div>
        <div className="h-4 w-full bg-zinc-100 rounded"></div>
      </div>
    </div>
  );
}
