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
          <Image style={{width: 15, height: 15, tintColor: !Navigator.instance.state.darkContent ? '#fff' : '#000'}} source={{uri: 'data:image/png;base64,'+'data:image/png;base64,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'}}></Image>
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
                      <Image style={{width: 15, height: 15}} source={{uri: 'data:image/png;base64,'+'data:image/png;base64,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'}}></Image>
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
