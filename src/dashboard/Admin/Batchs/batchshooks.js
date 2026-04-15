import { toast } from "react-hot-toast";
import {
  useAddBatchMutation,
  useUpdateBatchMutation,
  useDeleteBatchMutation,
} from '@/Services/admin/batchdetailsService'; // adjust path if needed

export const useBatchHandlers = () => {
  const [addBatchTrigger, addStatus] = useAddBatchMutation();
  const [updateBatchTrigger, updateStatus] = useUpdateBatchMutation();
  const [deleteBatchTrigger, deleteStatus] = useDeleteBatchMutation();

  const handleAddBatchSubmit = async (values) => {
    try {
      await addBatchTrigger(values).unwrap();
      toast.success("🎉 Batch added successfully!");
    } catch (error) {
      const message = error?.data?.message || "❌ Failed to add batch.";
      toast.error(message);
    }
  };

  const handleUpdateBatchSubmit = async (values) => {
    try {
      const { batchId, ...updatedData } = values;
      await updateBatchTrigger({ batchId, updatedData }).unwrap();
      toast.success("✅ Batch updated successfully!");
    } catch (error) {
      const message = error?.data?.message || "❌ Failed to update batch.";
      toast.error(message);
    }
  };

  const handleDeleteBatch = async (batchId) => {
    try {
      await deleteBatchTrigger(batchId).unwrap();
      toast.success("🗑️ Batch deleted successfully!");
    } catch (error) {
      const message = error?.data?.message || "❌ Failed to delete batch.";
      toast.error(message);
    }
  };

  return {
    handleAddBatchSubmit,
    handleUpdateBatchSubmit,
    handleDeleteBatch,
    addStatus,
    updateStatus,
    deleteStatus,
  };
};