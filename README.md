# Lambda, SNS, Dynamodb

On lambda execution, notification is sent to the subscribed topic when the lambda payload is having an error

If there is no error, the data will be added to dynamodb table

Lambda is not yet connected to API Gateway, so lambda will have to be invoked via CLI.

`aws lambda invoke --function-name <function name>  --cli-binary-format raw-in-base64-out --payload '{ "body": "value1" }' response.json --profile <profile name>`

To invoke SNS:

`aws lambda invoke --function-name <function name>  --cli-binary-format raw-in-base64-out --payload '{ "body": "exception occured" }' response.json --profile <profile name>`

To get the lambda function names, use:

`aws lambda list-functions --profile <profile name>`

