.PHONY: setup cleanup start

cleanup:
	@echo -e "\n###############################\n# Cleaning db and migrations #\n###############################"
	rm -rf db prisma/migrations

setup: cleanup
	@echo -e "\n###############################\n#  Dependencies Installation  #\n###############################"
	pnpm install
	@echo -e "\n###############################\n#    Prisma Initialization    #\n###############################"
	pnpm prisma:generate
	@echo "Running database migrations..."
	pnpm prisma:initialize
	@echo -e "\n###############################\n# Starting Development Server #\n###############################"
	pnpm dev

start:
	pnpm dev