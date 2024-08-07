import MyProfile from "@/src/components/MyProfile";

export default function Home() {
  return (
    <main className="px-6 mx-auto">
      <MyProfile />
      <p className="mt-12 mb-12 text-3xl text-center text-white">
        Hello and Welcome 👋&nbsp;
        <span className="whitespace-nowrap">
          I&apos;m <span className="font-bold">ABUBAKAR</span>
        </span>
      </p>
    </main>
  );
}
