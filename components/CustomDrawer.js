import React from 'react';
import { Dimensions, View, Text, Image, StyleSheet } from 'react-native';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import {
 heightPercentageToDP as hp,
 widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

function CustomDrawer({...props}) {
    return(
        <View>
            <View style={styles.containerImage}>
              <View style={[styles.placeholderLogo]}>
                <Image style={styles.imgLogo} source={require('../img/logo.png')} />
              </View>
            </View>

            <DrawerNavigatorItems {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
  containerImage: {
    flex: 1,
  },
  placeholderLogo: {
    backgroundColor: '#FFFFFF',
    width: Dimensions.get('window').width * 0.25,
    height: Dimensions.get('window').height * 0.25,
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: '70%',
    marginLeft: '30%',
    resizeMode: 'stretch',
  },
  imgLogo: {
    width: wp(45),
    height: hp(25),
    resizeMode: 'stretch',
  }
});

export default CustomDrawer;