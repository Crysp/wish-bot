import path from 'path';
import process from 'process';
import { Auth, google } from 'googleapis';
import { GOOGLE_SHEETS_DOC_ID } from './config';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

export async function saveLine(user: string, text: string) {
  const auth = new Auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: SCOPES,
  });
  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEETS_DOC_ID,
    range: 'Лист1!A2',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[`=HYPERLINK("https://t.me/${user}"; "@${user}")`, text]],
    },
  });
}
