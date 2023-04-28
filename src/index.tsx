/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  View,
  Dimensions,
  BackHandler,
  Text,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native';

interface NavProps {
  screens: any,
  initialScreen: string,
  bottomTab: any
}

class Navigator extends React.Component<NavProps> {

  static instance: any;

  constructor(props: any){  
    super(props);
    Navigator.instance = this;

    if(props.screens && props.initialScreen) {
      let initialScreen;
      for(let i = 0; i < props.screens.length; i++) {
        if (props.screens[i].name === props.initialScreen) {
          initialScreen = props.screens[i]
        }
      }
  
      Navigator.instance.state = {
        screens: props.screens,
        currentScreen: initialScreen,
        stack: [initialScreen],
        bottomTab: props.bottomTab,
        showModal: false
      }
    }    
  }  

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    Navigator.loadScreenConfig();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    Navigator.pop();
    return true;
  }

  showScreen() {
    return Navigator.instance.state.currentScreen.component();
  }

  refresh() {
    this.forceUpdate()
  }

  static navigate(screen: any) {
    for(let i = 0; i < Navigator.instance.state.screens.length; i++) {
      if (Navigator.instance.state.screens[i].name === screen) {
        let stack = Navigator.instance.state.stack;
        stack.push(Navigator.instance.state.screens[i]);
        Navigator.instance.setState({
          currentScreen: Navigator.instance.state.screens[i],
          stack: stack
        }, () => Navigator.loadScreenConfig());
      }
    }
  }

  static pop() {
    let stack = Navigator.instance.state.stack;
    if(stack.length > 1) {
      stack.pop();
      Navigator.instance.setState({
        currentScreen: stack[stack.length - 1],
        stack: stack,
      }, () => Navigator.loadScreenConfig());
    }
  }

  static loadScreenConfig() {
    let currentScreen = Navigator.instance.state.currentScreen;

    let hideTopTab = currentScreen.options?.hideTopTab;
    let hideBackButton = currentScreen.options?.hideBackButton;
    let topTabColor = currentScreen.options?.topTabColor;
    let darkContent = true;

    if(topTabColor && Navigator.lightOrDark(topTabColor) == 'light') {
      StatusBar.setBarStyle( 'dark-content',true)
    } else {
      StatusBar.setBarStyle( 'light-content',true);
      darkContent = false;
    }

    Navigator.instance.setState({
      hideTopTab: hideTopTab,
      hideBackButton: hideBackButton,
      topTabColor: topTabColor,
      darkContent: darkContent
    })

    StatusBar.setBackgroundColor(topTabColor ? topTabColor : 'grey');
  }

  static lightOrDark(color: any) {

    // Variables for red, green, blue values
    var r, g, b, hsp;
    
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        
        r = color[1];
        g = color[2];
        b = color[3];
    } 
    else {
        
        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace( 
        color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {

        return 'light';
    } 
    else {

        return 'dark';
    }
  }

  static showBackButton() {
    if(!Navigator.instance.state.hideBackButton) {
      return (
        <TouchableOpacity onPress={() => Navigator.pop()} style={{padding: 15}}>
          <Image style={{width: 15, height: 15, tintColor: !Navigator.instance.state.darkContent ? '#fff' : '#000'}} source={require('./back.png')}></Image>
        </TouchableOpacity>
      )
    } else {
      return null;
    }
  }

  static showTopTab() {
    if(!Navigator.instance.state?.hideTopTab) {
      return (
        <View style={{
          backgroundColor: Navigator.instance.state?.topTabColor ? Navigator.instance.state?.topTabColor : 'white'  ,
          height: 50,
          flexDirection: 'row',
        }}>
          {Navigator.showBackButton()}
          <Text style={{
            padding: 15, 
            fontSize: 16, 
            paddingTop: 11,
            paddingLeft: Navigator.instance.state.hideBackButton ? 20 : -20, 
            color: Navigator.instance.state.darkContent ? 'black' : 'white', 
            fontWeight: 'bold'
            }}>
              {Navigator.instance.state.currentScreen.title}
            </Text>
        </View>
      )
    } else {
      return null;
    }
  }

  static showBottomTabItems() {
    return (
      Navigator.instance?.state?.bottomTab?.items?.map((item: any, key: any)=>(
        <TouchableOpacity key={key}
          onPress={()=>Navigator.navigate(item.screen)}
          style={{margin: 25, alignContent: 'center', alignItems: 'center'}}>
            <Image style={{marginTop: 3, width: 25, height: 25}} source={item.icon ? item.icon : undefined}></Image>
            <Text>{item.title}</Text>
        </TouchableOpacity>
      )) 
      
    )
  }

  static showBottomTab() {
    if(Navigator.instance.state?.bottomTab && !Navigator.instance.state.currentScreen.options.hideBottomTab) {
      return (
        <View style={{
          backgroundColor: 'white',
          height: 75,
          flexDirection: 'row',
          position: 'absolute',
          width: Dimensions.get("window").width,
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 24
        }}>
          {Navigator.showBottomTabItems()}
        </View>
      )
    } else {
      return null;
    }
  }

  static openModal(options: any) {
    Navigator.instance.setState({
      showModal: true,
      modalTitle: options.title,
      modalText: options.text,
      modalComponent: options.component,
      modalButtons: options.buttons
    });
  }

  static showModalText() {
    if(Navigator.instance.state.modalText) {
      return (
        <Text style={{color: 'black',}}>{Navigator.instance.state.modalText}</Text>
      )
    } else {
      return null;
    }
  }

  static showModalComponent() {
    if(Navigator.instance.state.modalComponent) {
      return (
        <View style={{
          flex: 1,
          marginTop: 15,
          alignItems: 'center',
          alignContent: 'center'
        }}>
          {Navigator.instance.state.modalComponent}
        </View>        
      )
    } else {
      return null;
    }
  }

  static showModalButtons() {
    if(Navigator.instance.state.modalButtons) {
      return (
        Navigator.instance.state.modalButtons.map((item: any, key: any)=>(
          <TouchableOpacity key={key}
            onPress={()=> {
              if(item.onPress)
                item.onPress();
              Navigator.instance.setState({showModal: false});
            }}
            style={{padding: 7, width: 75, marginLeft: 15, alignContent: 'center', alignItems: 'center', borderRadius: 7, borderColor: 'grey', borderWidth: 1}}>
              <Text>{item.text}</Text>
          </TouchableOpacity>
        )) 
      )
    } else {
      return null;
    }
  }

  static showModal() {
    if(Navigator.instance.state.showModal) {
      return (
        <View 
          style={{
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
            position: 'absolute'
          }}>
              <TouchableOpacity 
                onPress={() => Navigator.instance.setState({showModal: false})}
                style={{
                  height: Dimensions.get("window").height,
                  width: Dimensions.get("window").width,
                  backgroundColor: 'rgba(0,0,0,0.75)',
                  position: 'absolute'
                }}></TouchableOpacity>
              <View
                style={{
                  backgroundColor: 'white',
                  marginVertical: '20%',
                  marginHorizontal: '7%',
                  flex: 1,
                  borderRadius: 7,
                  
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.50,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}>

                  <View style={{
                    backgroundColor: 'white',
                    height: 50,
                    borderTopLeftRadius: 7,
                    borderTopRightRadius: 7,
                    width: '100%',
                    borderBottomWidth: 1,
                    borderColor: 'grey',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>{Navigator.instance.state.modalTitle}</Text>
                    <TouchableOpacity 
                      onPress={() => Navigator.instance.setState({showModal: false})}
                      style={{
                        position: 'absolute',
                        right: 15
                      }}>
                      <Image style={{width: 15, height: 15}} source={require('../assets/close.png')}></Image>
                    </TouchableOpacity>
                  </View>

                  <View style={{
                    flex: 1
                  }}>
                    <View style={{
                      padding: 15
                    }}>
                      {Navigator.showModalText()}
                      {Navigator.showModalComponent()}
                    </View>
                  </View>

                  <View style={{
                    backgroundColor: 'white',
                    height: 50,
                    borderBottomLeftRadius: 7,
                    borderBottomRightRadius: 7,
                    width: '100%',
                    borderTopWidth: 1,
                    borderColor: 'grey',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row'
                  }}>                    
                    {Navigator.showModalButtons()}
                  </View>

              </View>
        </View>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={{
        backgroundColor: 'blue',
        height: Dimensions.get("window").height
      }}>
        {Navigator.showTopTab()}
        {Navigator.instance.showScreen()}
        {Navigator.showBottomTab()}
        {Navigator.showModal()}
      </View>
    );
  }
}

export default Navigator;
