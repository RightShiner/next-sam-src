import { GoogleSpreadsheet } from 'google-spreadsheet';

export class GoogleSheetService {
  clientEmail;
  privateKey;
  workspaceId;
  doc;
  sheet;

  // 複数のシートを操作したい場合はconstructorの引数としてsheetIdを渡す形にするのが良さそう
  constructor(sheetId, clientEmail, privateKey, workspaceId) {
    this.clientEmail = clientEmail;
    this.privateKey = privateKey;
    this.workspaceId = workspaceId;
    //  ブラウザで呼び出した場合はエラーに（環境変数が露出するのを防ぐためにも）
    if (typeof window !== 'undefined')
      throw new Error('DO NOT CALL THIS CLASS IN BROWSER!!!');
    this.doc = new GoogleSpreadsheet(sheetId);
  }

  // 本来はconstructor()の中でやりたかったがasync/awaitが使えないので仕方なく分ける
  async init() {
    await this.doc.useServiceAccountAuth({
      client_email: this.clientEmail,
      private_key: this.privateKey.replace(/\\n/g, '\n'),
    });

    // prepare for getting sheet values
    await this.doc.loadInfo();
    this.sheet = this.doc.sheetsById[this.workspaceId];
    await this.sheet.loadHeaderRow();
  }

  // 行の一覧を取得する
  async getRows() {
    return await this.sheet.getRows();
  }

  // 行を追加する
  async addRows(newRows) {
    return await this.sheet.addRows(newRows);
  }
}
