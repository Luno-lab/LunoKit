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
    } catch (err) {
      throw new Error('Copy failed: Your browser has no navigator clipboard api!')
    }
  }, [])

  return (
    <>
      {isCopied
        ? (
          <Success className={'w-[15px] h-[15px] cursor-auto text-accentFont'} />
        )
        : (
          <CopyIcon
            className="w-[13px] h-[13px] cursor-pointer"
            onClick={() => copyText && copyToClipboard(copyText)}
          />
        )}
    </>

  )
}
