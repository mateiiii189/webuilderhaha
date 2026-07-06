export function BlogHeroMockup() {
  return (
    <div className="relative hidden min-h-[560px] xl:block">
      <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/14 blur-[120px]" />

      <div className="group absolute left-1/2 top-1/2 h-[520px] w-[760px] -translate-x-[47%] -translate-y-1/2">
        {/* MAIN BROWSER */}
        <div className="absolute left-[20px] top-[42px] z-20 w-[610px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#11161D] p-4 shadow-[0_45px_100px_rgba(0,0,0,0.62)] transition duration-700 group-hover:-translate-y-2 group-hover:border-amber-400/25">
          <div className="overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#05070B]">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/90" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/90" />
                <span className="h-3 w-3 rounded-full bg-green-400/90" />
              </div>

              <div className="flex items-center gap-4 text-[10px] font-medium text-gray-400">
                <span>Servicii</span>
                <span>Portofoliu</span>
                <span>Prețuri</span>
                <span className="text-amber-300">Blog</span>
                <span>Contact</span>
              </div>
            </div>

            <div className="relative h-[350px] overflow-hidden bg-[#070A0F] px-8 py-7">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />
              <div className="absolute right-8 top-8 h-52 w-52 rounded-full bg-amber-400/10 blur-3xl" />

              <div className="relative flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-400/40 bg-amber-400/10 text-sm font-black text-amber-300">
                  W
                </span>

                <span className="text-sm font-semibold text-white">
                  Webuilder
                </span>
              </div>

              <div className="relative mt-11 max-w-[390px]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300">
                  Website-uri lucrate pentru tine
                </p>

                <h3 className="mt-4 text-[2.65rem] font-black leading-[0.9] tracking-tight text-white">
                  CREĂM SITE-URI
                  <br />
                  <span className="text-amber-400">CARE CONVERTESC</span>
                </h3>

                <p className="mt-5 max-w-sm text-sm leading-6 text-gray-400">
                  Site-uri rapide, clare și optimizate SEO pentru firme care vor
                  mai multe cereri reale.
                </p>

                <div className="mt-7 flex items-center gap-3">
                  <span className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-400/10">
                    Cere ofertă
                  </span>

                  <span className="rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white">
                    Vezi portofoliu
                  </span>
                </div>
              </div>

              {/* STAT CARD - inside browser, not covering title */}
              <div className="absolute right-8 top-[105px] w-[185px] rounded-2xl border border-white/10 bg-black/35 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl transition duration-700 group-hover:-translate-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-amber-300">
                  Conversie
                </p>

                <p className="mt-2 text-3xl font-black text-white">+120%</p>

                <div className="mt-3 h-14">
                  <svg
                    viewBox="0 0 180 60"
                    className="h-full w-full text-amber-400"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 48 C28 45, 35 50, 52 39 C74 25, 92 39, 115 22 C140 5, 152 17, 170 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <circle cx="170" cy="6" r="5" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* TESTIMONIAL */}
              <div className="absolute bottom-7 right-8 w-[235px] rounded-2xl border border-amber-400/15 bg-[#0C0F14]/85 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl transition duration-700 group-hover:translate-y-1">
                <div className="flex gap-1 text-xs text-amber-300">★★★★★</div>

                <p className="mt-2 text-[12px] leading-5 text-gray-300">
                  „Website-ul ne-a făcut firma să arate profesionist.”
                </p>

                <p className="mt-2 text-[11px] text-gray-500">
                  — Client Webuilder
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PHONE */}
        <div className="absolute right-[20px] top-[190px] z-40 w-[145px] rounded-[2rem] border border-white/15 bg-[#05070B] p-3 shadow-[0_30px_70px_rgba(0,0,0,0.65)] transition duration-700 group-hover:-translate-y-3 group-hover:border-amber-400/30">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#070A0F]">
            <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-white/20" />

            <div className="relative min-h-[255px] px-4 pb-5 pt-8">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:28px_28px] opacity-35" />

              <div className="relative flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-400/10 text-[11px] font-black text-amber-300">
                  W
                </span>

                <span className="text-[11px] font-semibold text-white">
                  Webuilder
                </span>
              </div>

              <h4 className="relative mt-9 text-[1rem] font-black leading-[0.95] text-white">
                SITE-URI
                <br />
                <span className="text-amber-400">CARE CONVERTESC</span>
              </h4>

              <p className="relative mt-4 text-[11px] leading-5 text-gray-400">
                Design clar, rapid și optimizat.
              </p>

              <div className="relative mt-6 space-y-3">
                <div className="h-8 rounded-xl border border-white/10 bg-white/[0.04]" />
                <div className="h-8 rounded-xl border border-white/10 bg-white/[0.04]" />
                <div className="h-8 rounded-xl border border-white/10 bg-white/[0.04]" />
              </div>

              <div className="relative mt-6 rounded-xl bg-amber-400 px-4 py-3 text-center text-xs font-semibold text-black">
                Cere ofertă
              </div>
            </div>
          </div>
        </div>

        {/* FEATURE CARDS - below browser, not over content */}
        <div className="absolute bottom-[8px] left-[24px] z-50 grid w-[600px] grid-cols-3 gap-4">
          {[
            ["SEO READY", "Structură clară"],
            ["SPEED 96", "Încărcare rapidă"],
            ["LEADS +42%", "Mai multe cereri"],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-[#0D1117]/90 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.05]"
            >
              <div className="mb-4 h-8 w-8 rounded-xl border border-amber-400/30 bg-amber-400/10" />

              <p className="text-sm font-black text-white">{title}</p>
              <p className="mt-2 text-sm leading-5 text-gray-400">{text}</p>

              <div className="mt-4 h-1 w-10 rounded-full bg-amber-400" />
            </div>
          ))}
        </div>

        <div className="absolute bottom-[-20px] left-[90px] h-12 w-[620px] rounded-full bg-black/45 blur-2xl" />
      </div>
    </div>
  );
}