import { IconCaretLeftFilled, IconCaretRightFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { useRef, useState } from "react";
import { apiPageSize } from "@/models/api-request";

interface Props {
  total?: number;
  take?: number;
  onPageChange?: (skip: number) => void;
}

export const Pagination = ({ total = 0, take, onPageChange }: Props) => {
  const intake = take ? take : apiPageSize;
  const skip = useRef(intake);

  function onNextPage(dir: number) {
    let url = new URL(window.location.href);
    const currentSkip = url.searchParams.get("skip");
    if (currentSkip) {
      skip.current = Number(currentSkip);
    }
    skip.current += intake * dir;
    url.searchParams.set("skip", `${skip.current}`); // Replace or add the parameter
    window.history.pushState(null, "", url);
    onPageChange?.(skip.current);
  }
  return (
    <div className="flex gap-2 justify-end items-center">
      <Button isIcon onClick={() => onNextPage(-1)}>
        <IconCaretLeftFilled />
      </Button>
      <input type="number" min="0" step={1} className="w-14 ml-2" />
      <div className="font-normal">of 23</div>
      <Button isIcon onClick={() => onNextPage(1)}>
        <IconCaretRightFilled />
      </Button>
    </div>
  );
};
