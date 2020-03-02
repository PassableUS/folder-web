/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import { colors } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ListIcon from '@material-ui/icons/List';
import DirectionsIcon from '@material-ui/icons/Directions';
import Label from 'src/components/Label';

export default [
  {
    subheader: 'For You',
    items: [
      {
        title: 'Overview',
        href: '/overview',
        icon: HomeIcon
      },
      {
        title: 'Pathways',
        href: '/projects',
        icon: DirectionsIcon,
        items: [
          {
            title: 'Browse',
            href: '/pathways'
          },
          {
            title: 'Create',
            href: '/pathways/create'
          }
        ]
      },
      {
        title: 'Modules',
        href: '/modules',
        icon: DashboardIcon,
        items: [
          {
            title: 'Browse',
            href: '/modules'
          },
          {
            title: 'Create',
            href: '/modules/create'
          }
        ]
      },
      {
        title: 'Bulletin Board',
        href: '/bulletin-board',
        icon: ListAltIcon
      },
      {
        title: 'Calendar',
        href: '/calendar',
        icon: CalendarTodayIcon,
        label: () => <Label color={colors.red[500]}>WIP</Label>
      }
    ]
  },
  {
    subheader: 'Support',
    items: [
      {
        title: 'Changelog',
        href: '/changelog',
        icon: ListIcon,
        label: () => <Label color={colors.blue['500']}>v0.0.5 BETA</Label>
      },
      {
        title: 'Settings',
        href: '/settings',
        icon: SettingsIcon,
        items: [
          {
            title: 'General',
            href: '/settings/general'
          },
          {
            title: 'Subscription',
            href: '/settings/subscription'
          },
          {
            title: 'Notifications',
            href: '/settings/notifications'
          },
          {
            title: 'Security',
            href: '/settings/security'
          }
        ]
      }
    ]
  }
];
