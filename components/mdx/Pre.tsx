"use client";

import * as React from "react";
import { CodeBlock } from "@/components/mdx/CodeBlock";

type PreProps = React.HTMLAttributes<HTMLPreElement> & {
  children?: React.ReactElement<{ className?: string; children?: React.ReactNode }>;
};

export function Pre({ children }: PreProps) {
  if (!children) return null;
  return <CodeBlock className={children.props.className}>{children.props.children}</CodeBlock>;
}


