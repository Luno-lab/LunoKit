import { Cuer } from 'cuer'
import {Loading} from '../../assets/icons'

export type ErrorCorrectionLevel = 'low' | 'medium' | 'quartile' | 'high';

interface Props {
  ecc?: ErrorCorrectionLevel;
  logoBackground?: string;
  logoUrl?: string | (() => Promise<string>);
  logoSize?: number;
  size?: number;
  uri?: string;
}

export const QRCode = ({
  logoBackground,
  uri,
}: Props) => {
  if (!uri) {
    return (
      <Loading className={'w-[48px] h-[48px] text-secondaryFont animate-[spin_1.5s_linear_infinite]'} />
    )
  }
  return (
    <Cuer arena={logoBackground} value={uri} />
  )
}
