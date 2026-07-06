"use client";

import { useEffect } from "react";
import { SocialEmbedConsent } from "./SocialEmbedConsent";

type InstagramEmbedProps = {
  url: string;
};

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

export function InstagramEmbed({ url }: InstagramEmbedProps) {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="//www.instagram.com/embed.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        window.instgrm?.Embeds?.process();
      };

      return;
    }

    window.instgrm?.Embeds?.process();
  }, [url]);

  return (
    <SocialEmbedConsent platform="Instagram">
      <div className="my-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white p-4 shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-amber-400/30">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{
            background: "#fff",
            border: 0,
            margin: "0 auto",
            maxWidth: "540px",
            minWidth: "326px",
            width: "100%",
          }}
        />
      </div>
    </SocialEmbedConsent>
  );
}