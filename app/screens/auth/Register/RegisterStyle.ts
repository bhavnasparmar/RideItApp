import { StyleSheet } from "react-native";
import { borderRadius, colors, responsiveHeight, responsiveWidth } from "../../../styles/variables";


const styles = StyleSheet.create({
    wrapper: {},
    dot: {
        width: responsiveWidth(2),
        height: responsiveHeight(1),
        borderRadius: borderRadius.small,
        marginHorizontal: responsiveWidth(0.5),
        // backgroundColor: colors.gray
    },
    activeDot: {
        width: responsiveWidth(4),
        height: responsiveHeight(1),
        borderRadius: borderRadius.small,
        marginHorizontal: responsiveWidth(0.5),
        // backgroundColor: colors.dotColor
    },
    Wdot: {
        width: responsiveWidth(2),
        height: responsiveHeight(1),
        borderRadius: borderRadius.medium,
        marginHorizontal: responsiveWidth(0.5),
        // backgroundColor: colors.gray
    },
    WactiveDot: {
        width: responsiveWidth(4),
        height: responsiveHeight(1),
        borderRadius: borderRadius.medium,
        marginHorizontal: responsiveWidth(0.5),
        // backgroundColor: colors.dotColor
    },
    sliderImg: {
        height: responsiveHeight(25),
        width: responsiveWidth(100),
    },
    sliderImg1: {
        height: responsiveHeight(60),
        width: responsiveWidth(100),
        marginBottom: responsiveWidth(10)
    },
    logodesign: {
        width: responsiveWidth(50),
        height: responsiveHeight(20)
    },
    socialLogin  : {
        padding : responsiveWidth(3),
        borderRadius : borderRadius.medium,
        borderWidth : 1,
        margin : responsiveWidth(2),
        borderColor : colors.gray
    },
    socialImg : {
        width : responsiveWidth(7),
        height : responsiveWidth(7),
    }
});

export { styles };