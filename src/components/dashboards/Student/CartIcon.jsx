// import { ShoppingCart } from 'lucide-react';
import { useCallback, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import CartDrawer from './CartDrawer';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetCartQuery } from '../../../Services/student/cartServices';

const CartIcon = memo(function CartIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const { userId } = useSelector(state => state.auth.user?.id);

  const { data: cartData } = useGetCartQuery(userId, {
    skip: !userId,
  });
  
  const itemCount = cartData?.items?.length || 0;

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 400, damping: 20 }
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  

  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleOpen = useCallback((e) => {
    e.stopPropagation();
    setIsOpen(true);
  }, []);
const ShoppingCart = () => <span className='fs-4'>🛒</span>
  console.log("CartIcon rendered");

  return (
    <>
      <div className="cart-icon-wrapper" onClick={handleOpen} aria-label="Shopping cart">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: itemCount > 0 ? 1.05 : 1 }}
          transition={{ repeat: itemCount > 0 ? Infinity : 0, repeatType: 'reverse', duration: 0.6 }}
        >
          <ShoppingCart size={24} className="cart-icon" />
        </motion.div>

        <AnimatePresence>
          {itemCount > 0 && (
            <motion.div
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="cart-badge"
            >
              {itemCount}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Move CartDrawer outside of the clickable area */}
      <div >

      <CartDrawer isOpen={isOpen} onClose={handleClose} />
      </div>

      <style>{`
        .cart-icon-wrapper {
          position: relative;
          display: inline-block;
          cursor: pointer;
        }

        .cart-icon {
          color: #374151;
          transition: transform 0.2s ease;
        }

        .cart-icon-wrapper:hover .cart-icon {
          transform: scale(1.1);
        }

        .cart-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background-color: #dc2626;
          color: white;
          font-size: 10px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          border: 2px;
        }
      `}</style>
    </>
  );
});

export default CartIcon;