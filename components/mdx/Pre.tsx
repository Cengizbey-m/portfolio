import * as React from "react";
import { CodeBlock } from "@/components/mdx/CodeBlock";

type CodeProps = { className?: string; children?: React.ReactNode };

/**
 * MDX hands `pre` a single `code` element. This stays a server component so
 * that element's props are readable here; as a client component it received a
 * lazy reference in development with no props on it, and the page crashed.
 */
export function Pre({ children }: React.HTMLAttributes<HTMLPreElement>) {
  if (!children) return null;
  if (React.isValidElement<CodeProps>(children) && children.props) {
    return <CodeBlock className={children.props.className}>{children.props.children}</CodeBlock>;
  }
  return <CodeBlock>{children}</CodeBlock>;
}
