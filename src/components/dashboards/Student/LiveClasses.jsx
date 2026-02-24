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
import { useGetLiveClassesQuery } from '../../../Services/student/liveClassServices';
import { useJoinLiveClass } from '../../../hooks/useJoinLiveClass';

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
      <div className="tw-flex tw-items-center tw-justify-center tw-h-64">
        <p className="tw-text-gray-500">Loading live classes...</p>
      </div>
    );
  }

  /* ❌ Error */
  if (error) {
    return (
      <div className="tw-text-center tw-py-16">
        <AlertCircle size={40} className="tw-mx-auto tw-text-red-500" />
        <h3 className="tw-mt-4 tw-font-semibold">
          Failed to load classes
        </h3>
        <button
          onClick={refetch}
          className="tw-mt-4 tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Extract unique courses and batches for filters
  const uniqueCourses = [...new Set(liveClassesData?.liveClasses
    ?.filter(cls => cls.course)
    .map(cls => ({ id: cls.course._id, name: cls.course.name })) || [])];

  const uniqueBatches = [...new Set(liveClassesData?.liveClasses
    ?.filter(cls => cls.batch)
    .map(cls => ({ id: cls.batch._id, name: cls.batch.batchName })) || [])];

  return (
    <div className="tw-space-y-8 tw-p-6">
      {/* Header */}
      <div>
        <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Live Classes</h1>
        <p className="tw-text-sm tw-text-gray-500">
          Join your scheduled live sessions
        </p>
      </div>

      {/* Filters */}
      <div className="tw-flex tw-flex-wrap tw-gap-4 tw-mb-6">
        {/* Course Filter */}
        <div className="tw-flex tw-flex-col">
          <label className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
            Filter by Course
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="tw-border tw-border-gray-300 tw-rounded-lg tw-px-3 tw-py-2 tw-bg-white tw-text-sm"
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
        <div className="tw-flex tw-flex-col">
          <label className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
            Filter by Batch
          </label>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="tw-border tw-border-gray-300 tw-rounded-lg tw-px-3 tw-py-2 tw-bg-white tw-text-sm"
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
        tw-grid
        tw-grid-cols-1
        sm:tw-grid-cols-2
        lg:tw-grid-cols-3
        tw-gap-6
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
                  tw-bg-white 
                  tw-border 
                  tw-border-gray-200 
                  tw-rounded-xl 
                  tw-p-5 
                  tw-flex 
                  tw-flex-col
                  tw-shadow-sm
                  hover:tw-shadow-md
                  tw-transition-shadow
                  tw-duration-200
                "
              >
                {/* Header */}
                <div className="tw-flex tw-items-center tw-justify-between">
                  <h3 className="tw-font-semibold tw-text-lg tw-text-gray-900">
                    {liveClass.title}
                  </h3>

                  {status === 'live' && (
                    <span className="
                      tw-text-xs 
                      tw-font-semibold 
                      tw-text-red-600 
                      tw-flex 
                      tw-items-center 
                      tw-gap-1
                      tw-bg-red-50
                      tw-px-2
                      tw-py-1
                      tw-rounded-full
                    ">
                       LIVE
                    </span>
                  )}
                  {status === 'upcoming' && (
                    <span className="
                      tw-text-xs 
                      tw-font-medium 
                      tw-text-yellow-600
                      tw-bg-yellow-50
                      tw-px-2
                      tw-py-1
                      tw-rounded-full
                    ">
                       UPCOMING
                    </span>
                  )}
                  {status === 'completed' && (
                    <span className="
                      tw-text-xs 
                      tw-font-medium 
                      tw-text-green-600
                      tw-bg-green-50
                      tw-px-2
                      tw-py-1
                      tw-rounded-full
                    ">
                       COMPLETED
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="tw-mt-4 tw-space-y-3 tw-text-sm tw-text-gray-600">
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <BookOpen size={16} className="tw-text-blue-600" />
                    <span className="tw-font-medium">{liveClass.course?.name || 'N/A'}</span>
                  </div>

                  {liveClass.batch?.batchName && (
                    <div className="tw-flex tw-items-center tw-gap-2">
                      <Calendar size={16} className="tw-text-purple-600" />
                      <span>{liveClass.batch.batchName}</span>
                    </div>
                  )}

                  <div className="tw-flex tw-items-center tw-gap-2">
                    <Clock size={16} className="tw-text-amber-600" />
                    <span>
                      Daily at {formatTime(liveClass.startTime)}
                    </span>
                  </div>

                  <div className="tw-flex tw-items-center tw-gap-2">
                    <Video size={16} className="tw-text-red-600" />
                    <span>{liveClass.duration} minutes</span>
                  </div>

                  {liveClass.instructor?.name && (
                    <div className="tw-flex tw-items-center tw-gap-2">
                      <User size={16} className="tw-text-green-600" />
                      <span>{liveClass.instructor.name}</span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="tw-mt-auto tw-pt-5">
                  {canJoin ? (
                    <button
                      onClick={() => joinClass(liveClass._id)}
                      className="
                        tw-w-full
                        tw-flex
                        tw-items-center
                        tw-justify-center
                        tw-gap-2
                        tw-bg-gradient-to-r
                        tw-from-red-600
                        tw-to-red-700
                        hover:tw-from-red-700
                        hover:tw-to-red-800
                        tw-text-white
                        tw-py-3
                        tw-rounded-lg
                        tw-font-semibold
                        tw-shadow-md
                        hover:tw-shadow-lg
                        tw-transition-all
                        tw-duration-200
                      "
                    >
                      <PlayCircle size={18} />
                      Join Live Class
                    </button>
                  ) : status === 'upcoming' ? (
                    <button
                      disabled
                      className="
                        tw-w-full
                        tw-bg-yellow-50
                        tw-text-yellow-700
                        tw-py-3
                        tw-rounded-lg
                        tw-text-sm
                        tw-font-medium
                        tw-border
                        tw-border-yellow-200
                      "
                    >
                      Starts at {formatTime(liveClass.startTime)}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="
                        tw-w-full
                        tw-bg-gray-50
                        tw-text-gray-500
                        tw-py-3
                        tw-rounded-lg
                        tw-text-sm
                        tw-font-medium
                        tw-border
                        tw-border-gray-200
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
          <div className="tw-col-span-full tw-text-center tw-py-16">
            <Calendar size={48} className="tw-mx-auto tw-text-gray-400" />
            <h3 className="tw-mt-4 tw-font-semibold tw-text-gray-900">
              No Live Classes Found
            </h3>
            <p className="tw-text-gray-500 tw-mt-2">
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
                  tw-mt-4
                  tw-bg-blue-600
                  hover:tw-bg-blue-700
                  tw-text-white
                  tw-px-4
                  tw-py-2
                  tw-rounded-lg
                  tw-text-sm
                  tw-font-medium
                  tw-transition
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