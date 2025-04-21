/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React, {useState} from 'react';
import {responsiveHeight, colors} from '../../styles/variables';
import CusText from '../../ui/custom-text';

type LogoProps = {
  path?: string;
  uri?: string;
  size: 'xs' | 's' | 'm' | 'l';
  color?: string;
  notext?: boolean;
};

const Logo = ({size, color, notext,uri}: LogoProps) => {
  const [error, seterror] = useState(false);
  return (
    <View>
      {!error ? (
        <Image
          source={
            uri
              ? uri
              : require('../../assets/Images/logo.png')
          }
          style={{
            resizeMode: 'contain',
            height:
              size === 'xs'
                ? responsiveHeight(4.5)
                : size === 's'
                ? responsiveHeight(6)
                : size === 'm'
                ? responsiveHeight(12)
                : size === 'l'
                ? responsiveHeight(15)
                : undefined,
            alignSelf: 'center',

            tintColor: color ? color : undefined,
            // backgroundColor:"yellow",
            width:
              size === 'xs'
                ? responsiveHeight(4.5)
                : size === 's'
                ? responsiveHeight(6)
                : size === 'm'
                ? responsiveHeight(12)
                : size === 'l'
                ? responsiveHeight(15)
                : undefined,
          }}
          onError={() => seterror(true)}
        />
      ) : (
        <CusText text="Comdiary" size="XXL" color={colors.primary} />
      )}
    </View>
  );
};

export default Logo;
