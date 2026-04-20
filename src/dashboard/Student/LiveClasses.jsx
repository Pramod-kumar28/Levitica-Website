import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Video,
  Clock,
  Calendar,
  User,
  PlayCircle,
  AlertCircle,
  BookOpen
} from 'lucide-react';
import { FiFilter } from 'react-icons/fi';
import { useGetLiveClassesQuery } from '@/Services/student/liveClassServices';
import { useJoinLiveClass } from '@/hooks/useJoinLiveClass';
import { useTheme } from '@/context/ThemeContext';

const LiveClasses = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [filteredClasses, setFilteredClasses] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCourse, setSelectedCourse] = useState('all'); // Add state
  const [selectedBatch, setSelectedBatch] = useState('all'); // Add state

  const {
    data: liveClassesData,
    isLoading,
    error,
    refetch,
  } = useGetLiveClassesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { joinClass } = useJoinLiveClass();

  /* 🔄 Update time every 30s */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  /* 🔍 Filtering */
  useEffect(() => {
    if (!liveClassesData?.liveClasses) return;

    let filtered = liveClassesData.liveClasses;

    if (selectedCourse !== 'all') {
      filtered = filtered.filter(
        cls => cls.course?._id === selectedCourse
      );
    }

    if (selectedBatch !== 'all') {
      filtered = filtered.filter(
        cls => cls.batch?._id === selectedBatch
      );
    }

    setFilteredClasses(filtered);
  }, [liveClassesData, selectedCourse, selectedBatch]);

  /* 🧠 Helpers */
  const formatTime = date =>
    new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

  const shouldShowJoinButton = (startTime, duration) => {
    const classTime = new Date(startTime);
    const nowMinutes =
      currentTime.getHours() * 60 + currentTime.getMinutes();
    const startMinutes =
      classTime.getHours() * 60 + classTime.getMinutes();
    const endMinutes = startMinutes + duration;

    return nowMinutes >= startMinutes && nowMinutes <= endMinutes;
  };

  const isUpcomingToday = startTime => {
    const classTime = new Date(startTime);
    const nowMinutes =
      currentTime.getHours() * 60 + currentTime.getMinutes();
    const startMinutes =
      classTime.getHours() * 60 + classTime.getMinutes();
    return nowMinutes < startMinutes;
  };

  const getDailyStatus = (startTime, duration) => {
    if (shouldShowJoinButton(startTime, duration)) return 'live';
    if (isUpcomingToday(startTime)) return 'upcoming';
    return 'completed';
  };

  /* ⏳ Loading */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className={isDark ? 'text-slate-400' : 'text-gray-500'}>Loading live classes...</p>
      </div>
    );
  }

  /* ❌ Error */
  if (error) {
    return (
      <div className="text-center py-16">
        <AlertCircle size={40} className={`mx-auto ${isDark ? 'text-red-500' : 'text-red-500'}`} />
        <h3 className={`mt-4 font-semibold ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>
          Failed to load classes
        </h3>
        <button
          onClick={refetch}
          className={`mt-4 px-4 py-2 rounded-lg text-white ${
            isDark
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Try Again
        </button>
      </div>
    );
  }

  // Extract unique courses and batches for filters
  const uniqueCourses = Array.from(
    new Map(
      (liveClassesData?.liveClasses || [])
        .filter(cls => cls.course)
        .map(cls => [cls.course._id, { id: cls.course._id, name: cls.course.name }])
    ).values()
  );
  const uniqueBatches = Array.from(
    new Map(
      (liveClassesData?.liveClasses || [])
        .filter(cls => cls.batch)
        .map(cls => [cls.batch._id, { id: cls.batch._id, name: cls.batch.batchName }])
    ).values()
  );

  return (
    <div className={`min-h-screen p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 ${
      isDark ? 'bg-slate-900' : 'bg-gray-50'
    }`}>

      {/* ===== Page Header with Gradient ===== */}
      <div className={`rounded-xl sm:rounded-3xl p-4 sm:p-8 shadow-lg ${
        isDark
          ? 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800'
          : 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              Live Classes
            </h1>
            <p className={`text-sm sm:text-base flex items-center gap-2 ${
              isDark ? 'text-slate-300' : 'text-blue-100'
            }`}>
              <Video className="w-4 h-4" />
              Join your scheduled live sessions
            </p>
          </div>
        </div>
      </div>

      {/* ===== Filters Card ===== */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl border p-4 sm:p-6 shadow-sm backdrop-blur-sm ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-gray-200'
        }`}>
        <h3 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${
          isDark ? 'text-slate-200' : 'text-gray-900'
        }`}>
          <FiFilter className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          Filter Classes
        </h3>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">

          {/* Course Filter */}
          <div>
            <label className={`block text-xs sm:text-sm font-medium mb-2 ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>
              Filter by Course
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className={`w-full rounded-lg border py-2.5 px-3 text-sm focus:ring-2 focus:outline-none transition cursor-pointer ${
                isDark
                  ? 'bg-slate-700 border-slate-600 text-slate-200 focus:border-blue-500 focus:ring-blue-500/20'
                  : 'bg-gray-50 border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            >
              <option value="all">All Courses</option>
              {uniqueCourses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Batch Filter */}
          <div>
            <label className={`block text-xs sm:text-sm font-medium mb-2 ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>
              Filter by Batch
            </label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className={`w-full rounded-lg border py-2.5 px-3 text-sm focus:ring-2 focus:outline-none transition cursor-pointer ${
                isDark
                  ? 'bg-slate-700 border-slate-600 text-slate-200 focus:border-blue-500 focus:ring-blue-500/20'
                  : 'bg-gray-50 border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            >
              <option value="all">All Batches</option>
              {uniqueBatches.map(batch => (
                <option key={batch.id} value={batch.id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* ===== Stats ===== */}
      <div className={`border rounded-xl px-4 py-3 sm:py-4 ${
        isDark
          ? 'bg-slate-700/50 border-slate-600'
          : 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-100'
      }`}>
        <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
          <span className={`font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{filteredClasses.length}</span>
          <span className={isDark ? 'text-slate-400' : 'text-gray-600'}> of </span>
          <span className={`font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{liveClassesData?.liveClasses?.length || 0}</span>
          <span className={isDark ? 'text-slate-400' : 'text-gray-600'}> live sessions</span>
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.length > 0 ? (
          filteredClasses.map(liveClass => {
            const status = getDailyStatus(
              liveClass.startTime,
              liveClass.duration
            );
            const canJoin = shouldShowJoinButton(
              liveClass.startTime,
              liveClass.duration
            );


            return (
              <motion.div
                key={liveClass._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className={`rounded-2xl border shadow-sm hover:shadow-xl transition overflow-hidden flex flex-col group ${
                  isDark
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                {/* Status Header Bar */}
                <div className={`h-1.5 bg-gradient-to-r transition group-hover:shadow-md ${
                  isDark
                    ? 'from-slate-700 to-slate-600 group-hover:from-slate-600 group-hover:to-slate-500'
                    : 'from-blue-600 to-cyan-600 group-hover:from-blue-700 group-hover:to-cyan-700'
                }`} />

                {/* Content */}
                <div className="p-4 sm:p-5 lg:p-6 flex flex-col h-full">
                  {/* Title & Status Badge */}
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <h3 className={`font-bold text-base sm:text-lg lg:text-xl line-clamp-2 flex-1 ${
                      isDark ? 'text-slate-100' : 'text-gray-900'
                    }`}>
                      {liveClass.title}
                    </h3>
                    <div>
                      {status === 'live' && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white animate-pulse inline-flex items-center gap-1 shadow-md whitespace-nowrap">
                          LIVE
                        </span>
                      )}
                      {status === 'upcoming' && (
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1 shadow-md whitespace-nowrap ${
                          isDark
                            ? 'bg-amber-900/40 text-amber-300 border border-amber-700/30'
                            : 'bg-amber-500 text-white'
                        }`}>
                          Upcoming
                        </span>
                      )}
                      {status === 'completed' && (
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1 shadow-md whitespace-nowrap ${
                          isDark
                            ? 'bg-green-900/40 text-green-300 border border-green-700/30'
                            : 'bg-green-500 text-white'
                        }`}>
                          Completed
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Meta Information Boxes */}
                  <div className="space-y-2 sm:space-y-2.5 flex-1 mb-4">
                    {/* Course */}
                    <div className={`flex items-center gap-2 text-xs sm:text-sm rounded-lg p-2 sm:p-2.5 ${
                      isDark
                        ? 'bg-slate-700 text-slate-300'
                        : 'bg-blue-50 text-gray-700'
                    }`}>
                      <BookOpen className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${
                        isDark ? 'text-blue-400' : 'text-blue-600'
                      }`} />
                      <span className="font-medium truncate">{liveClass.course?.name || "—"}</span>
                    </div>

                    {/* Batch */}
                    <div className={`flex items-center gap-2 text-xs sm:text-sm rounded-lg p-2 sm:p-2.5 ${
                      isDark
                        ? 'bg-slate-700 text-slate-300'
                        : 'bg-purple-50 text-gray-700'
                    }`}>
                      <User className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${
                        isDark ? 'text-purple-400' : 'text-purple-600'
                      }`} />
                      <span className="font-medium truncate">{liveClass.batch?.batchName || "—"}</span>
                    </div>

                    {/* Date & Time Grid */}
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                      <div className={`flex items-center gap-1.5 text-xs rounded-lg p-2 sm:p-2.5 ${
                        isDark
                          ? 'bg-slate-700 text-slate-300'
                          : 'bg-green-50 text-gray-700'
                      }`}>
                        <Calendar className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${
                          isDark ? 'text-green-400' : 'text-green-600'
                        }`} />
                        <span className="font-medium truncate">
                          {new Date(liveClass.startTime).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div className={`flex items-center gap-1.5 text-xs rounded-lg p-2 sm:p-2.5 ${
                        isDark
                          ? 'bg-slate-700 text-slate-300'
                          : 'bg-orange-50 text-gray-700'
                      }`}>
                        <Clock className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${
                          isDark ? 'text-orange-400' : 'text-orange-600'
                        }`} />
                        <span className="font-medium truncate">{formatTime(liveClass.startTime)}</span>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className={`text-xs rounded-lg p-2 sm:p-2.5 font-medium ${
                      isDark
                        ? 'bg-slate-700 text-slate-300'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Video className={`inline w-3 h-3 mr-1 ${isDark ? 'text-purple-400' : ''}`} /> {liveClass.duration} min
                    </div>

                    {/* Instructor */}
                    {liveClass.instructor?.name && (
                      <div className={`text-xs rounded-lg p-2 sm:p-2.5 font-medium ${
                        isDark
                          ? 'bg-slate-700 text-indigo-300'
                          : 'bg-indigo-50 text-indigo-700'
                      }`}>
                        👨‍🏫 {liveClass.instructor.name}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className={`space-y-2 border-t pt-3 sm:pt-4 ${
                    isDark ? 'border-slate-700' : 'border-gray-200'
                  }`}>
                    {canJoin ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => joinClass(liveClass._id)}
                        className={`w-full flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl py-2 sm:py-2.5 text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition ${
                          isDark
                            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                            : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                        }`}
                      >
                        <PlayCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Join Class</span>
                      </motion.button>
                    ) : status === 'upcoming' ? (
                      <button
                        disabled
                        className={`w-full py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg border-2 ${
                          isDark
                            ? 'text-amber-300 bg-amber-900/20 border-amber-700/30'
                            : 'text-amber-700 bg-amber-50 border-amber-200'
                        }`}
                      >
                        Starts at {formatTime(liveClass.startTime)}
                      </button>
                    ) : (
                      <button
                        disabled
                        className={`w-full py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg border-2 ${
                          isDark
                            ? 'text-slate-500 bg-slate-700 border-slate-600'
                            : 'text-gray-500 bg-gray-100 border-gray-200'
                        }`}
                      >
                        Completed
                      </button>
                    )}

                  
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-16">
            <Calendar size={48} className={`mx-auto ${isDark ? 'text-slate-600' : 'text-gray-400'}`} />
            <h3 className={`mt-4 font-semibold ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>
              No Live Classes Found
            </h3>
            <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              {selectedCourse !== 'all' || selectedBatch !== 'all'
                ? 'No classes match your filters. Try different options.'
                : 'Check back later for upcoming sessions'
              }
            </p>
            {(selectedCourse !== 'all' || selectedBatch !== 'all') && (
              <button
                onClick={() => {
                  setSelectedCourse('all');
                  setSelectedBatch('all');
                }}
                className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isDark
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveClasses;