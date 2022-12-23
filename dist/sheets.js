"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveLine = void 0;
const path_1 = __importDefault(require("path"));
const process_1 = __importDefault(require("process"));
const googleapis_1 = require("googleapis");
const config_1 = require("./config");
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const CREDENTIALS_PATH = path_1.default.join(process_1.default.cwd(), 'credentials.json');
async function saveLine(user, text) {
    const auth = new googleapis_1.Auth.GoogleAuth({
        keyFile: CREDENTIALS_PATH,
        scopes: SCOPES,
    });
    const sheets = googleapis_1.google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.append({
        spreadsheetId: config_1.GOOGLE_SHEETS_DOC_ID,
        range: 'Лист1!A2',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [[`=HYPERLINK("https://t.me/${user}"; "@${user}")`, text]],
        },
    });
}
exports.saveLine = saveLine;
