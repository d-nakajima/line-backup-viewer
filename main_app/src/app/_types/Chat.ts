export type Message = {
  name: string;
  text: string;
  date: Date;
  sender: "incoming" | "outgoing";
};
