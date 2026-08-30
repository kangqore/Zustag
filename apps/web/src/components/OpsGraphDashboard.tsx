'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Database, 
  Cpu, 
  Layers, 
  Zap, 
  Globe, 
  Radio, 
  Server, 
  RefreshCw,
  GitCommit
} from 'lucide-react';
import { DomainEvent } from '@zustag/domain-core';

export const OpsGraphDashboard: React.FC = () => {
  const [telemetry, setTelemetry] = useState<any>(null);
  const [events, setEvents] = useState<DomainEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTelemetry = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/telemetry');
      const data = await res.json();
      setTelemetry(data.metrics);
      setEvents(data.recentEvents || []);
    } catch (err) {
      console.error('Failed to load graph telemetry:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 pb-16">
      {/* Top Ops Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
            <Activity className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">Live Local Fashion Graph</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] border border-emerald-800 font-mono flex items-center gap-1">
                <Radio className="w-2.5 h-2.5 animate-ping" />
                TELEMETRY ACTIVE
              </span>
            </div>
            <h1 className="text-xl font-bold text-white">
              ZUSTAG Jamshedpur City Graph & Event Nervous System
            </h1>
            <p className="text-xs text-slate-400">
              Source of Truth (PostgreSQL) ➔ Fast Serving Cache (Redis) ➔ OpenSearch & Kafka CDC
            </p>
          </div>
        </div>

        <button
          onClick={fetchTelemetry}
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-medium text-slate-200 flex items-center gap-1.5 self-start md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh Graph
        </button>
      </div>

      {/* Real-time Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-xl p-4 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[11px] uppercase font-semibold">
            <span>Showrooms Online</span>
            <Server className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{telemetry?.activeStores ?? 5} Hubs</div>
          <div className="text-[10px] text-emerald-400">Bistupur, Sakchi, Kadma, Sonari, Telco</div>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[11px] uppercase font-semibold">
            <span>Active SKU Stock</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{telemetry?.liveAvailableUnits ?? 72} Units</div>
          <div className="text-[10px] text-slate-400">
            {telemetry?.totalVariantsManaged ?? 24} Unique SKU Variants
          </div>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[11px] uppercase font-semibold">
            <span>Serving Cache Hit</span>
            <Zap className="w-4 h-4 text-cyan-300 fill-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-cyan-300 font-mono">{telemetry?.servingCacheHitRate ?? '99.7%'}</div>
          <div className="text-[10px] text-emerald-400">
            p99 Latency: <span className="font-bold">{telemetry?.p99ReadLatencyMs ?? '1.2ms'}</span>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[11px] uppercase font-semibold">
            <span>In-Flight Orders</span>
            <Cpu className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{telemetry?.activeOrders ?? 0} In 30m SLA</div>
          <div className="text-[10px] text-slate-400">
            Completed Deliveries: {telemetry?.completedDeliveries ?? 0}
          </div>
        </div>
      </div>

      {/* Grid: Graph Topology Visualizer vs Real-time Event Bus Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2-Cols: Jamshedpur City Graph Visualizer */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                Jamshedpur Hyperlocal Fashion Mesh
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time mapping of showrooms, variant availability vectors, and express delivery corridors.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800 font-mono">
              Coord: 22.7926° N, 86.1855° E
            </span>
          </div>

          {/* Graphical Nodes Simulation */}
          <div className="bg-slate-950 rounded-xl p-6 border border-slate-800/80 relative overflow-hidden min-h-[300px] flex flex-col justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10">
              <div className="bg-slate-900/90 border border-cyan-500/40 rounded-xl p-3.5 space-y-1 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase">Hub 1: Bistupur</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="text-xs font-bold text-white">Flagship & Manyavar</div>
                <div className="text-[10px] text-slate-400">Variants Stocked: 14 • SLA: 5m prep</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase">Hub 2: Sakchi</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-xs font-bold text-white">Levi's Sakchi High St</div>
                <div className="text-[10px] text-slate-400">Variants Stocked: 8 • SLA: 6m prep</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase">Hub 3: Kadma</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-xs font-bold text-white">Fabindia Studio Kadma</div>
                <div className="text-[10px] text-slate-400">Variants Stocked: 6 • SLA: 7m prep</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase">Hub 4: Sonari</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-xs font-bold text-white">Urban Thread Studio</div>
                <div className="text-[10px] text-slate-400">Variants Stocked: 6 • SLA: 5m prep</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase">Fleet: Jamshedpur</span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
                <div className="text-xs font-bold text-white">18 EV Delivery Partners</div>
                <div className="text-[10px] text-slate-400">30-Min Corridor Coverage</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 relative z-10">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Database className="w-3.5 h-3.5 text-blue-400" />
                PostgreSQL Transactional Store
              </span>
              <span>➔ Async Event Stream (Kafka / Redpanda) ➔</span>
              <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                Redis High-Throughput Layer
              </span>
            </div>
          </div>
        </div>

        {/* Right 1-Col: Live Event Stream / CDC Bus */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-cyan-400" />
              Event Bus Feed
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
              CDC STREAM
            </span>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {events.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-xs">
                No events streamed yet. Adjust stock or place an order to see live events.
              </div>
            ) : (
              events.map((evt, idx) => (
                <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 space-y-1 font-mono text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-400">{evt.eventType}</span>
                    <span className="text-[9px] text-slate-500">{new Date(evt.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="text-slate-300 text-[10px] truncate">
                    {JSON.stringify(evt.payload)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
