export type Message = {
  id: string;
  name: string;
  text: string;
  date: Date;
  sender: "incoming" | "outgoing" | "system";
};
