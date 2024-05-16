/* eslint-disable @next/next/no-img-element */
export const Title = ({ subtitle }: { subtitle?: string }) => {
  return (
    <div className="z-20 flex flex-col items-center justify-center gap-2">
      <img
        src="/assets/title.png"
        alt="title"
        className="w-[230px] object-cover sm:w-[290px] md:w-[360px]"
      />
      <p className="w-full text-center font-sf text-[20px] text-white">
        {subtitle ?? "Wristband Activation"}
      </p>
    </div>
  );
};
