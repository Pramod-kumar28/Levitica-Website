
import toast from 'react-hot-toast';
import {
  useAddItemMutation,
  useRemoveItemMutation,
  useClearCartMutation,
} from '@/Services/student/cartServices';

export const useCartHandlers = () => {
  const [addItemTrigger, addStatus] = useAddItemMutation();
  const [removeItemTrigger, removeStatus] = useRemoveItemMutation();
  const [clearCartTrigger, clearStatus] = useClearCartMutation();

  const handleAddToCart = async ({ userId, courseId }) => {
    try {
      await addItemTrigger({ userId, courseId }).unwrap();
      toast.success('🛒 Course added to cart!');
    } catch (error) {
      const message = error?.data?.message || '❌ Failed to add to cart.';
      toast.error(message);
    }
  };

  const handleRemoveFromCart = async ({ userId, courseId }) => {
    try {
      await removeItemTrigger({ userId, courseId }).unwrap();
      toast.success('🗑️ Course removed from cart.');
    } catch (error) {
      const message = error?.data?.message || '❌ Failed to remove from cart.';
      toast.error(message);
    }
  };

  const handleClearCart = async (userId) => {
    try {
      await clearCartTrigger(userId).unwrap();
      toast.success('🧹 Cart cleared successfully.');
    } catch (error) {
      const message = error?.data?.message || '❌ Failed to clear cart.';
      toast.error(message);
    }
  };

  return {
    handleAddToCart,
    handleRemoveFromCart,
    handleClearCart,
    addStatus,
    removeStatus,
    clearStatus,
  };
};