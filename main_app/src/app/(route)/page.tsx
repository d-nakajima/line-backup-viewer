import ChatRoom from "../_components/Chat/ChatRoom";

export default function Home() {
  return (
    <div className="m-auto grid grid-rows-[20px_1fr_20px] items-center justify-items-center  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ChatRoom messages={[]} />
      </main>
    </div>
  );
}
