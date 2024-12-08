import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { ApiResponse } from "@/models/api-response";
import { setupMSW } from "./setup-msw";
import TermsPage from "@/app/terms/page";

export const handlers = [
  http.get("http://localhost:4200/api/home", () => {
    const response: ApiResponse<any> = {
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
  const component = await TermsPage();
  const result = render(component);
  const content = result.container.querySelector('[data-test-id="terms-page"]');
  expect(content).toBeTruthy();
});
