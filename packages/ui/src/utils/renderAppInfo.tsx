import React from 'react';

// Render helper for plain text content; keeps default styling/handlers when provided.
export function renderAppInfoText(
  customText: string | undefined,
  defaultContent: React.ReactNode
): React.ReactNode {
  if (!customText) {
    return defaultContent;
  }

  if (React.isValidElement(defaultContent)) {
    const { className, children: _children, ...rest } = defaultContent.props || {};
    return React.createElement(defaultContent.type, { ...rest, className }, customText);
  }

  return customText;
}
