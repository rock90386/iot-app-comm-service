import * as functions from 'firebase-functions';
import { configureServer } from './server';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//initialize the server
const server = configureServer();
// create and export the api
export const api = functions.https.onRequest(server);
