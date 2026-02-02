import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Video,
  Clock,
  Calendar,
  User,
  PlayCircle,
  CheckCircle,
  AlertCircle,
  BookOpen
} from 'lucide-react';

import { useGetLiveClassesQuery } from '../../../Services/student/liveClassServices';
import { useJoinLiveClass } from '../../../hooks/useJoinLiveClass';

const LiveClasses = () => {
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [currentTime, setCurrentTime] = useState(new Date());

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

  return (
    <div className="tw-space-y-8">
      {/* Header */}
      <div>
        <h1 className="tw-text-2xl tw-font-bold">Live Classes</h1>
        <p className="tw-text-sm tw-text-gray-500">
          Join your scheduled live sessions
        </p>
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
                className="tw-bg-white tw-border tw-rounded-xl tw-p-5 tw-flex tw-flex-col"
              >
                {/* Header */}
                <div className="tw-flex tw-items-center tw-justify-between">
                  <h3 className="tw-font-semibold tw-text-sm">
                    {liveClass.title}
                  </h3>

                  {status === 'live' && (
                    <span className="tw-text-xs tw-font-semibold tw-text-red-600 tw-flex tw-items-center tw-gap-1">
                      🔴 LIVE
                    </span>
                  )}
                  {status === 'upcoming' && (
                    <span className="tw-text-xs tw-font-medium tw-text-yellow-600">
                      ⏰ UPCOMING
                    </span>
                  )}
                  {status === 'completed' && (
                    <span className="tw-text-xs tw-font-medium tw-text-green-600">
                      ✅ COMPLETED
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="tw-mt-4 tw-space-y-2 tw-text-sm tw-text-gray-600">
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <BookIcon />
                    <span>{liveClass.course?.name || 'N/A'}</span>
                  </div>

                  {liveClass.batch?.batchName && (
                    <div className="tw-flex tw-items-center tw-gap-2">
                      <Calendar size={14} />
                      <span>{liveClass.batch.batchName}</span>
                    </div>
                  )}

                  <div className="tw-flex tw-items-center tw-gap-2">
                    <Clock size={14} />
                    <span>
                      Daily at {formatTime(liveClass.startTime)}
                    </span>
                  </div>

                  <div className="tw-flex tw-items-center tw-gap-2">
                    <Video size={14} />
                    <span>{liveClass.duration} minutes</span>
                  </div>

                  {liveClass.instructor?.name && (
                    <div className="tw-flex tw-items-center tw-gap-2">
                      <User size={14} />
                      <span>{liveClass.instructor.name}</span>
                    </div>
                  )}
                </div>

                {/* Action */}
                <div className="tw-mt-5">
                  {canJoin ? (
                    <button
                      onClick={() => joinClass(liveClass._id)}
                      className="
                        tw-w-full
                        tw-flex
                        tw-items-center
                        tw-justify-center
                        tw-gap-2
                        tw-bg-red-600
                        hover:tw-bg-red-700
                        tw-text-white
                        tw-py-2.5
                        tw-rounded-lg
                        tw-font-medium
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
                        tw-bg-yellow-100
                        tw-text-yellow-700
                        tw-py-2.5
                        tw-rounded-lg
                        tw-text-sm
                      "
                    >
                      Starts at {formatTime(liveClass.startTime)}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="
                        tw-w-full
                        tw-bg-gray-100
                        tw-text-gray-500
                        tw-py-2.5
                        tw-rounded-lg
                        tw-text-sm
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
            <h3 className="tw-mt-4 tw-font-semibold">
              No Live Classes
            </h3>
            <p className="tw-text-gray-500">
              Check back later for upcoming sessions
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/* Small icon helper */
const BookIcon = () => <BookOpen size={14} />;

export default LiveClasses;
