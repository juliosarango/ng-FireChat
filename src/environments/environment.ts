// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAF7rmJX7JQ0yh1NpWFyE2RGER88K2gJNE",
    authDomain: "firechatapp-ee35a.firebaseapp.com",
    databaseURL: "https://firechatapp-ee35a.firebaseio.com",
    projectId: "firechatapp-ee35a",
    storageBucket: "firechatapp-ee35a.appspot.com",
    messagingSenderId: "801894081218"
  }
};
