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

const LiveClasses = () => {
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
        <p className="text-gray-500">Loading live classes...</p>
      </div>
    );
  }

  /* ❌ Error */
  if (error) {
    return (
      <div className="text-center py-16">
        <AlertCircle size={40} className="mx-auto text-red-500" />
        <h3 className="mt-4 font-semibold">
          Failed to load classes
        </h3>
        <button
          onClick={refetch}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
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
    <div className="space-y-6 sm:space-y-8">

      {/* ===== Page Header with Gradient ===== */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-xl sm:rounded-3xl p-4 sm:p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              Live Classes
            </h1>
            <p className="text-blue-100 text-sm sm:text-base flex items-center gap-2">
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
        className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm backdrop-blur-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiFilter className="w-4 h-4 text-blue-600" />
          Filter Classes
        </h3>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">

          {/* Course Filter */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Filter by Course
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2.5 px-3 text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition cursor-pointer"
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
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Filter by Batch
            </label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2.5 px-3 text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition cursor-pointer"
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
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-xl px-4 py-3 sm:py-4">
        <p className="text-sm text-gray-700">
          <span className="font-bold text-blue-600">{filteredClasses.length}</span>
          <span className="text-gray-600"> of </span>
          <span className="font-bold text-blue-600">{liveClassesData?.liveClasses?.length || 0}</span>
          <span className="text-gray-600"> live sessions</span>
        </p>
      </div>

      {/* Grid */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
      ">
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
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition overflow-hidden flex flex-col group"
              >
                {/* Status Header Bar */}
                <div className="h-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:from-blue-700 group-hover:to-cyan-700 transition" />

                {/* Content */}
                <div className="p-4 sm:p-5 lg:p-6 flex flex-col h-full">
                  {/* Title & Status Badge */}
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <h3 className="font-bold text-base sm:text-lg lg:text-xl text-gray-900 line-clamp-2 flex-1">
                      {liveClass.title}
                    </h3>
                    <div>
                      {status === 'live' && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white animate-pulse inline-flex items-center gap-1 shadow-md whitespace-nowrap">
                          LIVE
                        </span>
                      )}
                      {status === 'upcoming' && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500 text-white inline-flex items-center gap-1 shadow-md whitespace-nowrap">
                          Upcoming
                        </span>
                      )}
                      {status === 'completed' && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-500 text-white inline-flex items-center gap-1 shadow-md whitespace-nowrap">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Meta Information Boxes */}
                  <div className="space-y-2 sm:space-y-2.5 flex-1 mb-4">
                    {/* Course */}
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 bg-blue-50 rounded-lg p-2 sm:p-2.5">
                      <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                      <span className="font-medium truncate">{liveClass.course?.name || "—"}</span>
                    </div>

                    {/* Batch */}
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 bg-purple-50 rounded-lg p-2 sm:p-2.5">
                      <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 flex-shrink-0" />
                      <span className="font-medium truncate">{liveClass.batch?.batchName || "—"}</span>
                    </div>

                    {/* Date & Time Grid */}
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-green-50 rounded-lg p-2 sm:p-2.5">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                        <span className="font-medium truncate">
                          {new Date(liveClass.startTime).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-orange-50 rounded-lg p-2 sm:p-2.5">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600 flex-shrink-0" />
                        <span className="font-medium truncate">{formatTime(liveClass.startTime)}</span>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="text-xs text-gray-600 bg-gray-100 rounded-lg p-2 sm:p-2.5 font-medium">
                      <Video className="inline w-3 h-3 mr-1" /> {liveClass.duration} min
                    </div>

                    {/* Instructor */}
                    {liveClass.instructor?.name && (
                      <div className="text-xs text-gray-600 bg-indigo-50 rounded-lg p-2 sm:p-2.5 font-medium">
                        <span className="text-indigo-700">👨‍🏫 {liveClass.instructor.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 border-t border-gray-200 pt-3 sm:pt-4">
                    {canJoin ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => joinClass(liveClass._id)}
                        className="w-full flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition"
                      >
                        <PlayCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Join Class</span>
                      </motion.button>
                    ) : status === 'upcoming' ? (
                      <button
                        disabled
                        className="w-full py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-amber-700 bg-amber-50 rounded-lg border-2 border-amber-200"
                      >
                        Starts at {formatTime(liveClass.startTime)}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-gray-500 bg-gray-100 rounded-lg border-2 border-gray-200"
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
            <Calendar size={48} className="mx-auto text-gray-400" />
            <h3 className="mt-4 font-semibold text-gray-900">
              No Live Classes Found
            </h3>
            <p className="text-gray-500 mt-2">
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
                className="
                  mt-4
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  text-sm
                  font-medium
                  transition
                "
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