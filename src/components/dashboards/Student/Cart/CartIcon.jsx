import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { motion, AnimatePresence } from 'framer-motion';
import CartDrawer from './CartDrawer';
import { FaShoppingCart } from 'react-icons/fa';


const CartIcon = memo(function CartIcon() {
  const [isOpen, setIsOpen] = useState(false);

  const itemCount = useSelector(state => state.cart.items.length);

  const handleOpen = useCallback((e) => {
    e.stopPropagation();
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <div
        onClick={handleOpen}
        className="tw-relative tw-cursor-pointer"
        aria-label="Shopping cart"
      >
        <motion.div
          animate={{ scale: itemCount > 0 ? [1, 1.05, 1] : 1 }}
          transition={{ repeat: itemCount > 0 ? Infinity : 0, duration: 0.6 }}
        >
          <FaShoppingCart size={22} className="tw-text-gray-700" />
        </motion.div>

        <AnimatePresence>
          {itemCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="
                tw-absolute -tw-top-2 -tw-right-2
                tw-bg-red-600 tw-text-white
                tw-text-[10px] tw-w-5 tw-h-5
                tw-rounded-full tw-flex tw-items-center tw-justify-center
              "
            >
              {itemCount}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <CartDrawer isOpen={isOpen} onClose={handleClose} />
    </>
  );
});

export default CartIcon;
