import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  lang?: string;
}

export async function CodeBlock({ code, lang = "tsx" }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: "one-dark-pro",
  });

  return (
    <div
      className="h-full text-xs [&_pre]:h-full [&_pre]:!bg-transparent [&_pre]:p-4 [&_pre]:overflow-auto [&_pre]:leading-relaxed [&_pre]:font-[family-name:var(--font-fira-code)]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
