import uuid from 'uuid/v1';
import moment from 'moment';
import mock from 'src/utils/mock';

mock.onGet('/api/kanban').reply(200, {
  lists: [
    {
      id: 'incoming',
      title: 'Incoming'
    },
    {
      id: 'in_progress',
      title: 'In progress'
    },
    {
      id: 'in_review',
      title: 'In review'
    },
    {
      id: 'completed',
      title: 'Completed'
    }
  ],
  tasks: [
    {
      id: uuid(),
      ref: '38',
      list: 'incoming',
      title: 'Deploy',
      desc:
        'Test.',
      members: [
        '/images/avatars/avatar_1.png',
        '/images/avatars/avatar_5.png',
        '/images/avatars/avatar_6.png'
      ],
      files: 0,
      comments: 1,
      progress: 0,
      deadline: moment().add(7, 'days')
    },
    {
      id: uuid(),
      ref: '37',
      list: 'incoming',
      title: 'Add backend support for this feature eventually.',
      desc:
        'We are looking for vue experience and of course node js strong knowledge',
      members: ['/images/avatars/avatar_2.png', '/images/avatars/avatar_3.png'],
      files: 0,
      comments: 2,
      progress: 0,
      deadline: moment().add(6, 'days')
    }
  ]
});
