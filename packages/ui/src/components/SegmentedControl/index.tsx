import type React from 'react';
import { useMemo } from 'react';
import { cs } from '../../utils';

export interface SegmentedControlItem {
  value: string;
  label: React.ReactNode;
}

export interface SegmentedControlProps {
  items: SegmentedControlItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  items,
  value,
  onChange,
  className,
}) => {
  const activeIndex = useMemo(
    () => Math.max(items.findIndex((item) => item.value === value), 0),
    [items, value]
  );

  return (
    <div
      className={cs(
        'luno:relative luno:flex luno:rounded-[6px] luno:bg-segmentedControlBackground luno:p-[5px] luno:w-full luno:min-h-[35px]',
        className
      )}
    >
      <div
        className="luno:absolute luno:top-[3px] luno:bottom-[3px] luno:rounded-[4px] luno:bg-segmentedControlActiveBackground luno:transition-transform luno:duration-200 luno:ease-in-out"
        style={{
          width: `calc((100% - 6px) / ${items.length})`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />

      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onChange(item.value)}
          className={cs(
            'luno:relative luno:z-[1] luno:flex-1 luno:text-sm luno:font-medium luno:text-center luno:cursor-pointer luno:border-none luno:rounded-[4px] luno:transition-colors luno:duration-200',
            item.value === value
              ? 'luno:text-segmentedControlActiveText'
              : 'luno:text-segmentedControlText'
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
