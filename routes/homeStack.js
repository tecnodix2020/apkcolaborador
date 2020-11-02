import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import Option from '../screens/option';
import FormGuest from '../screens/formguest';
import FormDelivery from '../screens/formdelivery';
import FormUser from '../screens/formuser';
import Chat from '../screens/chat';

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
    Chat: {
        screen: Chat,
        navigationOptions: {
            title: 'TELA DO CHAT'
        }
    },
    FormGuest: {
        screen: FormGuest,
        navigationOptions: {
            title: 'FORMULÁRIO CONVIDADO'
        }
    },
    FormDelivery: {
        screen: FormDelivery,
        navigationOptions: {
            title: 'FORMULÁRIO ENTREGA'
        }
    },
    FormUser: {
        screen: FormUser,
        navigationOptions: {
            title: 'FORMULÁRIO USUÁRIO'
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