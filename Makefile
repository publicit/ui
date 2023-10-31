.PHONY: docker-build
docker-build:
	docker build -t ui .

.PHONY: local-build
local-build:
	docker compose build

.PHONY: local-start
local-start:
	docker compose up -d

.PHONY: local-logs
local-logs:
	docker compose logs -f

.PHONY: local-stop
local-stop:
	docker compose down --remove-orphans
