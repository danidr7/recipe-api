SHELL = /bin/sh
include app.env
export $(shell sed 's/=.*//' app.env)

IMAGE_NAME=recipe-api
CONTAINER_NAME=service-recipe

.PHONY: test
test:
	npm test

.PHONY: start
start:
	node app.js

.PHONY: lint
lint:
	./node_modules/.bin/eslint . --fix

.PHONY: audit
audit:
	npm audit fix

.PHONY: install
install:
	npm install

.PHONY: docker-build
docker-build:
	docker build -t $(IMAGE_NAME) .

.PHONY: docker-run
docker-run:
	docker run -d -p 3000:3000 --name $(CONTAINER_NAME) --env-file app.env $(IMAGE_NAME)

.PHONY: docker-clean
docker-clean:
	docker rm -f $(CONTAINER_NAME)