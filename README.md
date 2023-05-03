# react-native-screen-navigator

A simple react native library to navigate between screens

## Installation

```sh
npm install react-native-screen-navigator
```

## Usage

```js
import Navigator from 'react-native-screen-navigator';

import Home from './screens/Home';
import Login from './screens/Login';
import Profile from './screens/Profile';

function App(): JSX.Element {
 
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
```
Modal Window:
```js
Navigator.openModal({
  title: "Modal title",  //title of the window
  text: "This is a test text, it can be very long, but try to be brief :)", //text inside of the window
  component: <Image style={{width: 300, height: 300}} source={uri: 'https://i.imgur.com/29x54Bf.jpg' }></Image>,  //component to render inside of the window
  buttons: [  //buttons at the bottom of the window 
    {
      text: "Cancel"   //Cancel button always closes the window
    },
    {
      text: "OK",  //text inside the button
      onPress: () => alert("OK pressed")  //onPress function inside of the button
    }
  ]
})
```
![alt text](https://i.imgur.com/1u7W2WD.png)
![alt text](https://i.imgur.com/kNYVXXM.png)
![alt text](https://i.imgur.com/yF887tm.png)
![alt text](https://i.imgur.com/PVfu9ZF.png)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)