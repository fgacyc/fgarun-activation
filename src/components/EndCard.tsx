export const LuckyDrawEndCard = ({ number }: { number: string }) => {
  return (
    <div
      // style={{
      //   backgroundSize: "100%",
      // }}
      className="flex w-full flex-col items-center gap-2 rounded-[11px] bg-[url('/assets/fga_run_bg.jpg')] bg-cover bg-top bg-no-repeat py-[21px] shadow-xl"
    >
      <p className="font-revelia text-[25px] leading-6 text-[#d6fe00]">
        LUCKY DRAW CODE
      </p>
      <p className="font-sf text-[50px] font-extrabold leading-10 text-[#d6fe00]">
        {number}
      </p>
    </div>
  );
};

export const NFEndCard = () => {
  return (
    <div
      // style={{
      //   backgroundSize: "100%",
      // }}
      className="relative flex w-full flex-col items-center rounded-[11px] bg-[url('/assets/fga_run_welcome_gift_bg_gradient.png')] bg-cover bg-top bg-no-repeat px-[30px] py-[30px] shadow-xl"
    >
      <div className="absolute left-3 top-3 max-h-[20px] min-h-[20px] min-w-[20px] max-w-[20px] rounded-full border-[2px] border-[#d6fe00]">
        <div className="absolute left-1/2 top-1/2 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d6fe00]" />
      </div>
      <p className="font-revelia text-[50px] leading-[50px] text-[#d6fe00]">
        WELCOME GIFT
      </p>
      <p className="text-center font-sf text-[10px] font-thin text-[#d6fe00]">
        We have a gift for you! Head to
        <br />
        our Welcome Lounge to redeem it.
      </p>
    </div>
  );
};
