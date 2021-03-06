/**
 * @name: ChatApp
 * @uri: https://github.com/hkhungit/react-native-chat-app.git
 * @author_uri: http://hunghk.xyz
 * @author: hunghk
 * @version: 1
 * @container: Navigators
 */

import React         from 'react'
import { Navigator } from 'react-native'
import Storage       from 'react-native-storage'
import {
  Home,
  Chats,
  SignIn,
  SignUp
} from '../containers'

export default {
  renderScene(route, navigator) {
    switch(route.name) {
      case 'home':
        return <Home navigator={navigator}/>
      case 'chats':
        return <Chats navigator={navigator}/>
      case 'sign-in':
        return <SignIn navigator={navigator}/>
      case 'sign-up':
        return <SignUp navigator={navigator}/>
      default:
        return <Home navigator={navigator}/>
    }
  },

  configureScene(route, routeStack) {
    switch(route.name) {
      case 'home':
        return Navigator.SceneConfigs.PushFromRight
      case 'sign-in':
      case 'sign-up':
        return Navigator.SceneConfigs.FloatFromBottom
      default:
        return Navigator.SceneConfigs.PushFromRight
    }
  },

  redirect(classObj, route, params={}){
    classObj.props.navigator.push({
      name: route,
      ...params
    })
  },

  save(classObj){
    cache = new Storage({defaultExpires: 1000 * 3600 * 24 * 1000})
    let routes = classObj.props.navigator.getCurrentRoutes();
    let currentId = routes.length - 1;
    classObj.props.navigator.navigationContext.addListener('didfocus', (event) => {
      cache.save({
        key: 'routes',
        rawData: {routes, currentId}
      });
    });
  }
}