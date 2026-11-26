import { site } from "@/site.config";

export function Footer() {
  return (
    <footer className="py-8 text-[13px] text-muted">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-1 px-5 md:flex-row md:justify-between md:px-8">
        <p>{site.name}, {site.tagline.toLowerCase()} {site.cityIn}</p>
        <p>© {new Date().getFullYear()} {site.legal}</p>
      </div>
    </footer>
  );
}
