import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import Option from '../screens/option';

const screens = {
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'TELA INICIAL'
        },
    },
    Option: {
        screen: Option,
        navigationOptions: {
            title: 'OPÇÕES DO COLABORADOR'
        }
    },
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions : {
        headerStyle: {
            backgroundColor: '#009FE3'
        },
        headerShown: false
    }
});

export default createAppContainer(HomeStack);