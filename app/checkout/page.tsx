"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CreditCard, Truck, Shield, ArrowLeft, CheckCircle } from "lucide-react";
import useCartStore from "@/stores/cartStore";
import useAuthStore from "@/stores/authStore";
import { orderApi, paymentApi } from "@/lib/api";

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  division: string;
  postalCode: string;
}

interface PaymentMethod {
  type: 'stripe' | 'sslcommerz';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { userInfo } = useAuthStore();

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: userInfo?.name?.split(' ')[0] || '',
    lastName: userInfo?.name?.split(' ')[1] || '',
    email: userInfo?.email || '',
    phone: '',
    address: '',
    city: '',
    division: '',
    postalCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'sslcommerz'
  });

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 500 ? 0 : 60; // Free shipping over ৳500
  const total = subtotal + shipping;

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !orderPlaced) {
      router.push('/cart');
    }
  }, [items, router, orderPlaced]);

  // Redirect if not logged in
  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/checkout');
    }
  }, [userInfo, router]);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePaymentChange = (type: 'stripe' | 'sslcommerz') => {
    setPaymentMethod({ type });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userInfo) return;

    setLoading(true);

    try {
      // Create order
      const orderData = {
        items: items.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price || 0,
          quantity: item.quantity,
          image: item.image,
        })),
        shippingInfo,
        paymentMethod: paymentMethod.type,
        subtotal,
        shipping,
        total,
      };

      // Create the order first
      const orderResponse = await orderApi.createOrder(orderData);
      const orderId = orderResponse.order._id;

      // Handle payment based on method
      if (paymentMethod.type === 'stripe') {
        // Create Stripe payment intent
        const paymentResponse = await paymentApi.createStripeIntent({
          amount: total,
          currency: 'usd',
          orderId
        });

        // In a real implementation, you would redirect to Stripe checkout
        // For now, simulate success
        setOrderPlaced(true);
        clearCart();
        setTimeout(() => {
          router.push('/order-success');
        }, 2000);

      } else if (paymentMethod.type === 'sslcommerz') {
        // Create SSLCommerz payment session
        const sessionData = {
          totalAmount: total,
          currency: 'BDT',
          orderId,
          customerName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          customerEmail: shippingInfo.email,
          customerPhone: shippingInfo.phone,
          customerAddress: shippingInfo.address,
          customerCity: shippingInfo.city
        };

        const sessionResponse = await paymentApi.createSSLCommerzSession(sessionData);

        // Redirect to SSLCommerz payment gateway
        if (sessionResponse.success && sessionResponse.gatewayUrl) {
          window.location.href = sessionResponse.gatewayUrl;
        } else {
          throw new Error('Failed to create payment session');
        }
      }

    } catch (error: any) {
      console.error('Order placement failed:', error);
      alert(error.response?.data?.message || 'Order placement failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-950 dark:via-green-950/40 dark:to-emerald-950/30 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/80 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 text-center border border-white/30 dark:border-gray-800"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={40} className="text-white" />
          </motion.div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white mb-4">
            অর্ডার সফল!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে। শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-2xl hover:shadow-lg transition-all"
          >
            আরও শপিং করুন
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/40 dark:to-pink-950/30 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-purple-600 dark:text-pink-400 hover:underline mb-4"
          >
            <ArrowLeft size={20} />
            কার্টে ফিরে যান
          </Link>
          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            চেকআউট
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Truck className="text-purple-600" size={24} />
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  শিপিং তথ্য
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    প্রথম নাম *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={shippingInfo.firstName}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                    placeholder="আপনার প্রথম নাম"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    শেষ নাম *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={shippingInfo.lastName}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                    placeholder="আপনার শেষ নাম"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ইমেইল *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={shippingInfo.email}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                    placeholder="আপনার ইমেইল"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ফোন নম্বর *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={shippingInfo.phone}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                    placeholder="+880 1XX XXX XXXX"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ঠিকানা *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                    placeholder="বিস্তারিত ঠিকানা"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    শহর *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={shippingInfo.city}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                    placeholder="আপনার শহর"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    বিভাগ *
                  </label>
                  <select
                    name="division"
                    required
                    value={shippingInfo.division}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                  >
                    <option value="">বিভাগ নির্বাচন করুন</option>
                    <option value="dhaka">ঢাকা</option>
                    <option value="chittagong">চট্টগ্রাম</option>
                    <option value="khulna">খুলনা</option>
                    <option value="rajshahi">রাজশাহী</option>
                    <option value="barisal">বরিশাল</option>
                    <option value="sylhet">সিলেট</option>
                    <option value="rangpur">রংপুর</option>
                    <option value="mymensingh">ময়মনসিংহ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    পোস্টাল কোড
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={shippingInfo.postalCode}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                    placeholder="পোস্টাল কোড"
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="text-purple-600" size={24} />
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  পেমেন্ট পদ্ধতি
                </h2>
              </div>

              <div className="space-y-4">
                {/* SSLCommerz */}
                <label className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl cursor-pointer transition-all hover:border-green-300">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="sslcommerz"
                    checked={paymentMethod.type === 'sslcommerz'}
                    onChange={() => handlePaymentChange('sslcommerz')}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 dark:text-white">
                      SSLCommerz (বাংলাদেশ)
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      বিকাশ, নগদ, রকেট, ব্যাংক কার্ড সহ
                    </div>
                  </div>
                  <div className="text-green-600 font-bold">সুপারিশকৃত</div>
                </label>

                {/* Stripe */}
                <label className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl cursor-pointer transition-all hover:border-blue-300">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="stripe"
                    checked={paymentMethod.type === 'stripe'}
                    onChange={() => handlePaymentChange('stripe')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 dark:text-white">
                      Stripe (আন্তর্জাতিক)
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      ক্রেডিট/ডেবিট কার্ড, PayPal
                    </div>
                  </div>
                </label>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 dark:border-gray-800 p-6 sticky top-4"
            >
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                অর্ডার সারাংশ
              </h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 dark:text-white truncate">
                        {item.name}
                      </h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          পরিমাণ: {item.quantity}
                        </span>
                        <span className="font-semibold text-purple-600">
                          ৳{(item.price || 0) * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">সাবটোটাল</span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    ৳{subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">শিপিং</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-gray-800 dark:text-white'}`}>
                    {shipping === 0 ? 'ফ্রি' : `৳${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-gray-800 dark:text-white">মোট</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    ৳{total}
                  </span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-center gap-2 mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                <Shield className="text-green-600" size={20} />
                <span className="text-sm text-green-700 dark:text-green-400">
                  আপনার পেমেন্ট তথ্য নিরাপদ এবং এনক্রিপ্টেড
                </span>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-4 px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full"
                      />
                      প্রসেসিং...
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      অর্ডার কনফার্ম করুন - ৳{total}
                    </>
                  )}
                </span>

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
              </button>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}