import { IconCaretLeftFilled, IconCaretRightFilled } from "@tabler/icons-react";
import { Button } from "./button";
import { apiPageSize } from "@/models/api-request";

interface Props {
  total?: number;
  take?: number;
  skip: number;
  isLoading?: boolean;
  onSkipChange?: (skip: number) => void;
}

export const Pagination = ({
  total = 0,
  take,
  onSkipChange,
  skip,
  isLoading,
}: Props) => {
  const intake = take ? take : apiPageSize;

  function onNextPage(dir: number) {
    let url = new URL(window.location.href);
    const nextSkip = skip + intake * dir;
    url.searchParams.set("skip", `${nextSkip}`);
    window.history.pushState(null, "", url);
    onSkipChange?.(nextSkip);
  }

  return (
    <div className="flex gap-2 justify-end items-center">
      <Button isIcon isLoading={isLoading} onClick={() => onNextPage(-1)}>
        {!isLoading && <IconCaretLeftFilled />}
      </Button>
      <input type="number" min="0" step={1} className="w-14 ml-2" />
      <div className="font-normal">of 23</div>
      <Button isIcon isLoading={isLoading} onClick={() => onNextPage(1)}>
        {!isLoading && <IconCaretRightFilled />}
      </Button>
    </div>
  );
};
