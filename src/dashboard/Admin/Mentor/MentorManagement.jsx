import CreateMentorForm from "./CreateMentorForm";
import MentorTable from "./MentorTable";
import { useTheme } from '@/context/ThemeContext';
import { FiUsers, FiBookOpen, FiAward, FiBriefcase, FiCalendar, FiUserCheck } from 'react-icons/fi';
import { motion } from "framer-motion";

const MentorManagement = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen p-4`}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Premium Header */}
        <div className={`p-4`}>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="min-w-0">
              <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold line-clamp-2 ${
                isDark ? 'text-white' : 'text-midnight_text'
              }`}>
                Mentor Management
              </h1>
              <p className={`text-sm flex items-center gap-2 mt-1 text-gray`}>
                <FiUsers className="h-4 w-4" />
                Manage mentor profiles, expertise, and assignments
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create Mentor Form */}
          <CreateMentorForm />

          {/* Mentor Capabilities Card */}
          <div className={`rounded-xl border shadow-property overflow-hidden ${
            isDark
              ? 'bg-semidark border-dark_border'
              : 'bg-white border-border'
          }`}>
            {/* Header */}
            <div className={`p-4 sm:p-5 border-b ${
              isDark ? 'border-dark_border bg-darklight' : 'border-border bg-light'
            }`}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md flex-shrink-0">
                  <FiUserCheck className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h2 className={`text-base font-bold ${
                    isDark ? 'text-white' : 'text-midnight_text'
                  }`}>
                    Mentor Capabilities
                  </h2>
                  <p className={`text-xs text-gray mt-0.5`}>
                    Roles and responsibilities of mentors
                  </p>
                </div>
              </div>
            </div>

            {/* Permissions List */}
            <div className="p-5 space-y-3">
              {[
                { icon: FiBookOpen, label: 'Create & manage course content' },
                { icon: FiUsers, label: 'Guide and mentor students' },
                { icon: FiAward, label: 'Evaluate assignments & projects' },
                { icon: FiCalendar, label: 'Schedule live mentoring sessions' },
                { icon: FiBriefcase, label: 'Share industry insights & feedback' },
              ].map(({ icon: Icon, label }, idx) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex items-center gap-3 rounded-xl border p-3 transition-all duration-200 ${
                    isDark
                      ? 'border-dark_border bg-darklight hover:border-emerald-500/50'
                      : 'border-border bg-light hover:border-emerald-500/50'
                  }`}
                >
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'
                  }`}>
                    <Icon className={`h-4 w-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                  <span className={`text-sm font-medium ${
                    isDark ? 'text-gray' : 'text-gray'
                  }`}>
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Footer Note */}
            <div className={`p-3 border-t text-center text-xs ${
              isDark ? 'border-dark_border bg-darklight text-gray' : 'border-border bg-light text-gray'
            }`}>
              Mentors have full access to manage courses and guide students
            </div>
          </div>
        </div>

        {/* Mentor Table */}
        <MentorTable />
      </div>
    </div>
  );
};

export default MentorManagement;