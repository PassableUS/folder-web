import uuid from 'uuid/v1';
import moment from 'moment';
import { colors } from '@material-ui/core';
import mock from 'src/utils/mock';

mock.onGet('/api/calendar').reply(200, {
  draft: [],
  events: [
    {
      id: uuid(),
      title: 'Implement Calendar Backend',
      desc: 'This is a bruh moment.',
      color: colors.green['700'],
      start: moment('2019-07-01 16:55:00'),
      end: moment('2019-07-01 17:02:00')
    }
  ]
});
