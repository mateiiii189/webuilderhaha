import Link from "next/link";
import Image from "next/image";
import { PortableText } from "next-sanity";
import type { PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/Button";
import { InstagramEmbed } from "@/components/blog/InstagramEmbed";
import { FacebookEmbed } from "@/components/blog/FacebookEmbed";

function blockToPlainText(block: any) {
  if (!block?.children) return "";

  return block.children
    .filter((child: any) => child?._type === "span")
    .map((child: any) => child.text)
    .join("");
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getFirstH2BlockKey(value: unknown[]) {
  const firstH2Block = value.find(
    (block: any) => block?._type === "block" && block?.style === "h2"
  ) as any;

  return firstH2Block?._key;
}

function createComponents(firstH2BlockKey?: string): PortableTextComponents {
  return {
    types: {
      image: ({ value }) => {
        if (!value?.asset) {
          return null;
        }

        return (
          <div className="my-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.05]">
            <Image
              src={urlFor(value).width(1400).height(820).url()}
              alt={value.alt || ""}
              width={1400}
              height={820}
              className="h-auto w-full object-cover opacity-95 transition duration-700 hover:scale-[1.02]"
            />
          </div>
        );
      },

      instagramEmbed: ({ value }) => {
        if (!value?.url) return null;
        return <InstagramEmbed url={value.url} />;
      },

      facebookEmbed: ({ value }) => {
        if (!value?.url) return null;
        return <FacebookEmbed url={value.url} />;
      },

      ctaBlock: ({ value }) => {
        return (
          <div className="my-12 rounded-[2rem] border border-amber-400/20 bg-amber-400/[0.06] p-8 transition duration-500 hover:-translate-y-1 hover:border-amber-400/40 hover:bg-amber-400/[0.08]">
            {value?.title ? (
              <h3 className="text-3xl font-black leading-tight text-white">
                {value.title}
              </h3>
            ) : null}

            {value?.text ? (
              <p className="mt-4 text-base leading-8 text-gray-300">
                {value.text}
              </p>
            ) : null}

            {value?.buttonLabel && value?.buttonHref ? (
              <div className="mt-6">
                <Button href={value.buttonHref}>{value.buttonLabel}</Button>
              </div>
            ) : null}
          </div>
        );
      },
    },

    block: {
      normal: ({ children }) => (
        <p className="mt-6 text-[17px] leading-9 text-gray-300">{children}</p>
      ),

      h2: ({ children, value }) => {
        const title = blockToPlainText(value);
        const id = slugify(title);
        const isFirstH2 = value?._key === firstH2BlockKey;

        return (
          <h2
            id={id}
            className={
              isFirstH2
                ? "mt-0 scroll-mt-28 text-4xl font-black leading-tight tracking-tight text-white"
                : "mt-14 scroll-mt-28 border-t border-white/10 pt-8 text-4xl font-black leading-tight tracking-tight text-white"
            }
          >
            {children}
          </h2>
        );
      },

      h3: ({ children, value }) => {
        const title = blockToPlainText(value);
        const id = slugify(title);

        return (
          <h3
            id={id}
            className="mt-10 scroll-mt-28 text-2xl font-black leading-tight tracking-tight text-white"
          >
            {children}
          </h3>
        );
      },

      blockquote: ({ children }) => (
        <blockquote className="mt-8 rounded-2xl border-l-4 border-amber-400 bg-white/[0.03] p-6 text-xl font-bold leading-9 text-white">
          {children}
        </blockquote>
      ),
    },

    list: {
      bullet: ({ children }) => (
        <ul className="mt-6 list-disc space-y-3 pl-6 text-[17px] leading-8 text-gray-300">
          {children}
        </ul>
      ),

      number: ({ children }) => (
        <ol className="mt-6 list-decimal space-y-3 pl-6 text-[17px] leading-8 text-gray-300">
          {children}
        </ol>
      ),
    },

    marks: {
      link: ({ children, value }) => {
        const href = value?.href || "#";
        const isExternal = href.startsWith("http");

        if (isExternal) {
          return (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-amber-300 underline decoration-amber-400/40 underline-offset-4 transition duration-300 hover:text-amber-200"
            >
              {children}
            </Link>
          );
        }

        return (
          <Link
            href={href}
            className="font-semibold text-amber-300 underline decoration-amber-400/40 underline-offset-4 transition duration-300 hover:text-amber-200"
          >
            {children}
          </Link>
        );
      },
    },
  };
}

export function PortableTextRenderer({ value }: { value: unknown[] }) {
  const firstH2BlockKey = getFirstH2BlockKey(value);
  const components = createComponents(firstH2BlockKey);

  return <PortableText value={value} components={components} />;
}