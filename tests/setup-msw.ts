import { SetupWorker, setupWorker } from "msw/browser";
import { beforeAll, afterEach, afterAll } from "vitest";
import { HttpHandler } from "msw";

export function setupMSW(handlers: HttpHandler[]): SetupWorker | undefined {
  let worker = setupWorker(...handlers);

  beforeAll(async () => {
    await worker.start();
  });

  afterEach(() => worker.resetHandlers());
  afterAll(() => worker.stop());

  return worker;
}
