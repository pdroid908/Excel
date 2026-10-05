
export default function Welcome() {
  return (
    <div className="no-print mx-auto mb-5 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm sm:px-5 sm:py-4">
      <h2 className="text-sm font-semibold text-slate-800 sm:text-base">
        Butuh Jasa Website?
      </h2>

      <p className="mx-auto mt-1 max-w-xl text-xs leading-relaxed text-slate-500 sm:text-sm">
        Butuh website untuk keperluan kerja atau keinginan pribadi?
        Hubungi saya melalui email. Mari diskusi dulu mengenai kebutuhan
        dan konsep yang kamu inginkan.
      </p>

      <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-slate-500 sm:mt-3 sm:text-xs">
        <span>
          Email:{" "}
          <strong className="font-semibold text-slate-700">
            p1998nr@gmail.com
          </strong>
        </span>

        <span>
          Support:{" "}
          <strong className="font-semibold text-slate-700">
            OVO / GoPay 081328343908
          </strong>
        </span>

        <a
          href="https://www.tiktok.com/@putranur99?_r=1&_t=ZS-9AI4Qi3gauL"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-slate-700 transition hover:text-slate-950 hover:underline"
        >
          TikTok: @putranur99
        </a>
      </div>
    </div>
  );
}

