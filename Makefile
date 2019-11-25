SHELL = /bin/sh

$(shell [ -f app.env ] || touch app.env)

include app.env
export $(shell sed 's/=.*//' app.env)

IMAGE_NAME=recipe-api
CONTAINER_NAME=service-recipe

.PHONY: start
start:
	node app.js

.PHONY: install
install:
	npm install

.PHONY: lint
lint:
	./node_modules/.bin/eslint . --fix

.PHONY: audit
audit:
	npm audit fix

.PHONY: test
test:
	npm test

.PHONY: docker-build
docker-build:
	docker build -t $(IMAGE_NAME) .

.PHONY: docker-clean
docker-clean:
	docker rm -f $(CONTAINER_NAME)

.PHONY: docker-run
docker-run:
	docker run -d -p $(API_PORT):$(API_PORT) --name $(CONTAINER_NAME) --env-file app.env $(IMAGE_NAME)

.PHONY: docker-logs
docker-logs:
	docker logs -f $(CONTAINER_NAME)

.PHONY: encrypt-env
encrypt-env:
	gpg -c app.env

.PHONY: decrypt-env
decrypt-env:
	gpg app.env.gpg