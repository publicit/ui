.PHONY: docker-build
docker-build:
	docker build -t ui --no-cache \
	--build-arg NEXT_PUBLIC_TAG_NAME=$(NEXT_PUBLIC_TAG_NAME) \
	--build-arg NEXT_PUBLIC_GIT_COMMIT=${NEXT_PUBLIC_GIT_COMMIT} .

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
