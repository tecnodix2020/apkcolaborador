import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Chat from './chat';
import Visita from './formguest';
import Entrega from './formdelivery';

import CustomDrawer from '../components/CustomDrawer';

const Routes = createAppContainer(
  createDrawerNavigator({
    Chat,
    Visita,
    Entrega
  }, {
    initialRouteName: 'Chat',
    contentComponent: CustomDrawer
  })
)

export default Routes;