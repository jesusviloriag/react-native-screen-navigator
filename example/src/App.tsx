import * as React from 'react';

import Navigator from 'react-native-screen-navigator';
import Home from './screens/Home';
import Login from './screens/Login';
import Profile from './screens/Profile';

export default function App() {

  return (
    <Navigator
      screens={[{
        component: Login,
        name: 'Login',
        title: 'Login',
        options: {
          hideTopTab: true
        }
      },
      {
        component: Home,
        name: 'Home',
        title: 'Home Screen',
        options: {
          topTabColor: '#fff',
          hideBackButton: true
        }
      },
      {
        component: Profile,
        name: 'Profile',
        title: 'Profile screenie, my dude',
        options: {
          topTabColor: '#000',
          hideBottomTab: true
        }
      }]}
      initialScreen={'Login'}
      bottomTab={{
        items:[{
          title: 'Login',
          icon: require('./assets/user.png'),
          screen: 'Login'
        },{
          title: 'Home',
          icon: require('./assets/home.png'),
          screen: 'Home'
        },{
          title: 'Profile',
          icon: require('./assets/setting.png'),
          screen: 'Profile'
        }]}}
    ></Navigator>
  );
}
