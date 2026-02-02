import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  setCartItems,
  selectCartTotal,
} from "../../../../features/cartSlice";
import { useGetCartQuery } from "../../../../Services/student/cartServices";
import { useCartHandlers } from "./cartHandlers";
import {
  FiX,
  FiTrash2,
  FiShoppingBag,
  FiArrowRight,
} from "react-icons/fi";
import { useEffect } from "react";
import { useCheckoutHandler } from "../../../../features/paymentFlow";

export default function CartDrawer({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;

  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const { data: cartData } = useGetCartQuery(userId, {
    skip: !userId || !isOpen,
  });

  const {
    handleRemoveFromCart,
    handleClearCart,
    removeStatus,
    clearStatus,
  } = useCartHandlers();

  const loading = removeStatus.isLoading || clearStatus.isLoading;
  const { handleCheckout } = useCheckoutHandler();

  useEffect(() => {
    if (cartData?.items) {
      dispatch(setCartItems(cartData.items));
    }
  }, [cartData, dispatch]);

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
          {/* Overlay */}
          <motion.div
            className="tw-fixed tw-inset-0 tw-bg-black/40 tw-z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="
              tw-fixed tw-top-0 tw-right-0 tw-h-full
              tw-w-full sm:tw-w-[420px]
              tw-bg-white tw-z-50
              tw-flex tw-flex-col
            "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* ===== HEADER ===== */}
            <div className="tw-sticky tw-top-0 tw-bg-white tw-z-10 tw-border-b">
              <div className="tw-flex tw-items-center tw-justify-between tw-p-5">
                <div className="tw-flex tw-items-center tw-gap-3">
                  <div className="tw-w-10 tw-h-10 tw-rounded-xl tw-bg-blue-100 tw-flex tw-items-center tw-justify-center">
                    <FiShoppingBag className="tw-text-blue-600 tw-text-lg" />
                  </div>
                  <div>
                    <h2 className="tw-text-xl tw-font-bold">Your Cart</h2>
                    <p className="tw-text-xs tw-text-gray-500">
                      {items.length > 0
                        ? `${items.length} course${items.length > 1 ? "s" : ""} selected`
                        : "No courses added yet"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="tw-p-2 tw-rounded-lg hover:tw-bg-gray-100"
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>

            {/* ===== ITEMS ===== */}
            <div className="tw-flex-1 tw-overflow-y-auto tw-p-5 tw-space-y-4">
              {items.length === 0 ? (
                <div className="tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center">
                  <div className="tw-w-20 tw-h-20 tw-rounded-full tw-bg-gray-100 tw-flex tw-items-center tw-justify-center">
                    <FiShoppingBag size={36} className="tw-text-gray-400" />
                  </div>
                  <h3 className="tw-mt-6 tw-text-lg tw-font-semibold">
                    Your cart is empty
                  </h3>
                  <p className="tw-text-sm tw-text-gray-500 tw-mt-1">
                    Browse courses and add them to your cart
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item._id}
                    className="
                      tw-flex tw-gap-4
                      tw-border tw-rounded-2xl
                      tw-p-4
                      hover:tw-shadow-sm
                      tw-transition
                    "
                  >
                    {/* Image */}
                    <div className="tw-w-20 tw-h-20 tw-rounded-xl tw-overflow-hidden tw-bg-gray-100 tw-flex-shrink-0">
                      <img
                        src={
                          item?.imageUrl ||
                          item?.thumbnail ||
                          item?.course?.thumbnail ||
                          "/img/course-placeholder.png"
                        }
                        alt={item.name}
                        className="tw-w-full tw-h-full tw-object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="tw-flex-1">
                      <div className="tw-flex tw-justify-between tw-items-start">
                        <h4 className="tw-font-semibold tw-text-sm tw-leading-snug tw-line-clamp-2">
                          {item.name}
                        </h4>
                        <button
                          disabled={loading}
                          onClick={() =>
                            handleRemoveFromCart({
                              userId,
                              courseId: item._id,
                            })
                          }
                          className="tw-text-gray-400 hover:tw-text-red-500"
                        >
                          <FiTrash2 />
                        </button>
                      </div>

                      <p className="tw-mt-2 tw-text-base tw-font-bold tw-text-gray-800">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ===== FOOTER ===== */}
            {items.length > 0 && (
              <div className="tw-sticky tw-bottom-0 tw-bg-white tw-border-t tw-p-5">
                <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                  <span className="tw-text-sm tw-text-gray-500">
                    Total Amount
                  </span>
                  <span className="tw-text-2xl tw-font-bold">
                    ₹{total}
                  </span>
                </div>

                <button
                  onClick={handleBuyNow}
                  disabled={loading}
                  className="
                    tw-w-full
                    tw-bg-blue-600 hover:tw-bg-blue-700
                    tw-text-white
                    tw-font-semibold
                    tw-rounded-xl
                    tw-py-3.5
                    tw-flex tw-items-center tw-justify-center tw-gap-2
                    disabled:tw-opacity-60
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
