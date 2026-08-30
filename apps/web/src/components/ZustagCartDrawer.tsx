'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Tag, 
  CheckCircle2, 
  Lock,
  RotateCcw,
  CreditCard,
  QrCode,
  Banknote,
  Smartphone,
  Coins,
  Sparkles
} from 'lucide-react';
import { Product, ProductVariant, Store, JAMSHEDPUR_ZONES } from '@zustag/domain-core';

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  store: Store;
  quantity: number;
  price: number;
  tryOnSecondarySize?: string;
}

interface ZustagCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (variantId: string) => void;
  onPlaceOrder: (pointsRedeemed?: number) => void;
  selectedZone: string;
  greencardBalance?: number;
}

export const ZustagCartDrawer: React.FC<ZustagCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onPlaceOrder,
  selectedZone,
  greencardBalance = 450
}) => {
  const [couponCode, setCouponCode] = useState('ZUSTAGJSR');
  const [couponApplied, setCouponApplied] = useState(true);
  const [redeemGreencard, setRedeemGreencard] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'pos'>('upi');
  const [lockSeconds, setLockSeconds] = useState(600); // 10-minute stock reservation

  const currentZone = JAMSHEDPUR_ZONES[selectedZone] || JAMSHEDPUR_ZONES.BISTUPUR_MAIN;

  // Inventory reservation countdown
  useEffect(() => {
    if (!isOpen || items.length === 0) return;
    const timer = setInterval(() => {
      setLockSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, items]);

  if (!isOpen) return null;

  const totalMRP = items.reduce((acc, i) => acc + (i.variant.mrp * i.quantity), 0);
  const totalSellingPrice = items.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const discountOnMRP = totalMRP - totalSellingPrice;
  const couponDiscount = couponApplied && totalSellingPrice >= 500 ? 200 : 0;
  const greencardDiscount = redeemGreencard ? Math.min(200, greencardBalance) : 0;
  const finalAmount = Math.max(0, totalSellingPrice - couponDiscount - greencardDiscount);
  const pointsEarned = Math.round(finalAmount * 0.05); // 5% cashback points

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      setTimeout(() => {
        onPlaceOrder(greencardDiscount);
        setOrderComplete(false);
      }, 1600);
    }, 1000);
  };

  const formatLockTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl text-[#1e2434] animate-slide-in-right">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#eaeaec] flex items-center justify-between bg-[#fafbfc]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#ff3f6c]" />
            <h2 className="font-black text-base tracking-wide text-[#1e2434] font-display">
              YOUR BAG ({items.length} ITEMS)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-[#7e818c] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 10-Minute Hyperlocal Inventory Lock Bar */}
        {items.length > 0 && !orderComplete && (
          <div className="bg-[#fff1f4] border-b border-rose-200 px-4 py-2 flex items-center justify-between text-xs text-[#ff3f6c] font-bold">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Showroom Stock Reserved for You</span>
            </div>
            <span className="font-mono bg-white px-2 py-0.5 rounded border border-rose-200 shadow-2xs">
              {formatLockTime(lockSeconds)}
            </span>
          </div>
        )}

        {/* Bag Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {orderComplete ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-[#03a685] animate-bounce shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-[#1e2434] font-display">
                Order Confirmed & Locked!
              </h3>
              <p className="text-xs text-[#535766] max-w-xs mx-auto">
                Showroom dispatch initiated for <strong>{currentZone.areaName}</strong>. 30-Minute courier assigned!
              </p>
              <div className="bg-emerald-50 text-[#03a685] text-xs font-bold p-2.5 rounded-xl max-w-xs mx-auto border border-emerald-200 flex items-center justify-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>+₹{pointsEarned} Greencard Points Credited to Account!</span>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-24 space-y-3">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-[#7e818c]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-[#1e2434]">Hey, your bag is empty!</h3>
              <p className="text-xs text-[#7e818c]">
                Explore showrooms across Jamshedpur & Gamharia with 30-min delivery.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-[#ff3f6c] text-white text-xs font-bold uppercase rounded-xl cursor-pointer shadow-md"
              >
                Shop Now
              </button>
            </div>
          ) : (
            <>
              {/* 🚀 Gamified Express & Rewards Progress Bar (Track 3) */}
              <div className="bg-gradient-to-r from-[#182344] to-[#2564ea] text-white p-3.5 rounded-2xl space-y-2 shadow-md">
                <div className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>
                      {totalSellingPrice < 999
                        ? `Add ₹${(999 - totalSellingPrice).toLocaleString()} more for Free 15-Min Express Dispatch 🚀`
                        : totalSellingPrice < 1999
                        ? `🎉 Free Express Unlocked! Add ₹${(1999 - totalSellingPrice).toLocaleString()} for 2X Greencard Points 🪙`
                        : '👑 VIP Status Active! Free Express + 2X Cashback Unlocked!'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300 font-black">
                    {Math.min(100, Math.round((totalSellingPrice / 1999) * 100))}%
                  </span>
                </div>

                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#ff3f6c] via-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(8, (totalSellingPrice / 1999) * 100))}%` }}
                  />
                </div>
              </div>

              {/* Item Cards */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.variant.id}
                    className="p-3.5 rounded-2xl border border-[#eaeaec] bg-white shadow-2xs flex flex-col gap-2 relative"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-20 h-24 object-cover rounded-xl bg-[#f5f5f7] shrink-0"
                      />

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-start justify-between">
                          <div className="font-black text-xs text-[#1e2434] truncate">
                            {item.product.brand}
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.variant.id)}
                            className="text-[#7e818c] hover:text-rose-600 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-xs text-[#535766] truncate font-normal">
                          {item.product.title}
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-[#7e818c]">
                          <span>Primary Size: <strong className="text-[#1e2434]">{item.variant.size}</strong></span>
                          <span>&bull;</span>
                          <span>Qty: <strong className="text-[#1e2434]">{item.quantity}</strong></span>
                        </div>

                        <div className="text-[10px] text-[#2564ea] font-semibold flex items-center gap-1">
                          <Zap className="w-2.5 h-2.5 fill-current" />
                          <span>{item.store.name.split('-')[0]} ({item.store.locality})</span>
                        </div>

                        <div className="flex items-center gap-2 pt-0.5">
                          <span className="font-black text-xs text-[#1e2434]">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                          {item.variant.mrp > item.price && (
                            <span className="text-[10px] text-[#7e818c] line-through">
                              ₹{(item.variant.mrp * item.quantity).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Doorstep Try-On Visual Badge (Track 3) */}
                    <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-[10px] text-amber-900 font-bold flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <RotateCcw className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Try-On in Pouch: <strong>Size {item.variant.size}</strong> + <strong>Size {item.tryOnSecondarySize || (item.variant.size === 'M' ? 'L' : 'M')}</strong></span>
                      </div>
                      <span className="text-[9px] bg-amber-200/80 text-amber-900 font-black px-1.5 py-0.2 rounded-full uppercase">
                        2 SIZES
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 🪙 Pantaloons-Style Greencard Loyalty Redemption Box */}
              <div className="border border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-black text-emerald-950">
                    <Coins className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>Zustag Greencard Rewards</span>
                  </div>
                  <span className="bg-emerald-600 text-white font-mono text-[10px] font-black px-2 py-0.5 rounded-full">
                    {greencardBalance} PTS Available
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-emerald-200/60">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={redeemGreencard}
                      onChange={(e) => setRedeemGreencard(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 accent-emerald-600 rounded cursor-pointer"
                    />
                    <span className="text-[11px] font-bold text-emerald-900">
                      Redeem 200 Points (-₹200 Instant Off)
                    </span>
                  </label>
                  {redeemGreencard && (
                    <span className="text-[10px] font-black text-emerald-700">
                      -₹200 APPLIED
                    </span>
                  )}
                </div>

                <div className="text-[10px] text-emerald-800 font-semibold flex items-center gap-1 pt-0.5">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>You'll earn <strong>+{pointsEarned} Greencard Points (5% Cashback)</strong> on this order!</span>
                </div>
              </div>

              {/* 1-Click Fast Payment Options */}
              <div className="border border-[#eaeaec] rounded-2xl p-3.5 bg-white space-y-2 text-xs">
                <div className="font-bold text-[#1e2434] uppercase text-[11px] tracking-wider">
                  Select Express Payment Method
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 rounded-xl border text-center font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'border-[#ff3f6c] bg-[#fff1f4] text-[#ff3f6c]'
                        : 'border-[#eaeaec] hover:border-[#1e2434] text-[#1e2434]'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="text-[10px]">Instant UPI QR</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-xl border text-center font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#ff3f6c] bg-[#fff1f4] text-[#ff3f6c]'
                        : 'border-[#eaeaec] hover:border-[#1e2434] text-[#1e2434]'
                    }`}
                  >
                    <Banknote className="w-4 h-4" />
                    <span className="text-[10px]">Cash on Door</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('pos')}
                    className={`p-2.5 rounded-xl border text-center font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'pos'
                        ? 'border-[#ff3f6c] bg-[#fff1f4] text-[#ff3f6c]'
                        : 'border-[#eaeaec] hover:border-[#1e2434] text-[#1e2434]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span className="text-[10px]">Card on POS</span>
                  </button>
                </div>
              </div>

              {/* Coupons Section */}
              <div className="border border-[#eaeaec] rounded-2xl p-3 bg-white space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#1e2434]">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#ff3f6c]" />
                    Apply Coupon
                  </span>
                  {couponApplied && (
                    <span className="text-[10px] text-[#03a685] font-bold">
                      ZUSTAGJSR Applied (-₹200)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="ENTER COUPON"
                    className="bg-[#f5f5f7] border border-[#eaeaec] rounded-lg px-3 py-1.5 text-xs font-mono font-bold flex-1 focus:outline-none uppercase"
                  />
                  <button
                    onClick={() => setCouponApplied(true)}
                    className="px-3 py-1.5 bg-[#1e2434] hover:bg-[#ff3f6c] text-white text-xs font-bold rounded-lg uppercase cursor-pointer transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Delivery Address Pill */}
              <div className="border border-[#eaeaec] rounded-2xl p-3 bg-white space-y-1 text-xs">
                <div className="font-bold text-[#1e2434]">Delivering To:</div>
                <p className="text-[11px] text-[#535766]">
                  Flat 4B, Steel Enclave &bull; <strong>{currentZone.areaName}</strong>
                </p>
                <div className="text-[10px] font-bold text-[#03a685] flex items-center gap-1 pt-0.5">
                  <Zap className="w-3 h-3 fill-current" />
                  <span>30-Minute Guaranteed Express SLA</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border border-[#eaeaec] rounded-2xl p-3.5 bg-white space-y-2 text-xs">
                <div className="font-bold text-[#1e2434] uppercase text-[11px] tracking-wider border-b border-[#f5f5f7] pb-1.5">
                  Price Details ({items.length} Items)
                </div>

                <div className="flex justify-between text-[#535766]">
                  <span>Total MRP</span>
                  <span>₹{totalMRP.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-[#03a685]">
                  <span>Discount on MRP</span>
                  <span>-₹{discountOnMRP.toLocaleString()}</span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-[#03a685]">
                    <span>Coupon Discount (ZUSTAGJSR)</span>
                    <span>-₹{couponDiscount.toLocaleString()}</span>
                  </div>
                )}

                {redeemGreencard && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Greencard Loyalty Redemption</span>
                    <span>-₹{greencardDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#535766]">
                  <span>30-Minute Express Delivery</span>
                  <span className="text-[#03a685] font-bold">FREE</span>
                </div>

                <div className="border-t border-[#eaeaec] pt-2 flex justify-between font-black text-sm text-[#1e2434]">
                  <span>Total Amount</span>
                  <span>₹{finalAmount.toLocaleString()}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Action + Try-On Guarantee */}
        {items.length > 0 && !orderComplete && (
          <div className="p-4 border-t border-[#eaeaec] bg-white space-y-2.5">
            {/* 10-Minute Doorstep Try-On Guarantee Pill */}
            <div className="bg-[#fff1f4] border border-rose-200 rounded-xl p-2 flex items-center gap-2 text-[10px] text-[#ff3f6c] font-bold">
              <RotateCcw className="w-3.5 h-3.5 shrink-0" />
              <span>10-Minute Doorstep Try & Instant Swap active on this order.</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold text-[#7e818c]">Total Amount</div>
                <div className="text-lg font-black text-[#1e2434]">₹{finalAmount.toLocaleString()}</div>
              </div>

              <button
                disabled={isCheckingOut}
                onClick={handleCheckout}
                className="px-7 py-3.5 bg-gradient-to-r from-[#ff3f6c] to-[#f26a10] hover:opacity-95 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>Reserving Showroom Stock...</span>
                ) : (
                  <>
                    <span>Place 30-Min Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
