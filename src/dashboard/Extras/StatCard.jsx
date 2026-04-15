import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const toneStyles = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent/10 text-accent",
  info: "bg-muted text-muted-foreground",
}

const StatCard = ({ label, count, tone = "primary", icon: Icon }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <Card className="relative overflow-hidden border-border/50 bg-card/60 backdrop-blur">

        {/* 🔥 subtle gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

        <CardContent className="p-5 space-y-4 relative z-10">

          {/* ===== HEADER ===== */}
          <div className="flex items-center justify-between">

            {/* BIG BADGE */}
            <div
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide",
                toneStyles[tone]
              )}
            >
              {label}
            </div>

            {/* ICON */}
            {Icon && (
              <div className="flex items-center justify-center size-9 rounded-lg bg-muted/50">
                <Icon size={18} />
              </div>
            )}
          </div>

          {/* ===== VALUE ===== */}
          <div className="text-3xl md:text-4xl font-bold tracking-tight">
            {count}
          </div>

        </CardContent>
      </Card>
    </motion.div>
  )
}

export default StatCard