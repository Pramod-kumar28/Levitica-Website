import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  setCartItems,
  selectCartTotal,
} from '@/features/cartSlice';
import { useGetCartQuery } from '@/Services/student/cartServices';
import { useGetFreeCourseQuery } from '@/Services/sharedServices/courses.Services';
import { useCartHandlers } from "./cartHandlers";
import {
  FiX,
  FiTrash2,
  FiShoppingBag,
  FiArrowRight,
} from "react-icons/fi";
import { useEffect } from "react";
import { useCheckoutHandler } from '@/features/paymentFlow';

export default function CartDrawer({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;

  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  /* ================= FETCH CART ================= */
  const { data: cartData } = useGetCartQuery(userId, {
    skip: !userId || !isOpen,
  });

  /* ================= FETCH FREE COURSE ================= */
  const { data: freeData } = useGetFreeCourseQuery(undefined, {
    skip: !isOpen,
  });

  const freeCourse = freeData?.data?.[0];


  const {
    handleRemoveFromCart,
    handleClearCart,
    removeStatus,
    clearStatus,
  } = useCartHandlers();

  const loading = removeStatus.isLoading || clearStatus.isLoading;
  const { handleCheckout } = useCheckoutHandler();

  /* ================= SYNC CART ================= */
  useEffect(() => {
    if (cartData?.items) {
      dispatch(setCartItems(cartData.items));
    }
  }, [cartData, dispatch]);

  /* ================= BUSINESS LOGIC ================= */
  const hasPaidItems = items.some((item) => item.price > 0);

  const displayItems =
    hasPaidItems && freeCourse
      ? [
          ...items,
          ...(items.some((i) => i._id === freeCourse._id)
            ? []
            : [freeCourse]),
        ]
      : items;

  /* ================= CHECKOUT ================= */
  const handleBuyNow = async () => {
    if (!user || items.length === 0) return;

    const courseIds = items.map((item) => item._id);
    const { success } = await handleCheckout({ courseIds, user });

    if (success) {
      await handleClearCart(user.id);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ===== OVERLAY ===== */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* ===== DRAWER ===== */}
          <motion.div
            className="
              fixed top-0 right-0 h-full
              w-full sm:w-[420px]
              bg-white z-50
              flex flex-col
            "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* ===== HEADER ===== */}
            <div className="sticky top-0 bg-white z-10 border-b">
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <FiShoppingBag className="text-blue-600 text-lg" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <p className="text-xs text-gray-500">
                      {items.length > 0
                        ? `${items.length} course${
                            items.length > 1 ? "s" : ""
                          } selected`
                        : "No courses added yet"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>

            {/* ===== ITEMS ===== */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                    <FiShoppingBag size={36} className="text-gray-400" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Browse courses and add them to your cart
                  </p>
                </div>
              ) : (
                displayItems.map((item) => {
                  const isFree = item.price === 0;

                  return (
                    <motion.div
                      key={item._id}
                      initial={isFree ? { scale: 0.95, opacity: 0 } : false}
                      animate={isFree ? { scale: 1, opacity: 1 } : false}
                      transition={{ duration: 0.4 }}
                      className={`
                        flex gap-4
                        border rounded-2xl
                        p-4
                        transition
                        hover:shadow-sm
                        ${
                          isFree
                            ? "bg-green-50 border-green-400 ring-2 ring-green-200"
                            : ""
                        }
                      `}
                    >
                      {/* IMAGE */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={
                            item?.thumbnail ||
                            "/img/course-placeholder.png"
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* INFO */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-sm leading-snug line-clamp-2">
                            {item.name}
                          </h4>

                          {!isFree && (
                            <button
                              disabled={loading}
                              onClick={() =>
                                handleRemoveFromCart({
                                  userId,
                                  courseId: item._id,
                                })
                              }
                              className="text-gray-400 hover:text-red-500"
                            >
                              <FiTrash2 />
                            </button>
                          )}
                        </div>

                        <p className="mt-2 text-base font-bold">
                          {isFree ? (
                            <span className="text-green-600">
                              FREE 🎁
                            </span>
                          ) : (
                            `₹${item.price}`
                          )}
                        </p>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* ===== FOOTER ===== */}
            {items.length > 0 && (
              <div className="sticky bottom-0 bg-white border-t p-5">
                {hasPaidItems && (
                  <p className="text-green-600 text-sm mb-2">
                    🎉 Bonus course included for free!
                  </p>
                )}

                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">
                    Total Amount
                  </span>
                  <span className="text-2xl font-bold">
                    ₹{total}
                  </span>
                </div>

                <button
                  onClick={handleBuyNow}
                  disabled={loading}
                  className="
                    w-full
                    bg-blue-600 hover:bg-blue-700
                    text-white
                    font-semibold
                    rounded-xl
                    py-3.5
                    flex items-center justify-center gap-2
                    disabled:opacity-60
                  "
                >
                  Proceed to Checkout
                  <FiArrowRight />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
