import React from 'react';
import {View,Text} from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Formdelivery from '../screens/Formdelivery';
import Formguest from '../screens/Formguest';

const DrawerNavigator = createDrawerNavigator({
  One: Formdelivery,
  Two: Formguest,
});

export default DrawerNavigator;