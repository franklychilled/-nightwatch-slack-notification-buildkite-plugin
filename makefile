SHELL := /bin/bash
.SILENT:

BUILDKITE_BUILD_NUMBER ?= local
IMAGE_NAME ?= slack-notification

BUILDKITE_PLUGIN_JUNIT_SLACK_NOTIFICATION_DOCKER_CACHE ?=

test: build run

build:
	echo building $(IMAGE_NAME):build-${BUILDKITE_BUILD_NUMBER}
	docker build --tag=$(IMAGE_NAME):build-${BUILDKITE_BUILD_NUMBER} .

run:
	docker-compose  -f ./docker-compose.yml up --abort-on-container-exit

clean:
	docker-compose down

prune:
	docker system prune -f

lint:
	docker-compose run --rm lint
