import React, {useCallback, useState} from 'react'
import {Copy as CopyIcon, Success} from '../../assets/icons'

interface CopyProps {
  copyText?: string
}

export const Copy: React.FC<CopyProps> = ({ copyText }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        return true;
      }
      // Fallback if clipboard API is not available
      return false;
    } catch (err) {
      console.error('Copy failed:', err);
      return false;
    }
  }, [])

  return (
    <button
      type="button"
      className="cursor-pointer bg-transparent border-none p-0 m-0 inline-flex items-center justify-center"
      onClick={() => !isCopied && copyText && copyToClipboard(copyText)}
      aria-label="Copy address to clipboard"
      disabled={isCopied}
    >
      {isCopied
        ? <Success className="text-accentColor" width={16} height={16} />
        : <CopyIcon width={16} height={16} />}
    </button>
  )
}
