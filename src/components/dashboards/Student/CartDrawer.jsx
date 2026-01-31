import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  setCartItems,
  selectCartTotal,
} from "../../../features/cartSlice";
import { useGetCartQuery } from "../../../Services/student/cartServices";
import { useCartHandlers } from "./Cart/cartHandlers";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import { useCheckoutHandler } from "../../../features/paymentFlow";

export default function CartDrawer({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const userId = useSelector(state => state.auth.user?.id);

  const { data: cartData, refetch } = useGetCartQuery(userId, {
    skip: !userId || !isOpen,
  });

  const {
    handleRemoveFromCart,
    handleClearCart,
    removeStatus,
    clearStatus,
  } = useCartHandlers();

  const loading = removeStatus.isLoading || clearStatus.isLoading;

  useEffect(() => {
    if (cartData && isOpen) {
      dispatch(setCartItems(cartData.items || []));
    }
  }, [cartData, isOpen, dispatch]);

  const handleRemove = async (courseId) => {
    if (!userId) return;
    await handleRemoveFromCart({ userId, courseId });
    refetch();
  };

  const handleClearAll = async () => {
    if (!userId) return;
    await handleClearCart(userId);
    refetch();
  };

  const { handleCheckout } = useCheckoutHandler();

  const handleBuyNow = async () => {
    const courseIds = items.map(item => item._id);
    const { success } = await handleCheckout({ courseIds, userId });

    if (success) {
      await handleClearCart(userId);
      refetch();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="tw-fixed tw-inset-0 tw-bg-black/40 tw-z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="
              tw-fixed tw-top-0 tw-right-0 tw-h-full
              tw-w-full sm:tw-w-[420px]
              tw-bg-white tw-shadow-xl
              tw-z-50
              tw-flex tw-flex-col
            "
          >
            {/* Header */}
            <div className="tw-flex tw-items-center tw-justify-between tw-p-4 tw-border-b">
              <div className="tw-flex tw-items-center tw-gap-2">
                <ShoppingBag size={20} className="tw-text-blue-600" />
                <h2 className="tw-font-semibold tw-text-lg">
                  Your Cart
                </h2>
                {items.length > 0 && (
                  <span className="tw-ml-1 tw-bg-blue-100 tw-text-blue-600 tw-text-xs tw-font-semibold tw-rounded-full tw-px-2 tw-py-0.5">
                    {items.length}
                  </span>
                )}
              </div>

              <div className="tw-flex tw-items-center tw-gap-2">
                {items.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    disabled={loading}
                    className="tw-text-sm tw-text-red-500 hover:tw-underline disabled:tw-opacity-50"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="tw-p-2 tw-rounded hover:tw-bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="tw-flex-1 tw-overflow-y-auto tw-p-4 tw-space-y-4">
              {items.length === 0 ? (
                <div className="tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center">
                  <ShoppingBag size={64} className="tw-text-gray-300" />
                  <p className="tw-mt-4 tw-font-medium">
                    Your cart is empty
                  </p>
                  <p className="tw-text-sm tw-text-gray-500">
                    Start shopping to add courses
                  </p>
                  <button
                    onClick={onClose}
                    className="tw-mt-4 tw-text-blue-600 hover:tw-underline"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div
                    key={item._id}
                    className="tw-flex tw-gap-3 tw-border tw-rounded-lg tw-p-3"
                  >
                    {/* Image */}
                    <div className="tw-w-16 tw-h-16 tw-rounded tw-bg-gray-100 tw-flex tw-items-center tw-justify-center tw-overflow-hidden">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="tw-w-full tw-h-full tw-object-cover"
                        />
                      ) : (
                        <ShoppingBag size={20} className="tw-text-gray-400" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="tw-flex-1">
                      <div className="tw-flex tw-justify-between tw-gap-2">
                        <p className="tw-font-medium tw-text-sm">
                          {item.name}
                        </p>
                        <button
                          onClick={() => handleRemove(item._id)}
                          disabled={loading}
                          className="tw-text-gray-400 hover:tw-text-red-500 disabled:tw-opacity-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="tw-mt-1 tw-text-sm tw-font-semibold tw-text-gray-700">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="tw-border-t tw-p-4 tw-space-y-3">
                <div className="tw-flex tw-justify-between tw-font-semibold">
                  <span>Total</span>
                  <span className="tw-text-lg">₹{total}</span>
                </div>

                <button
                  onClick={handleBuyNow}
                  disabled={loading}
                  className="
                    tw-w-full
                    tw-bg-blue-600
                    hover:tw-bg-blue-700
                    tw-text-white
                    tw-font-medium
                    tw-rounded-lg
                    tw-py-3
                    tw-flex tw-items-center tw-justify-center tw-gap-2
                    disabled:tw-opacity-60
                  "
                >
                  Proceed to Checkout
                  <span className="tw-text-sm">
                    ({items.length} items)
                  </span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
