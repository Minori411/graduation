import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
      clientId: "7c78d20e-ddc7-4a38-bbc2-2db066510c73", // Client ID 
      authority: 'https://login.microsoftonline.com/34e13d85-3d97-43dd-9521-81f6ed0fdb5d', // Tenant ID of the React.JS App Registration
      redirectUri: "https://localhost:44449/",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
      loggerOptions: {
        loggerCallback: (level: any, message: string, containsPii: any) => {
          if (containsPii) {
            return;
          }
          switch (level) {
            case LogLevel.Error:
              console.error(message);
              return;
            case LogLevel.Info:
              console.info(message);
              return;
            case LogLevel.Verbose:
              console.debug(message);
              return;
            case LogLevel.Warning:
              console.warn(message);
              return;
            }
          },
        },
      },
    };
  
// Can be found in the API Permissions of the ASP.NET Web API
export const loginApiRequest = {
  scopes: ["api://7c78d20e-ddc7-4a38-bbc2-2db066510c73/api.scope"],
};