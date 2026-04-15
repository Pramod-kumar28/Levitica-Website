import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const toneMap = {
  primary: "default",
  secondary: "secondary",
  accent: "outline",
  info: "outline",
};

const StatCard = ({ label, count, tone = "primary", icon: Icon }) => (
  <motion.div>
    <Card className="hover:shadow-md transition">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <Badge variant={toneMap[tone]}>
            {label}
          </Badge>

          {Icon && (
            <div className="text-muted-foreground">
              <Icon size={18} />
            </div>
          )}
        </div>

        <div className="mt-3 text-3xl font-bold text-foreground">
          {count}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default StatCard;