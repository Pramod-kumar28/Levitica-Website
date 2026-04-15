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
    <div className="space-y-8 lg:p-6 p-1">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Live Classes</h1>
        <p className="text-sm text-gray-500">
          Join your scheduled live sessions
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Course Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Filter by Course
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
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
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Filter by Batch
          </label>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
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
                className="
                  bg-white 
                  border 
                  border-gray-200 
                  rounded-xl 
                  p-5 
                  flex 
                  flex-col
                  shadow-sm
                  hover:shadow-md
                  transition-shadow
                  duration-200
                "
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {liveClass.title}
                  </h3>

                  {status === 'live' && (
                    <span className="
                      text-xs 
                      font-semibold 
                      text-red-600 
                      flex 
                      items-center 
                      gap-1
                      bg-red-50
                      px-2
                      py-1
                      rounded-full
                    ">
                      LIVE
                    </span>
                  )}
                  {status === 'upcoming' && (
                    <span className="
                      text-xs 
                      font-medium 
                      text-yellow-600
                      bg-yellow-50
                      px-2
                      py-1
                      rounded-full
                    ">
                      UPCOMING
                    </span>
                  )}
                  {status === 'completed' && (
                    <span className="
                      text-xs 
                      font-medium 
                      text-green-600
                      bg-green-50
                      px-2
                      py-1
                      rounded-full
                    ">
                      COMPLETED
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="mt-4 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-blue-600" />
                    <span className="font-medium">{liveClass.course?.name || 'N/A'}</span>
                  </div>

                  {liveClass.batch?.batchName && (
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-purple-600" />
                      <span>{liveClass.batch.batchName}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-amber-600" />
                    <span>
                      Daily at {formatTime(liveClass.startTime)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Video size={16} className="text-red-600" />
                    <span>{liveClass.duration} minutes</span>
                  </div>

                  {liveClass.instructor?.name && (
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-green-600" />
                      <span>{liveClass.instructor.name}</span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="mt-auto pt-5">
                  {canJoin ? (
                    <button
                      onClick={() => joinClass(liveClass._id)}
                      className="
                        w-full
                        flex
                        items-center
                        justify-center
                        gap-2
                        bg-gradient-to-r
                        from-red-600
                        to-red-700
                        hover:from-red-700
                        hover:to-red-800
                        text-white
                        py-3
                        rounded-lg
                        font-semibold
                        shadow-md
                        hover:shadow-lg
                        transition-all
                        duration-200
                      "
                    >
                      <PlayCircle size={18} />
                      Join Live Class
                    </button>
                  ) : status === 'upcoming' ? (
                    <button
                      disabled
                      className="
                        w-full
                        bg-yellow-50
                        text-yellow-700
                        py-3
                        rounded-lg
                        text-sm
                        font-medium
                        border
                        border-yellow-200
                      "
                    >
                      Starts at {formatTime(liveClass.startTime)}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="
                        w-full
                        bg-gray-50
                        text-gray-500
                        py-3
                        rounded-lg
                        text-sm
                        font-medium
                        border
                        border-gray-200
                      "
                    >
                      Completed for Today
                    </button>
                  )}
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