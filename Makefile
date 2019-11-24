SHELL = /bin/sh
include app.env
export $(shell sed 's/=.*//' app.env)

.PHONY: test
test:
	npm test

.PHONY: start
start:
	node app.js