"use client";

import { useEffect, useId } from "react";
import { SocialEmbedConsent } from "./SocialEmbedConsent";

type FacebookEmbedProps = {
  url: string;
};

declare global {
  interface Window {
    FB?: {
      XFBML?: {
        parse: (element?: HTMLElement) => void;
      };
    };
    fbAsyncInit?: () => void;
  }
}

export function FacebookEmbed({ url }: FacebookEmbedProps) {
  const wrapperId = useId().replace(/:/g, "");

  useEffect(() => {
    const rootId = "fb-root";

    if (!document.getElementById(rootId)) {
      const root = document.createElement("div");
      root.id = rootId;
      document.body.prepend(root);
    }

    const parseFacebookEmbed = () => {
      const wrapper = document.getElementById(wrapperId);

      if (wrapper && window.FB?.XFBML?.parse) {
        window.FB.XFBML.parse(wrapper);
      }
    };

    if (document.getElementById("facebook-jssdk")) {
      parseFacebookEmbed();
      return;
    }

    window.fbAsyncInit = () => {
      parseFacebookEmbed();
    };

    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.src =
      "https://connect.facebook.net/ro_RO/sdk.js#xfbml=1&version=v20.0";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";

    script.onload = () => {
      setTimeout(parseFacebookEmbed, 300);
    };

    document.body.appendChild(script);
  }, [url, wrapperId]);

  return (
    <SocialEmbedConsent platform="Facebook">
      <div className="my-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white p-4 shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-amber-400/30">
        <div id={wrapperId} className="flex justify-center">
          <div
            className="fb-post"
            data-href={url}
            data-width="500"
            data-show-text="true"
          >
            <blockquote cite={url} className="fb-xfbml-parse-ignore">
              <a href={url} target="_blank" rel="noreferrer">
                Vezi postarea pe Facebook
              </a>
            </blockquote>
          </div>
        </div>
      </div>
    </SocialEmbedConsent>
  );
}