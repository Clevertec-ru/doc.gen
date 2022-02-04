const EXCEL_COLUMN_NAMES = {
  contract: "Договор",
  contractDate: "дата договора",
  fio: "Фамилия",
  actNumber: "номер акта",
  monthCount: "кол-во месяцев",
  actSum: "сумма в акте",
  startWorkDate: "Дата начала работы",
  endWorkDate: "Дата окончания работы",
  works: "Работы",
  city: "город",
  address: "Адрес",
  phone: "Телефон",
  email: "E-mail",
  skype: "Skype",
  corrBank: "Банк корреспондент",
  corrBankBIC: "БИК банка корреспондента",
  corrBankINN: "ИНН банка корреспондента",
  corrBankAccount: "Счет в банке корреспонденте",
  recipientBank: "Банк получателя",
  recipientBankSWIFT: "S.W.I.F.T.",
  recipientBankAccount: "Счет получателя",
  recipient: "Получатель",
  sex: "Пол",
};

const EXCEL_INVERTED_COLUMN_NAMES = {
  [EXCEL_COLUMN_NAMES.contract]: "contract",
  [EXCEL_COLUMN_NAMES.contractDate]: "contractDate",
  [EXCEL_COLUMN_NAMES.fio]: "fio",
  [EXCEL_COLUMN_NAMES.actNumber]: "numberAct",
  [EXCEL_COLUMN_NAMES.monthCount]: "monthCount",
  [EXCEL_COLUMN_NAMES.actSum]: "actSum",
  [EXCEL_COLUMN_NAMES.startWorkDate]: "startWorkDate",
  [EXCEL_COLUMN_NAMES.endWorkDate]: "endWorkDate",
  [EXCEL_COLUMN_NAMES.works]: "workList",
  [EXCEL_COLUMN_NAMES.city]: "city",
  [EXCEL_COLUMN_NAMES.address]: "address",
  [EXCEL_COLUMN_NAMES.phone]: "phone",
  [EXCEL_COLUMN_NAMES.email]: "email",
  [EXCEL_COLUMN_NAMES.skype]: "skype",
  [EXCEL_COLUMN_NAMES.corrBank]: "corrBank",
  [EXCEL_COLUMN_NAMES.corrBankBIC]: "corrBankBIC",
  [EXCEL_COLUMN_NAMES.corrBankINN]: "corrBankINN",
  [EXCEL_COLUMN_NAMES.corrBankAccount]: "corrBankAccount",
  [EXCEL_COLUMN_NAMES.recipientBank]: "recipientBank",
  [EXCEL_COLUMN_NAMES.recipientBankSWIFT]: "recipientBankSWIFT",
  [EXCEL_COLUMN_NAMES.recipientBankAccount]: "recipientBankAccount",
  [EXCEL_COLUMN_NAMES.recipient]: "recipient",
  [EXCEL_COLUMN_NAMES.sex]: "gender",
  textedAmount: "textedAmount",
  initialName: "initialName",
};

module.exports = {
  EXCEL_COLUMN_NAMES,
  EXCEL_INVERTED_COLUMN_NAMES,
};
