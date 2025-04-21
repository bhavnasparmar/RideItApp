import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Platform} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {AppearanceContext} from '../../context/appearanceContext';

import {
  fontFamily,
  fontSize,
  isIpad,
  responsiveWidth,
} from '../../styles/variables';
import CusText from '../../ui/custom-text';
import Wrapper from '../../ui/wrapper';
import Dashboard from '../../screens/home/Dashboard/Dashboard';

const Tab = createBottomTabNavigator();
type TabViewProps = {
  focused: boolean;
  source: any;
  page: string;
};

const Tabs = ({route}: any) => {
  const navigation: any = useNavigation();
  const {colors}: any = React.useContext(AppearanceContext);
  const [tabIndex, setTabIndex] = useState<any>(0);

  const screenOptions: any = {
    headerShown: false,
    tabBarActiveTintColor: colors.secondary,
    tabBarDeactiveTintColor: colors.Hard_White,
    tabBarStyle: {
      backgroundColor: colors.bottomTabBG1,
      paddingHorizontal: responsiveWidth(3),
      borderTopWidth: 0,

      height:
        Platform.OS === 'ios' && !isIpad()
          ? responsiveWidth(18)
          : isIpad()
          ? responsiveWidth(10)
          : responsiveWidth(15),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.28,
      shadowRadius: 16.0,
      elevation: 24,
    },

    tabBarShowLabel: false,

    tabBarItemStyle: {
      margin: Platform.OS === 'ios' ? responsiveWidth(3) : responsiveWidth(3),
      flexDirection: 'column',

      height:
        Platform.OS === 'ios' && !isIpad()
          ? responsiveWidth(10)
          : isIpad()
          ? responsiveWidth(9)
          : responsiveWidth(16),
    },
    tabBarLabelStyle: {
      color: colors.black,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.extraSmall,
      width: '100%',
    },
  };

  const TabView = ({focused, source, page, type}: any) => {
    return (
      <>
        <Wrapper
          justify="center"
          align="center"
          width={responsiveWidth(20)}
          customStyles={{}}>
          <Wrapper row customStyles={{position: 'relative', zIndex: 0}}>
            {type === 'image' ? (
              <Image
                source={source}
                resizeMode="contain"
                style={{
                  tintColor:
                    focused && tabIndex >= 0 ? null : colors.inputLabel,
                  height: responsiveWidth(8),
                  width: responsiveWidth(8),
                }}
              />
            ) : (
              <IonIcon
                name={source}
                style={{
                  color:
                    focused && tabIndex >= 0 ? colors.Hard_White : colors.gray,
                  fontSize: isIpad() ? responsiveWidth(4) : 22,
                  width: '100%',
                }}
              />
            )}
          </Wrapper>
          <CusText
            position="center"
            color={
              focused && tabIndex >= 0 ? colors.primary1 : colors.inputLabel
            }
            customStyles={{}}
            text={page}
          />
        </Wrapper>
      </>
    );
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={screenOptions}
        tabBar={props => {
          const newRoutes = props.state.routes.slice(0, 4);
          const newIndex = newRoutes.findIndex(
            route => route.key === props.state.routes[props.state.index].key,
          );
          const newState = {
            ...props.state,
            routes: newRoutes,
            index: newIndex >= 0 ? newIndex : 0,
          };
          setTabIndex(newIndex);
          return <BottomTabBar {...props} state={newState} />;
        }}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({focused}: any) => (
              <TabView
                page="Dashboard"
                focused={focused}
                source={require('../../assets/Images/wifi.png')}
                type={'image'}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Tabs;
