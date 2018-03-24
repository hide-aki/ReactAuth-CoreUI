import * as firebase from "firebase";
import config from "../../../config/config";

if (!firebase.apps.length) {
  firebase.initializeApp(config.firebase);
}

export const auth = firebase.auth();
