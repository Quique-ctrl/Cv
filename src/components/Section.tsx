import { ReactNode } from "react";

export default function Section({ id, title, children }: { id?: string; title?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      {title && <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">{title}</h2>}
      {children}
    </section>
  );
}
