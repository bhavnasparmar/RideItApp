import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import Tabs from '../tab';
import {DrawerContent} from './DrawerContent';

const Drawer = createDrawerNavigator();

function SideDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName={"Tabs"}
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
      }}
      backBehavior="history"
      drawerContent={(props: any) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Tabs" component={Tabs} />
    </Drawer.Navigator>
  );
}

export default SideDrawer;
