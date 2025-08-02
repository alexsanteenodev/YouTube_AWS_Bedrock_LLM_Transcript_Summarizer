TYPEORM = npx ts-node ./node_modules/typeorm/cli.js
CDK = npx cdk
TS_NODE = npx ts-node
silent = >nul 2>&1
bootstrap:
	$(CDK) cdk bootstrap --profile 960790261536_AWSAdministratorAccess --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess --trust 960790261536

# Testing
########################################################################################################################
tests:
	make unit-tests
	make integration-tests
unit-tests:
	npm run test:unit
integration-tests:
	npm run test:integration

# Single Sign-On commands
########################################################################################################################
sso-test:
	aws sso login --profile 960790261536_AWSAdministratorAccess

# Deploy commands
########################################################################################################################
hotswap-test:
	$(CDK) deploy --hotswap -c config=test --profile=960790261536_AWSAdministratorAccess
deploy-test:
	$(CDK) deploy -c config=test --profile 960790261536_AWSAdministratorAccess --all

synth-test:
	$(CDK) synth -c config=test