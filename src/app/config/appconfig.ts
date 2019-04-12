import {InjectionToken} from '@angular/core';
import {IAppConfig} from './iapp-config';
export let APP_CONFIG = new InjectionToken('app.config');
export const AppConfig: IAppConfig = {
    routes: {
        error404: '404'
      },
      endpoints: {
         prod: 'api/v1/home/',
        // prod: 'http://localhost:11503/api/v1/home/',
        homeendpoint: 'api/v1/home/',
        local: 'http://redit.aramex.net/Corp.CustomerService.UI/',
        proc: 'API/Proc/'
      },
      userAccess: 'UserAccess',
      isLoggedIn : 'IsLoggedIn',
      constant: {
        useraccess: 'UserAccess',
        isLoggedIn : 'IsLoggedIn'
      }
};
