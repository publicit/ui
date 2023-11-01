.PHONY: docker-build
docker-build:
	docker build -t ui --no-cache \
	--build-arg REACT_APP_TAG_NAME=$(REACT_APP_TAG_NAME) \
	--build-arg REACT_APP_GIT_COMMIT=${REACT_APP_GIT_COMMIT} .

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
