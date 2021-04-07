// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { InjectableRxStompConfig } from "@stomp/ng2-stompjs";

export const environment = {
  production: false,
  API_URL: 'http://localhost:8080/',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


export const constants = {
  SESSION: 'session',
  MODULE: 'module',
}

export const stompConfig: InjectableRxStompConfig = {
  // Which server?
  brokerURL: environment.websocket.uri,

  // Headers
  // Typical keys: login, passcode, host
  connectHeaders: {
    login: 'edgar',
    passcode: 'p'
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 500 (500 milli seconds)
  reconnectDelay: 200,

  // Will log diagnostics on console
  // It can be quite verbose, not recommended in production
  // Skip this key to stop logging to console
  //debug: (msg: string): void => {
  //  console.log(msg);
  //}
}
