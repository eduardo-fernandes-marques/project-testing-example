.PHONY: all info deploy-static deploy version

ENV ?= staging
override ENV := $(shell echo $(ENV) | tr '[:upper:]' '[:lower:]')
NAMESPACE=shops
PROJECT_NAME = $(shell pwd | rev | cut -f1 -d'/' - | rev)
NEW_VERSION ?= $(shell git fetch && npm version minor --no-git-tag-version | tr -d v && git checkout package.json)
K8S_CONFIG_DIR = 'deployment'

ifneq ($(shell command -v aws),)
  AWS_ACCOUNT_ID=$(shell aws sts get-caller-identity --query Account --output text)
  CURRENT_VERSION=$(shell aws ecr describe-images --repository-name $(NAMESPACE)/$(ENV)/$(PROJECT_NAME) \
      --region us-east-1 \
      --query 'sort_by(imageDetails,& imagePushedAt)[-1].imageTags[0]' --output text)

  ifndef AWS_ACCESS_KEY_ID
    AWS_ACCESS_KEY_ID := $(shell aws configure get aws_access_key_id || aws configure get AWS_ACCESS_KEY_ID)
  endif

  ifndef AWS_SECRET_ACCESS_KEY
    AWS_SECRET_ACCESS_KEY := $(shell aws configure get aws_secret_access_key || aws configure get AWS_SECRET_ACCESS_KEY)
  endif
endif

GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
CYAN   := $(shell tput -Txterm setaf 6)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)


ifeq ($(filter $(ENV),staging production),)
  $(error Environment '$(ENV)' is not supported. Please use 'staging' or 'production')
endif

ifeq (version,$(firstword $(MAKECMDGOALS)))
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(RUN_ARGS):;@:)
endif

default: | help

clean: clean-build ## Clean unused files.
	@echo files cleaned


clean-build: ## Clean next build related files.
	@rm -fr build/
	@rm -fr dist/
	@rm -fr .next

install: ## Install project dependencies
	@yarn install

lint: ## Run project lint.
	@yarn lint

test: ## Run project tests.
	@yarn test --maxWorkers=2

ecr-authenticate: ## Authenticate ECR session for push new images.
	@aws ecr get-login-password \
		--region us-east-1 | docker login \
		--username AWS \
		--password-stdin $(AWS_ACCOUNT_ID).dkr.ecr.us-east-1.amazonaws.com

build-image: ## Build docker image.
	@docker build \
    --build-arg ENV=$(ENV) \
    --build-arg SENTRY_ORG=$(SENTRY_ORG) \
    --build-arg SENTRY_PROJECT=$(SENTRY_PROJECT) \
    --build-arg SENTRY_AUTH_TOKEN=$(SENTRY_AUTH_TOKEN) \
		--build-arg SENTRY_URL=$(SENTRY_URL) \
		--build-arg SENTRY_LOG_LEVEL=$(SENTRY_LOG_LEVEL) \
		--build-arg SENTRY_DSN=$(SENTRY_DSN) -t $(PROJECT_NAME) .

tag-image: ## Tag current docker image.
	docker tag $(PROJECT_NAME):latest $(AWS_ACCOUNT_ID).dkr.ecr.us-east-1.amazonaws.com/$(NAMESPACE)/$(ENV)/$(PROJECT_NAME):$(NEW_VERSION)

push-image: ## Push docker image to AWS ECR.
	docker push $(AWS_ACCOUNT_ID).dkr.ecr.us-east-1.amazonaws.com/$(NAMESPACE)/$(ENV)/$(PROJECT_NAME):$(NEW_VERSION)

build-push-image: ## Build, tag and push docker image to AWS ECR.
	@make ecr-authenticate
	@make build-image
	@make tag-image
	@make push-image

deploy-static: ## Deploy static to AWS S3 bucket.
	@make clean-build
	@yarn build
	@NODE_ENV=$(ENV) node static-upload.js

info: ## Show some info of project.
	@echo Project name: $(PROJECT_NAME)
	@echo Current version: $(CURRENT_VERSION)
	@echo New version: $(NEW_VERSION)
	@echo Environment: $(ENV)

version: ## Bump package version -- use it with patch/minor/major.
	@npm version $(filter-out $@,$(MAKECMDGOALS)) -m "new version"

pull-image: ## Pull docker image from AWS ECR.
	@make ecr-authenticate
	docker pull $(AWS_ACCOUNT_ID).dkr.ecr.us-east-1.amazonaws.com/$(NAMESPACE)/$(ENV)/$(PROJECT_NAME):$(CURRENT_VERSION)

validate-k8s-config: ## Validate k8s deployment files.
	@kubeval --skip-kinds ExternalSecret,ENV,NEW_VERSION --strict -d $(K8S_CONFIG_DIR)

deploy: ## Make deploy in given ENV=<environment> in k8s. (if ENV=<environment omited, 'staging' will be used as default)
	@echo starting deploy in $(ENV) environment...
	@make validate-k8s-config
	@make build-push-image
	@kubectl apply -f $(K8S_CONFIG_DIR)/namespace.yml --record
	@kubectl apply -f $(K8S_CONFIG_DIR)/$(ENV)/config-map.yml --record
	@sed "s/\SHOPS_ENV/$(ENV)/g; s/{{VERSION}}/$(NEW_VERSION)/g" $(K8S_CONFIG_DIR)/$(ENV)/deployment.yml | kubectl apply --record -f -
	@sed "s/\SHOPS_ENV/$(ENV)/g" $(K8S_CONFIG_DIR)/service.yml | kubectl apply --record -f -
	@make deploy-status
	echo "deployed with success!"

deploy-no-build: ## Make deploy for existing version in given ENV=<environment> in k8s. (don't build/push image)
	@echo starting deploy in $(ENV) environment...
	@make validate-k8s-config
	@kubectl apply -f $(K8S_CONFIG_DIR)/namespace.yml --record
	@kubectl apply -f $(K8S_CONFIG_DIR)/$(ENV)/config-map.yml --record
	@sed "s/\SHOPS_ENV/$(ENV)/g; s/{{VERSION}}/$(NEW_VERSION)/g" $(K8S_CONFIG_DIR)/$(ENV)/deployment.yml | kubectl apply --record -f -
	@sed "s/\SHOPS_ENV/$(ENV)/g" $(K8S_CONFIG_DIR)/service.yml | kubectl apply --record -f -
	@make deploy-status
	echo "deployed with success!"

deploy-k8s: ## Make deploy in Kubernetes only in given ENV=<environment> (build image step is bypassed here - usually used with overriden NEW_VERSION value)
	@echo starting k8s deploy in $(ENV) environment...
	@make validate-k8s-config
	@kubectl apply -f $(K8S_CONFIG_DIR)/namespace.yml --record
	@kubectl apply -f $(K8S_CONFIG_DIR)/$(ENV)/config-map.yml --record
	@sed "s/\SHOPS_ENV/$(ENV)/g; s/{{VERSION}}/$(NEW_VERSION)/g" $(K8S_CONFIG_DIR)/$(ENV)/deployment.yml | kubectl apply --record -f -
	@sed "s/\SHOPS_ENV/$(ENV)/g" $(K8S_CONFIG_DIR)/service.yml | kubectl apply --record -f -
	@make deploy-status
	echo "deployed with success!"

deploy-status: ## Show status of current deploy in k8s.
	kubectl rollout status -w deployment/$(PROJECT_NAME)-$(ENV) -n=$(NAMESPACE)

rollback: ## Do a rollback of deployment in k8s.
	kubectl rollout undo deployment/$(PROJECT_NAME)-$(ENV) -n=$(NAMESPACE)

logs: ## Show logs of current pods in k8s.
	kubectl logs -f -l app=$(PROJECT_NAME)-$(ENV) -n=$(NAMESPACE) -c $(PROJECT_NAME)-$(ENV)

bash: ## Run interative shell session inside pod.
	kubectl exec -it $(shell kubectl get pods --field-selector status.phase=Running -l "app=$(PROJECT_NAME)-$(ENV)" -n=$(NAMESPACE) -o jsonpath='{.items[0].metadata.name}') -n=$(NAMESPACE) -- sh

show-envvars: ## Show current environment variables of pods k8s.
	kubectl exec $(shell kubectl get pods --field-selector status.phase=Running -l "app=$(PROJECT_NAME)-$(ENV)" -n=$(NAMESPACE) -o jsonpath='{.items[0].metadata.name}') -n=$(NAMESPACE) -- env

pods-list: ## Show list of current pods in k8s.
	kubectl get pods -n $(NAMESPACE) --selector=app=$(PROJECT_NAME)-$(ENV)

pods-info: ## Show info of current pods in k8s.
	kubectl top pod -n $(NAMESPACE) --selector=app=$(PROJECT_NAME)-$(ENV)

pods-describe: ## Describe info of current pods in k8s.
	kubectl describe pod -n $(NAMESPACE) --selector=app=$(PROJECT_NAME)-$(ENV)

deploy-history: ## Show history of deploys in k8s.
	kubectl rollout history deployment/$(PROJECT_NAME)-$(ENV) -n=$(NAMESPACE)

.PHONY: help
help:
	@echo ''
	@echo 'Usage:'
	@echo '  ${GREEN}ENV=<environment>${RESET} ${YELLOW}make${RESET} ${CYAN}<target>${RESET}'
	@echo ''
	@echo '  ${GREEN}Supported environments:${RESET} ${CYAN}<staging>${RESET} or ${CYAN}<production>${RESET}'
	@echo ''
	@echo 'Targets:'
	@egrep '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
