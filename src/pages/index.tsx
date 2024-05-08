import { RunnerSVG } from "@/graphics/Runner";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#15162c] to-[#797979] p-7 py-12">
        <h1 className="font-sf text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Run For <span className="text-[#d7fe00]">FGA</span>
        </h1>

        <RunnerSVG className="h-[200px] w-[200px]" />

        <Link
          className="rounded-md bg-white/30 px-5 py-1 font-sf text-sm text-white"
          href="/api/auth/login"
        >
          Sign In / Register
        </Link>
      </main>
    </>
  );
}
