import {
  DrawerContentScrollView,
  DrawerItem,
  useDrawerStatus,
} from '@react-navigation/drawer';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {AppearanceContext} from '../../../context/appearanceContext';
import {
  borderRadius,
  colors,
  fontFamily,
  fontSize,
  responsiveHeight,
  responsiveWidth,
  spaceVertical,
} from '../../../styles/variables';
import Container from '../../../ui/container';
import CusButton from '../../../ui/custom-button';
import CusText from '../../../ui/custom-text';
import Wrapper from '../../../ui/wrapper';
import Logo from '../../components/logo';
import Spacer from '../../../ui/spacer';
const logoImg = require('../../../assets/Images/nophoto.jpeg');

export function DrawerContent(props: any) {
  const {colors}: any = React.useContext(AppearanceContext);
  const isDrawerOpen = useDrawerStatus() === 'open';
  const isFocused = useIsFocused();
  useEffect(() => {
    Keyboard.dismiss();
  }, [isDrawerOpen, isFocused]);

  return (
    <>
       <Wrapper row justify='left' align='center' color={colors.sideMenuBg} customStyles={styles.logoContainer}>
            <Wrapper  justify='center' align='center'  customStyles={styles.profiles}>
              <Wrapper customStyles={styles.profileImg}>
                <Logo size="s" uri={logoImg} />
              </Wrapper>
            </Wrapper>
            <Wrapper>
              <CusText
              color={colors.primary}
                customStyles={{width: responsiveWidth(40)}}
                text={'Kavita Patel'}
                extraBold
                size={'N'}
               // color={colors.HARD_WHITE}
              />

              <Spacer y="XS" />
              <Wrapper row>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Profile', {FieldsEdit: true});
                  }}
                  style={[styles.editBtn,{backgroundColor : colors.primary2}]}>
                  <CusText
                    text="Edit Profile"
                    size={'XS'}
                    color={colors.HARD_BLACK}
                  />
                </TouchableOpacity>
              </Wrapper>
            </Wrapper>
          </Wrapper>
      <Container bgcolor={colors.sideMenuBg} contentWidth="100%">
        <DrawerContentScrollView
          style={{paddingTop: 0}}
          contentContainerStyle={{paddingTop: 0}}>
       

          <View style={[styles.menuItem,{}]}>
            {/* <View style={styles.iconSet}></View> */}
            <DrawerItem
              icon={({}) => (
                <IonIcon
                  name="home"
                  color={colors.primary}
                  size={19}
                  style={styles.menuIcon}
                />
              )}
              label={({}) => (
                <CusText
               // size={19}
                  color={colors.primary}
                  style={styles.menuTextstyle}
                  text="Dashboard"
                  size='N'
                />
              )}
              onPress={() => {
                // props.navigation.navigate("Tabs");
                props.navigation.navigate('Dashboard');
              }}
            />
          </View>
        </DrawerContentScrollView>
      </Container>

      <Wrapper
        width={'100%'}
        position="end"
        justify="center"
        align="center"
        customStyles={styles.bottom}
        color={colors.sideMenuBg}>
        <CusButton
        textcolor={colors.Hard_Black}
        iconColor={colors.Hard_Black}
          color={colors.primary2}
          title="Logout"
          position="center"
          radius={borderRadius.large}
          width={responsiveWidth(40)}
          onPress={() => {
            //logout();
          }}
          iconName={'log-out-outline'}
          customStyle={{paddingRight: 15}}
        />
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  profile: {
    borderRadius: borderRadius.medium,
    height: responsiveWidth(12),
    width: responsiveWidth(12),
    marginRight: responsiveWidth(3),
    backgroundColor: colors.HARD_WHITE,
  },
  user: {
    fontFamily: fontFamily.semiBold,
  },
  logo: {
    width: responsiveWidth(21),
    resizeMode: 'contain',
    height: responsiveHeight(9.6),
  },
  iconSet: {
    width: '20%',
    height: '100%',
    // borderRadius: borderRadius.inputRadius,
    // backgroundColor: colors.lightGray,
    position: 'absolute',
    left: '5%',
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  menuTextstyle: {
    fontFamily: fontFamily.semiBold,
    color: colors.Hard_White,
  },
  menuItem: {
    position: 'relative',
  //  borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  menuIcon: {
    // marginLeft: responsiveWidth(4),
    width: 24,
    fontSize: 24,
  },
  icon: {
    color: colors.darkGray,
    fontSize: fontSize.large,
  },
  logout: {
    borderRadius: borderRadius.medium,
    width: responsiveWidth(50),
    marginLeft: responsiveWidth(10),
    marginTop: spaceVertical.small,
  },
  bottom: {
    paddingVertical : Platform.OS === 'ios' ? spaceVertical.XXS : spaceVertical.XXS,
    // paddingBottom:
    //   Platform.OS === 'ios' ? spaceVertical.small : spaceVertical.small,
  },

  logoContainer: {
   // flexDirection: 'row',
   // justifyContent: 'flex-start',
    // alignItems: "center",
    paddingVertical: spaceVertical.small,
    paddingHorizontal: responsiveWidth(3),
  //  backgroundColor: colors.b,
    // borderBottomLeftRadius: borderRadius.boxRadius,
    // borderBottomRightRadius: borderRadius.boxRadius,
  },
  profiles: {
    borderRadius: borderRadius.ring,
    height: responsiveWidth(15),
    width: responsiveWidth(15),
    marginRight: responsiveWidth(5),
    backgroundColor: colors.HARD_WHITE,
  },
  profileImg: {
    borderRadius: borderRadius.ring,
    height: responsiveWidth(12),
    width: responsiveWidth(12),
    overflow: 'hidden',
  },
  editBtn: {
  //  backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveWidth(1),
    borderRadius: borderRadius.medium,
  },
});
