import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Amplify, {Auth} from 'aws-amplify';




Amplify.configure({
  // OPTIONAL - if your API requires authentication
  Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-east-1:a576da2f-0761-4b60-a879-107317436dbf',
    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_Z4iAXWOhC',
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '583kvktctv82u2a4ebtuibhcq8',
  },
  API: {
    endpoints: [
      {
        name: "main",
        endpoint: environment.apiEndpoint,
        custom_header: async () => {


          const user = await Auth.currentAuthenticatedUser();
            const token = user.signInUserSession.idToken.jwtToken;


            console.log(token);
          return {    Authorization: `Bearer ${token}`}
        }
      }
    ]
  }
});



if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
