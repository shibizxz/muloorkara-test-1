import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { mainNav } from "@/data/navigation";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint" />
      <div className="container-site flex min-h-[80svh] flex-col justify-center pb-20 pt-[calc(var(--header-h)+3rem)]">
        <p className="type-eyebrow flex items-center gap-3 text-gold-light">
          <span aria-hidden="true" className="h-px w-10 bg-gold" />
          Error 404
        </p>
        <h1 className="type-h1 mt-5 max-w-3xl">This page could not be found.</h1>
        <p className="type-lead mt-6 max-w-2xl text-mist">
          The address may have changed or the page may no longer exist. Use one of the links below to continue.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="outline-light">
            Contact YUKTI
          </ButtonLink>
        </div>
        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-2 border-t border-white/10 pt-8">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="inline-flex min-h-11 items-center gap-2 font-semibold text-mist hover:text-white">
                {item.label}
                <Icon name="arrowRight" className="size-4 text-gold" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
