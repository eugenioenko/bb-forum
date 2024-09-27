import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import HomePage from "@/app/home/page";
import { ApiResponse, SectionModel } from "@/models/api-response";
import { setupMSW } from "./setup-msw";

export const handlers = [
  http.get("http://localhost:4200/api/home", () => {
    const response: ApiResponse<SectionModel[]> = {
      data: [
        {
          id: "22c76940-939d-4d93-8694-80820467c3d7",
          name: "Section",
          categories: [
            {
              id: "fbcc88ea-aa3a-4151-885a-13bdf8458349",
              name: "First Category",
              description: "This is the mock category",
              threads: [],
              createdAt: new Date().toJSON(),
            },
          ],
        },
      ],
    };
    return HttpResponse.json(response);
  }),
];

setupMSW(handlers);

test("Page", async () => {
  const component = await HomePage();
  const result = render(component);
  const btn = result.container.querySelector('[data-test-id="button"]');
  expect(btn).toBeTruthy();
  expect(btn?.textContent).toEqual("Button1");
});
