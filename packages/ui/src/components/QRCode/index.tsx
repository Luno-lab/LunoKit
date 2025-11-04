import { Cuer } from 'cuer';

export type ErrorCorrectionLevel = 'low' | 'medium' | 'quartile' | 'high';

interface Props {
  ecc?: ErrorCorrectionLevel;
  logoBackground?: string;
  logoUrl?: string | (() => Promise<string>);
  logoSize?: number;
  size: number;
  uri?: string;
}

export const QRCode = ({ logoBackground, uri, size }: Props) => {
  if (!uri) {
    const QR_GRID_SIZE = 57;
    const FINDER_SIZE_WITH_MARGIN = 8;
    const ARENA_GRID_SIZE = Math.floor(QR_GRID_SIZE / 4);

    const cellSize = size / QR_GRID_SIZE;
    const arenaSize = ARENA_GRID_SIZE * cellSize;
    const arenaStart = Math.ceil(QR_GRID_SIZE / 2 - ARENA_GRID_SIZE / 2);
    const arenaEnd = arenaStart + ARENA_GRID_SIZE;

    const generateSkeletonDots = () => {
      const dots = [];
      for (let i = 0; i < QR_GRID_SIZE; i++) {
        for (let j = 0; j < QR_GRID_SIZE; j++) {
          if (i >= arenaStart && i < arenaEnd && j >= arenaStart && j < arenaEnd) continue;

          const isInFinder =
            (i < FINDER_SIZE_WITH_MARGIN && j < FINDER_SIZE_WITH_MARGIN) ||
            (i < FINDER_SIZE_WITH_MARGIN && j >= QR_GRID_SIZE - FINDER_SIZE_WITH_MARGIN) ||
            (i >= QR_GRID_SIZE - FINDER_SIZE_WITH_MARGIN && j < FINDER_SIZE_WITH_MARGIN);
          if (isInFinder) continue;

          const cx = j + 0.5;
          const cy = i + 0.5;

          dots.push(
            <rect
              key={`${i}-${j}`}
              x={cx - 0.4}
              y={cy - 0.4}
              width={0.8}
              height={0.8}
              rx={0.4}
              fill="var(--color-walletSelectItemBackground)"
            />
          );
        }
      }
      return dots;
    };

    const renderFinderPattern = ({
      position,
    }: {
      position: 'top-left' | 'top-right' | 'bottom-left';
    }) => {
      const finderSize = 7 * cellSize;
      const positionStyles = {
        'top-left': { top: 0, left: 0 },
        'top-right': { top: 0, right: 0 },
        'bottom-left': { bottom: 0, left: 0 },
      };

      return (
        <div
          className="luno:absolute luno:z-[4]"
          style={{
            width: `${finderSize}px`,
            height: `${finderSize}px`,
            ...positionStyles[position],
          }}
        >
          <div
            className="luno:absolute luno:inset-0"
            style={{
              borderRadius: `${2 * cellSize}px`,
              border: `${cellSize}px solid var(--color-walletSelectItemBackground)`,
            }}
          />
          <div
            className="luno:absolute luno:left-1/2 luno:top-1/2 luno:-translate-x-1/2 luno:-translate-y-1/2"
            style={{
              width: `${3 * cellSize}px`,
              height: `${3 * cellSize}px`,
              borderRadius: `${0.5 * cellSize}px`,
              backgroundColor: 'var(--color-walletSelectItemBackground)',
            }}
          />
        </div>
      );
    };

    const renderArenaLogo = () => {
      const logoStart = arenaStart * cellSize;

      return (
        <div
          className="luno:absolute luno:z-[4] luno:flex luno:items-center luno:justify-center luno:box-border"
          style={{
            width: `${arenaSize}px`,
            height: `${arenaSize}px`,
            left: `${logoStart}px`,
            top: `${logoStart}px`,
            borderRadius: `${cellSize}px`,
            padding: `${cellSize / 2}px`,
          }}
        >
          <img
            src={logoBackground}
            alt="QR Code Logo"
            className="luno:h-full luno:w-full luno:object-cover"
            style={{
              borderRadius: `${cellSize}px`,
            }}
          />
        </div>
      );
    };

    return (
      <div
        className="luno:relative luno:overflow-hidden luno:flex luno:items-center luno:justify-center"
        style={{
          width: size,
          height: size,
          borderRadius: `${2 * cellSize}px`,
        }}
      >
        <svg
          className="luno:absolute luno:inset-0 luno:z-[3]"
          width={size}
          height={size}
          viewBox={`0 0 ${QR_GRID_SIZE} ${QR_GRID_SIZE}`}
        >
          {generateSkeletonDots()}
        </svg>

        <div
          className="luno:absolute luno:inset-0 luno:z-[100]"
          style={{
            background:
              'linear-gradient(90deg, transparent 50%, var(--color-walletSelectItemBackgroundHover), transparent)',
            backgroundSize: '200% 100%',
            transform: 'scale(1.5) rotate(45deg)',
            animation: 'shimmer 1000ms linear infinite both',
          }}
        />

        {renderFinderPattern({ position: 'top-left' })}
        {renderFinderPattern({ position: 'top-right' })}
        {renderFinderPattern({ position: 'bottom-left' })}

        {logoBackground && renderArenaLogo()}
      </div>
    );
  }
  return <Cuer arena={logoBackground} value={uri} />;
};
