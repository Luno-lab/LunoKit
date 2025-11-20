import type React from 'react';
import { isValidElement } from 'react';

export function renderAppInfoContent(
  customContent: React.ReactNode | undefined,
  defaultContent: React.ReactNode
): React.ReactNode {
  if (!customContent) {
    return defaultContent;
  }

  if (typeof customContent === 'string') {
    const className = isValidElement(defaultContent)
      ? (defaultContent.props as { className?: string })?.className
      : undefined;

    return <div className={className}>{customContent}</div>;
  }

  return customContent;
}
