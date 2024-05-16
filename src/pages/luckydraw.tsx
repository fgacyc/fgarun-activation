/* eslint-disable @next/next/no-img-element */
import { LuckyDrawEndCard, NFEndCard } from "@/components/EndCard";
import { Title } from "@/components/Title";
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
  const [nf, setNF] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    if (user) {
      void (async () => {
        const res = await fetch(`/api/check?uid=${user.sub}`);

        if (res.status === 404) {
          void router.push("/register");
        }

        res.status === 302 &&
          (await res
            .json()
            .then(
              (rs: {
                name: string;
                lucky_draw: string;
                new_to_fga: boolean;
              }) => {
                setLuckyDrawNo(rs.lucky_draw);
                setName(rs.name);
                setNF(rs.new_to_fga);
              },
            ));
      })();
    } else void router.push("/");
  }, [isLoading, router, user]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center p-7 py-12">
      <img
        src="/assets/fga_run_bg_gradient.png"
        className="fixed inset-0 h-full object-cover object-center lg:w-full"
        alt="bg"
      />
      <div className="fixed left-0 top-0 z-10 min-h-screen w-screen bg-black/20" />

      <div className="z-20 flex h-full w-full flex-col items-center">
        <Title subtitle="Thank you for coming!" />

        {isLoading ? (
          <div className="fixed left-1/2 top-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-black/70 p-2">
            <RunnerSVG />
          </div>
        ) : (
          <div className="mt-12 flex w-full flex-col items-center gap-2">
            {/* <div className="mt-12 flex w-full flex-col items-center rounded-md bg-white/70 px-9 py-12 font-sf">
            <p
              className="text-3xl font-black uppercase text-black"
              // style={{
              //   textShadow: "#d6fe00 1px 0 3px",
              // }}
            >
              Lucky Draw
            </p>
           
            <p
              className="text-[4rem] font-black text-[#d6fe00]"
              style={{
                textShadow: "#000 1px 1px 5px",
              }}
            >
              {luckyDrawNo}
            </p>
          </div> */}

            <LuckyDrawEndCard number={luckyDrawNo} />
            <div className="max-h-[10px] min-h-[10px]" />
            {nf && <NFEndCard />}

            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex min-h-[24px] flex-row items-center gap-0.5 py-1 pl-2 font-sf text-[10px] font-normal text-white">
                Signed in as:{" "}
                <span className="block max-w-[90px] truncate font-bold text-[#fff]">
                  {name}
                </span>
              </div>
              <div className="min-h-[24px] py-1 pr-2 text-right font-sf text-[10px] font-normal text-white">
                Not You?{" "}
                <Link
                  className="font-bold text-[#d6fe00] underline"
                  href="/api/auth/logout"
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
