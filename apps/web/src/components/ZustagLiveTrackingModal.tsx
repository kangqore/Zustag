'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Bike, 
  MapPin, 
  Store, 
  CheckCircle2, 
  Clock, 
  Phone, 
  ShieldCheck, 
  Zap, 
  Navigation,
  Sparkles,
  Compass,
  Radio
} from 'lucide-react';

interface LiveTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData?: {
    orderId: string;
    storeName: string;
    customerName: string;
    areaName: string;
    totalAmount: number;
    itemsCount: number;
  };
}

export const ZustagLiveTrackingModal: React.FC<LiveTrackingModalProps> = ({
  isOpen,
  onClose,
  orderData = {
    orderId: 'ZSTG-8821',
    storeName: 'Manyavar Flagship Bistupur',
    customerName: 'Rohit Sharma',
    areaName: 'Bistupur Main Road',
    totalAmount: 3499,
    itemsCount: 2
  }
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [etaRemaining, setEtaRemaining] = useState(18);
  const [riderProgress, setRiderProgress] = useState(25); // percentage along route

  useEffect(() => {
    if (!isOpen) return;
    setCurrentStep(1);
    setEtaRemaining(18);
    setRiderProgress(15);

    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev === 1) {
          setRiderProgress(45);
          setEtaRemaining(14);
          return 2;
        }
        if (prev === 2) {
          setRiderProgress(75);
          setEtaRemaining(7);
          return 3;
        }
        if (prev === 3) {
          setRiderProgress(100);
          setEtaRemaining(1);
          return 4;
        }
        return prev;
      });
    }, 4000);

    return () => clearInterval(stepTimer);
  }, [isOpen]);

  if (!isOpen) return null;

  const steps = [
    {
      id: 1,
      title: 'Order Confirmed & Showroom Packing',
      desc: `Live counter packing initiated at ${orderData.storeName}`,
      time: '18 mins away',
      isComplete: currentStep >= 1
    },
    {
      id: 2,
      title: 'Rider Assigned & Bag Sealed',
      desc: 'Suraj Kumar (Honda Activa JH-05-AB-4412) picked up sealed packet',
      time: '14 mins away',
      isComplete: currentStep >= 2
    },
    {
      id: 3,
      title: 'On the Way via Straight Mile Rd',
      desc: 'Rider moving towards Jubilee Park / Steel Enclave',
      time: '7 mins away',
      isComplete: currentStep >= 3
    },
    {
      id: 4,
      title: 'Arrived at Your Doorstep',
      desc: '10-Minute Try-at-Home wait time ready. Enjoy your fit!',
      time: 'Just now',
      isComplete: currentStep >= 4
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative bg-white max-w-xl w-full rounded-2xl shadow-2xl overflow-hidden text-[#282c3f] animate-slide-in-up">
        {/* Header with Live Status */}
        <div className="bg-gradient-to-r from-[#182344] via-[#243768] to-[#182344] p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>LIVE GPS COURIER TELEMETRY &bull; 30-MIN SLA</span>
          </div>

          <div className="flex items-baseline justify-between mt-2">
            <div>
              <h2 className="text-2xl font-black">
                {currentStep === 4 ? 'Arrived at Your Door!' : `Arriving in ${etaRemaining} Mins`}
              </h2>
              <p className="text-xs text-slate-300">
                Order #{orderData.orderId} &bull; {orderData.itemsCount} Items ({orderData.areaName})
              </p>
            </div>
            <div className="text-right">
              <span className="bg-[#03a685] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase shadow-xs">
                ON TIME
              </span>
            </div>
          </div>
        </div>

        {/* 1.C: Live Interactive Vector GPS Route Map */}
        <div className="relative h-44 sm:h-52 bg-[#0c1427] overflow-hidden border-b border-[#eaeaec]">
          {/* Map Grid Background */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4ab6d4_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* SVG Road Network & Active Dispatch Path */}
          <svg className="w-full h-full" viewBox="0 0 500 200">
            {/* Background Jamshedpur Road Arteries */}
            <path d="M 30 160 Q 150 140 250 170 T 470 140" stroke="#1f2d4e" strokeWidth="6" fill="none" />
            <path d="M 80 30 Q 120 100 160 170" stroke="#1f2d4e" strokeWidth="4" fill="none" />
            <path d="M 320 20 Q 340 90 380 170" stroke="#1f2d4e" strokeWidth="4" fill="none" />
            <path d="M 220 30 Q 250 80 280 180" stroke="#1f2d4e" strokeWidth="4" fill="none" />

            {/* Active Delivery Route: Showroom (Bistupur) -> Destination */}
            <path 
              id="deliveryRoute"
              d="M 60 120 C 140 40, 240 180, 440 80" 
              stroke="#2564ea" 
              strokeWidth="6" 
              strokeLinecap="round"
              fill="none" 
              className="opacity-40"
            />
            <path 
              d="M 60 120 C 140 40, 240 180, 440 80" 
              stroke="#03a685" 
              strokeWidth="4" 
              strokeDasharray="8 6"
              strokeLinecap="round"
              fill="none" 
              className="animate-pulse"
            />

            {/* Landmark Labels on Map */}
            <text x="70" y="165" fill="#64748b" fontSize="9" fontWeight="bold">Bistupur Main Rd</text>
            <text x="210" y="45" fill="#64748b" fontSize="9" fontWeight="bold">Straight Mile Rd</text>
            <text x="360" y="175" fill="#64748b" fontSize="9" fontWeight="bold">Jubilee Park Gate</text>

            {/* Origin Store Pin */}
            <g transform="translate(60, 120)">
              <circle r="14" fill="#ff3f6c" className="animate-ping opacity-30" />
              <circle r="8" fill="#ff3f6c" />
              <circle r="4" fill="white" />
            </g>

            {/* Destination Customer Pin */}
            <g transform="translate(440, 80)">
              <circle r="14" fill="#03a685" className="animate-ping opacity-30" />
              <circle r="8" fill="#03a685" />
              <circle r="4" fill="white" />
            </g>
          </svg>

          {/* Showroom Origin Tag */}
          <div className="absolute top-2 left-3 bg-[#182344]/90 text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10 flex items-center gap-1 shadow-sm">
            <Store className="w-3 h-3 text-[#ff3f6c]" />
            <span>{orderData.storeName.split(' ')[0]} Store</span>
          </div>

          {/* Customer Destination Tag */}
          <div className="absolute top-2 right-3 bg-[#182344]/90 text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10 flex items-center gap-1 shadow-sm">
            <MapPin className="w-3 h-3 text-[#03a685]" />
            <span>{orderData.areaName}</span>
          </div>

          {/* Moving Rider Beacon Indicator */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out z-20 flex flex-col items-center"
            style={{ left: `${Math.min(90, Math.max(12, riderProgress))}%` }}
          >
            <div className="bg-[#ff3f6c] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-lg flex items-center gap-1 whitespace-nowrap animate-bounce">
              <Bike className="w-3 h-3" />
              <span>Suraj (34 km/h)</span>
            </div>
            <div className="w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-400/40 animate-pulse mt-0.5" />
          </div>

          {/* Live Telemetry Bar */}
          <div className="absolute bottom-2 left-3 right-3 bg-[#182344]/90 backdrop-blur-md px-3 py-1 rounded text-[10px] text-cyan-300 font-mono flex items-center justify-between border border-cyan-500/20">
            <span>GPS: 22.8046° N, 86.2029° E (Bistupur Flyover)</span>
            <span className="text-emerald-400 font-bold">● SIGNAL STRONG</span>
          </div>
        </div>

        {/* Rider Card (Zomato/Blinkit Style) */}
        <div className="p-4 bg-[#fafbfc] border-b border-[#eaeaec] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#ff3f6c] to-[#ff905a] flex items-center justify-center text-white font-black text-sm shadow-sm">
              SK
            </div>
            <div>
              <div className="font-extrabold text-sm text-[#282c3f] flex items-center gap-1.5">
                <span>Suraj Kumar</span>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                  4.9★ (380+ Deliveries)
                </span>
              </div>
              <div className="text-xs text-[#7e818c]">
                Zustag Express Courier &bull; Honda Activa JH-05-AB-4412
              </div>
            </div>
          </div>

          <button 
            onClick={() => alert('Connecting live phone call with rider Suraj Kumar (+91 98350 99412)...')}
            className="w-9 h-9 rounded-full bg-[#03a685] text-white flex items-center justify-center hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
          >
            <Phone className="w-4 h-4" />
          </button>
        </div>

        {/* Step-by-Step Interactive Timeline */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#eaeaec]">
            {steps.map((step) => (
              <div key={step.id} className="relative flex items-start gap-4">
                {/* Step Circle Indicator */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                  step.isComplete
                    ? 'bg-[#03a685] text-white ring-4 ring-emerald-100'
                    : 'bg-white border-2 border-[#d4d5d9] text-[#7e818c]'
                }`}>
                  {step.isComplete ? (
                    <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <span className="text-xs font-bold">{step.id}</span>
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs font-bold ${
                      step.isComplete ? 'text-[#282c3f]' : 'text-[#7e818c]'
                    }`}>
                      {step.title}
                    </h4>
                    <span className="text-[10px] text-[#7e818c] font-medium">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#535766] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 10-Minute Doorstep Try-On Assurance Pill */}
          <div className="bg-[#fff1f4] border border-rose-200 rounded-xl p-3 flex items-center gap-2.5 text-xs text-[#ff3f6c] font-bold">
            <Clock className="w-4 h-4 shrink-0" />
            <span>Rider will wait 10 minutes at your door for fit verification & instant exchange!</span>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#282c3f] hover:bg-[#ff3f6c] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
          >
            Back to Storefront
          </button>
        </div>
      </div>
    </div>
  );
};
