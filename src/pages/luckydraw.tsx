import { RunnerSVG } from "@/graphics/Runner";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function LuckyDraw() {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const [luckyDrawNo, setLuckyDrawNo] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    if (isLoading) return;
    if (user) {
      void (async () => {
        const res = await fetch(`/api/check?uid=${user.sub}`);

        if (res.status === 404) {
          void router.push("/register");
        }

        res.status === 302 &&
          (await res.json().then((rs: { name: string; lucky_draw: string }) => {
            setLuckyDrawNo(rs.lucky_draw);
            setName(rs.name);
          }));
      })();
    } else void router.push("/");
  }, [isLoading, router, user]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-[url('/assets/fga_run_bg.jpg')] bg-fixed bg-center p-7 py-12">
      <h1
        className="font-sf text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]"
        style={{
          textShadow: "#000 1px 0 10px",
        }}
      >
        <span className="text-[#d7fe00]">FGA</span> Run 2024
      </h1>

      {isLoading ? (
        <div className="fixed left-1/2 top-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-black/70 p-2">
          <RunnerSVG />
        </div>
      ) : (
        <>
          <div className="mt-12 flex w-full flex-col items-center rounded-md bg-white/70 px-9 py-12 font-sf">
            <p
              className="text-3xl font-black uppercase text-black"
              // style={{
              //   textShadow: "#d7fe00 1px 0 3px",
              // }}
            >
              Lucky Draw
            </p>
            {/* <p className="mt-3 text-xl text-black">
            Your lucky draw number is...
          </p> */}
            <p
              className="text-[4rem] font-black text-[#d7fe00]"
              style={{
                textShadow: "#000 1px 1px 5px",
              }}
            >
              {luckyDrawNo}
            </p>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <div className="min-h-[24px] py-1 pl-2 font-sf text-xs text-white">
              Signed in as: <span className="text-[#d7fe00]">{name}</span>
            </div>
            <div className="min-h-[24px] py-1 pr-2 text-right font-sf text-xs italic text-white">
              Not You?{" "}
              <Link
                className="text-[#d7fe00] underline"
                href="/api/auth/logout"
              >
                Logout
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
