import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import Option from '../screens/option';
import FormGuest from '../screens/formguest';
import FormDelivery from '../screens/formdelivery';
import FormUser from '../screens/formuser';

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
    FormGuest: {
        screen: FormGuest,
        navigationOptions: {
            title: 'OPÇÕES DO COLABORADOR'
        }
    },
    FormDelivery: {
        screen: FormDelivery,
        navigationOptions: {
            title: 'OPÇÕES DO COLABORADOR'
        }
    },
    FormUser: {
        screen: FormUser,
        navigationOptions: {
            title: 'CRIAÇÃO DE USUÁRIO'
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