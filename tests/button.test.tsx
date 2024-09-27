import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { Button } from "@/components/button";

test("Page", () => {
  const result = render(<Button type="button">Button1</Button>);
  const btn = result.container.querySelector('[data-test-id="button"]');
  expect(btn).toBeTruthy();
  expect(btn?.textContent).toEqual("Button1");
});
