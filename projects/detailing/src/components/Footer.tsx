import { site } from "@/site.config";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-8">
        <p><span className="font-display font-bold text-fg">{site.name}</span> · {site.tagline} {site.cityIn}</p>
        <p>© {new Date().getFullYear()} {site.legal}</p>
      </div>
    </footer>
  );
}
