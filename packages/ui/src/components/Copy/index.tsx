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
      }
      throw new Error('Your browser has no navigator clipboard api!')
    } catch (err) {
      console.error('Copy failed:', err);
    }
  }, [])

  return (
    <>
      {isCopied
        ? (
          <Success className={'cursor-auto text-accentFont'} />
        )
        : (
          <CopyIcon
            className="cursor-pointer"
            onClick={() => copyText && copyToClipboard(copyText)}
          />
        )}
    </>

  )
}
