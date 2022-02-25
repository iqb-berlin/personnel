.PHONY: build deploy

build: ## Build docker image
	npx nx run-many --target=build --projects=iqb-personnel-api,iqb-personnel-management --parallel
	docker-compose build

deploy:build
	docker login && docker push iqbberlin/personnel-backend:latest && docker push iqbberlin/personnel-frontend:latest
