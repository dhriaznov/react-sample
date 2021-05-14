import React, { useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import './UserStatistics.scss';
import { fetchUsersStats } from '../../../store/actions/users';
import { selectUsersStats, selectUsersStatsLoading } from '../../../store/selectors/users';
import { Loader } from '../../../components';

const LineChart = React.lazy(() => import('../../Dashboard/LineChart/LineChart'));

const UserStatistics = () => {
  const dispatch = useDispatch();
  const usersStats = useSelector(selectUsersStats);
  const usersStatsLoading = useSelector(selectUsersStatsLoading);

  useEffect(() => {
    dispatch(fetchUsersStats());
  }, [dispatch]);

  const isEmptyData = chartData => {
    let daysArray = [];

    chartData.forEach(feature => {
      daysArray = [...daysArray, feature.data.every(day => day.y === 0)];
    });

    return daysArray.every(item => item === true);
  };

  return (
    <div className="UserStatistics">
      <div className="UserStatistics__chart">
        {!isEmpty(usersStats) && !usersStatsLoading ? (
          <Suspense fallback={<div>Loading...</div>}>
            <LineChart data={usersStats} isEmptyData={isEmptyData(usersStats)} />
          </Suspense>
        ) : (
          <div className="Dashboard__chart-placeholder">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export { UserStatistics };
