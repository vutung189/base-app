export enum SideBarTypes {
  LEFT_SIDEBAR_TYPE_DEFAULT = "default",
  LEFT_SIDEBAR_TYPE_CONDENSED = "condensed",
}

export enum Role {
  DEFAULT = "DEFAULT",
  ADMIN = "ADMIN",
}

export const sizePerPageList: { text: string; value: number }[] = [
  {
    text: "5",
    value: 5,
  },
  {
    text: "10",
    value: 10,
  },
  {
    text: "20",
    value: 20,
  },
  {
    text: "30",
    value: 30,
  },
  {
    text: "50",
    value: 50,
  },
  {
    text: "100",
    value: 100,
  },
];

export const FORMAT_DATE = "yyyy-MM-dd";
export const FORMAT_DATE_TIME = "yyyy-MM-dd HH:mm:ss";
