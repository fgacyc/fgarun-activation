import { Title } from "@/components/Title";
import { RunnerSVG } from "@/graphics/Runner";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isLoading, user } = useUser();
  useEffect(() => {
    if (isLoading) return;
    if (!user) return;

    void router.push("/register");
  }, [isLoading, router, user]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[url('/assets/fga_run_bg.jpg')] bg-cover bg-center px-8">
        {isLoading ? (
          <div className="h-[100px] w-[100px] rounded-lg bg-black/70 p-2">
            <RunnerSVG />
          </div>
        ) : (
          <>
            <Title />
            {/* <h1
              className="font-sf text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]"
              style={{
                textShadow: "#000 1px 0 10px",
              }}
            >
              <span className="text-[#d6fe00]">FGA</span> Run 2024
            </h1> */}

            <Link
              className="mt-5 w-full max-w-[400px] rounded-lg bg-[#d6fe00] py-3 text-center font-sf text-[20px] font-bold text-[#000]"
              href="/api/auth/login"
            >
              Sign In / Register
            </Link>
          </>
        )}
      </main>
    </>
  );
}
