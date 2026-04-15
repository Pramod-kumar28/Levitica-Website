import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import {
  FiBox,
  FiBook,
  FiCreditCard,
  FiUserPlus,
} from "react-icons/fi";

const QuickActionsCard = () => {
  const navigate = useNavigate();

  const actions = [
    { label: "Create Batch", icon: FiBox, onClick: () => navigate("batchs") },
    { label: "Create Course", icon: FiBook, onClick: () => navigate("courses") },
    { label: "Payments", icon: FiCreditCard, onClick: () => navigate("payments") },
    {
      label: "Assign Batch",
      icon: FiUserPlus,
      onClick: () => navigate("students/unassigned"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Actions Grid */}
          <div className="grid grid-cols-2 gap-3">
            {actions.map((a, i) => (
              <Button
                key={i}
                onClick={a.onClick}
                variant="outline"
                size="sm"
                className="justify-start gap-2"
              >
                <a.icon size={16} />
                {a.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuickActionsCard;