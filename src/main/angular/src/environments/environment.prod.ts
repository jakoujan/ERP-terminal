import { InjectableRxStompConfig } from "@stomp/ng2-stompjs";

export const environment = {
  production: true,
  API_URL: 'http://192.168.2:8080/',
  APP_NAME: '',
  PAID_SALE: false,
  websocket: {
    uri: 'ws://' + window.location.host + '/ws',
    topicPrefix: "/web/port",
    destination: '/configurator/port',
    process: {
      topic: '/web/scale',
      prefix: '/configurator/process'
    }
  }
};

export const constants = {
  SESSION: 'session',
  MODULE: 'module',
}

export const stompConfig: InjectableRxStompConfig = {
  brokerURL: environment.websocket.uri,
  connectHeaders: {
    login: 'edgar',
    passcode: 'p'
  },
  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,
  reconnectDelay: 200,
}

