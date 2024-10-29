import ChatRoom from "../_components/Chat/ChatRoom";

export default function Home() {
  return (
    <div className="m-auto grid grid-rows-[20px_1fr_20px] items-center justify-items-center  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ChatRoom
          messages={[
            {
              id: 1,
              text: "Hello, world!",
              date: "2021-10-01",
              sender: "incoming",
            },
            {
              id: 2,
              text: "Hi, there!",
              date: "2021-10-01",
              sender: "outgoing",
            },
            {
              id: 3,
              text: "How are you?",
              date: "2021-10-01",
              sender: "incoming",
            },
          ]}
        />
      </main>
    </div>
  );
}
