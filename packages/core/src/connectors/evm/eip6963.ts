interface EIP6963ProviderInfo {
  rdns: string;
  uuid: string;
  name: string;
  icon: string;
}

interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  provider: unknown;
}

const announcedProviders: EIP6963ProviderDetail[] = [];

if (typeof window !== 'undefined') {
  const handler = (event: CustomEvent<EIP6963ProviderDetail>) => {
    if (!announcedProviders.some((p) => p.info.rdns === event.detail.info.rdns)) {
      announcedProviders.push(event.detail);
    }
  };

  window.addEventListener('eip6963:announceProvider', handler as EventListener);
  window.dispatchEvent(new Event('eip6963:requestProvider'));
}

export function isProviderInstalled(rdns: string): boolean {
  return announcedProviders.some((p) => p.info.rdns === rdns);
}

export function getAnnouncedProviders(): ReadonlyArray<EIP6963ProviderDetail> {
  return [...announcedProviders];
}
