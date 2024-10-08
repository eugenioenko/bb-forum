import { IconCaretLeftFilled, IconCaretRightFilled } from "@tabler/icons-react";
import { Button } from "./button";
import { apiPageSize } from "@/models/api-request";
import { positiveIntegerOrZero } from "@/utils/number-or-zero";

interface Props {
  total?: number;
  take?: number;
  skip: number;
  isLoading?: boolean;
  onSkipChange?: (skip: number) => void;
}

export const Pagination = ({
  total = 0,
  onSkipChange,
  skip,
  isLoading,
}: Props) => {
  const page = Math.floor(skip / apiPageSize);
  const totalPages = Math.floor((total - 1) / apiPageSize);

  const onNextPage = (dir: number) => {
    const nextSkip = skip + apiPageSize * dir;
    onSkipChange?.(nextSkip);
  };

  const onPageChange = (page: string) => {
    let pageNumber = positiveIntegerOrZero(page);
    if (pageNumber > 0) {
      pageNumber -= 1;
    }
    if (pageNumber >= totalPages) {
      pageNumber = totalPages;
    }
    onSkipChange?.(pageNumber * apiPageSize);
  };

  return (
    <div className="flex gap-2 justify-end items-center">
      <Button
        isIcon
        disabled={page <= 0}
        isLoading={isLoading}
        onClick={() => onNextPage(-1)}
      >
        {!isLoading && <IconCaretLeftFilled />}
      </Button>
      <input
        type="number"
        min="0"
        step={1}
        className="w-10 ml-2"
        value={page + 1}
        onFocus={(e) => e.currentTarget.select()}
        onInput={(e) => onPageChange(e.currentTarget.value)}
      />
      <div className="font-normal">of {totalPages + 1}</div>
      <Button
        isIcon
        disabled={page >= totalPages}
        isLoading={isLoading}
        onClick={() => onNextPage(1)}
      >
        {!isLoading && <IconCaretRightFilled />}
      </Button>
    </div>
  );
};
