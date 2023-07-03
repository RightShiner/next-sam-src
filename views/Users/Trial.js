import _ from 'lodash';
import React, { useCallback } from 'react';
import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import { Box } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { trialService } from 'services';
import { TrialCreate } from './components/TrialCreate';
import { TrialList } from './components/TrialList';
import { TrialUserList } from './components/TrialUserList';

const Trial = () => {
  const [trials, setTrials] = useState([]);
  const [trialUsers, setTrialUsers] = useState([]);

  const fetchTrial = useCallback(async () => {
    await trialService.findAll().then((response) => {
      if (response.status !== 'ok') return;

      const trials = _.map(response.trials, (trial) => {
        const isAvailable = !trial.disabled && trial.usage < trial.limit;
        return {
          ...trial,
          createdDate: moment(trial.createdAt).format('YYYY-MM-DD'),
          isAvailable,
        };
      });

      setTrials(trials);
    });
  }, []);

  const fetchTrialUsers = useCallback(async () => {
    await trialService.findAllTrialUsers().then((response) => {
      if (response.status !== 'ok') return;

      const trialUsers = _.map(response.trialUsers, (trialUser) => {
        return {
          ...trialUser,
          createdDate: moment(trialUser.createdAt).format('YYYY-MM-DD'),
        };
      });

      setTrialUsers(trialUsers);
    });
  }, []);

  useEffect(() => {
    fetchTrial();
  }, [fetchTrial]);

  useEffect(() => {
    fetchTrialUsers();
  }, [fetchTrialUsers]);

  return (
    <Fixed>
      <Container>
        <Box paddingTop={2}>
          <TrialCreate fetchTrial={fetchTrial} />
        </Box>
        <Box marginTop={8}>
          <TrialList trials={trials} fetchTrial={fetchTrial} />
        </Box>
        <Box marginTop={8}>
          <TrialUserList trialUsers={trialUsers} />
        </Box>
      </Container>
    </Fixed>
  );
};

export default Trial;
