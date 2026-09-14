import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-mist">
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {index > 0 && <Icon name="chevronRight" className="size-3.5 text-white/40" />}
                {isLast ? (
                  <span aria-current="page" className="text-white">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path} className="link-underline transition-colors hover:text-white">
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
