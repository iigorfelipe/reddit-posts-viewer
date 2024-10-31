import { Posts } from '../models/posts';
import { formatDateToTimestamp } from '../utils/format-date-to-timestamp';

export const fetchPosts = async (startDate: string, endDate: string) => {
  const startDateTimestamp = formatDateToTimestamp(startDate);
  const endDateTimestamp = formatDateToTimestamp(endDate);

  return await Posts.find({
    created_utc: {
      $gte: startDateTimestamp,
      $lte: endDateTimestamp,
    },
  }).sort({ created_utc: -1 });
};

export const fetchSortedPosts = async (startDate: string, endDate: string, order: string) => {
  const startDateTimestamp = formatDateToTimestamp(startDate);
  const endDateTimestamp = formatDateToTimestamp(endDate);
  const sortField = order === 'ups' ? 'ups' : 'num_comments';

  return await Posts.find({
    created_utc: {
      $gte: startDateTimestamp,
      $lte: endDateTimestamp,
    },
  }).sort({ [sortField]: -1 });
};
