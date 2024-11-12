"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var dotenv_config_1 = __importDefault(require("./dotenv.config"));
var serviceAccount = {
    project_id: dotenv_config_1.default.FIREBASE_PROJECT_ID,
    private_key_id: dotenv_config_1.default.FIREBASE_PRIVATE_KEY_ID,
    private_key: dotenv_config_1.default.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: dotenv_config_1.default.FIREBASE_CLIENT_EMAIL,
    client_id: dotenv_config_1.default.FIREBASE_CLIENT_ID,
    auth_uri: dotenv_config_1.default.FIREBASE_AUTH_URI,
    token_uri: dotenv_config_1.default.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: dotenv_config_1.default.FIREBASE_AUTH_CERT_URL,
    client_x509_cert_url: dotenv_config_1.default.FIREBASE_CLIENT_CERT_URL
};
var firebase = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount)
});
exports.default = {
    auth: firebase.auth()
};
