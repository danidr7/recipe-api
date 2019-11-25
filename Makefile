SHELL = /bin/sh
include app.env
export $(shell sed 's/=.*//' app.env)

.PHONY: test
test:
	npm test

.PHONY: start
start:
	node app.js

.PHONY: lint
lint:
	./node_modules/.bin/eslint . --fix

.PHONY: install
install:
	npm install