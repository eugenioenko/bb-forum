.PHONY: setup

setup:
	pnpm install && \
	pnpm prisma:generate && \
	pnpm prisma:migrate && \
	pnpm dev