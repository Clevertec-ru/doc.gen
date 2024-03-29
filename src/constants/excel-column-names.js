const EXCEL_COLUMN_NAMES = {
  contractType: "Contract Type",
  contract: "Contract",
  contractDate: "Contract Date",
  fio: "Full Name",
  actNumber: "Act Number",
  monthCount: "Month Count",
  actSum: "Act Sum",
  startWorkDate: "Start Work Date",
  endWorkDate: "End Work Date",
  works: "Works",
  city: "City",
  address: "Address",
  phone: "Phone",
  email: "E-mail",
  skype: "Skype",
  corrBank: "Correspondent Bank",
  corrBankBIC: "Correspondent Bank BIC",
  corrBankINN: "Correspondent Bank INN",
  corrBankAccount: "Correspondent Bank Account",
  recipientBank: "Recipient Bank",
  recipientBankSWIFT: "S.W.I.F.T.",
  recipientBankAccount: "Recipient Bank Account",
  recipient: "Recipient",
  sex: "Sex",
};

const EXCEL_INVERTED_COLUMN_NAMES = {
  [EXCEL_COLUMN_NAMES.contractType]: "contractType",
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
  [EXCEL_COLUMN_NAMES.sex]: "sex",
  textedAmount: "textedAmount",
  initialName: "initialName",
  endWorkDateFormatted: "endWorkDateFormatted",
};

module.exports = {
  EXCEL_COLUMN_NAMES,
  EXCEL_INVERTED_COLUMN_NAMES,
};
