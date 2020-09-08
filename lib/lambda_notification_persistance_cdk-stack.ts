import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from 'path';
import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as iam from '@aws-cdk/aws-iam';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class LambdaDynamodbMetricSnsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaRole = new iam.Role(this, 'lambaExecutionRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    const lambdaSnsPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'sns:Publish'
      ],
      resources: [
        '<ARN of the topic>'  // can be * as well - I wanted access to the SNS created below
      ]
    });

    const lambdaDynamoDbPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'dynamodb:DeleteItem',
        'dynamodb:DeleteTable',
        'dynamodb:DescribeTable',
        'dynamodb:GetItem',
        'dynamodb:PutItem',
        'dynamodb:Scan',
        'dynamodb:Query',
        'dynamodb:UpdateTable',
        'dynamodb:GetRecords'
      ],
      resources: [
        '<ARN of the table created below>'  // can be * as well - I wanted access to the specific table
      ]
    });

    lambdaRole.addToPolicy(lambdaSnsPolicy);
    lambdaRole.addToPolicy(lambdaDynamoDbPolicy);
    lambdaRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'));

    const getLambda = new lambda.Function(this, 'Python Lambda', {
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda')),
      runtime: lambda.Runtime.PYTHON_3_8,
      handler: 'pythonlambda.handler',
      role: lambdaRole
    });

    const topic = new sns.Topic(this, 'Topic', {
      displayName: 'Customer subscription topic'
    });

    topic.addSubscription(new subs.EmailSubscription('<email id>'));

    //dynamodb 
    const table = new dynamodb.Table(this, 'Person', {
      tableName: 'PersonDetailsTable',
      partitionKey: {
        name: 'sinno', type: dynamodb.AttributeType.NUMBER,
      }
    });
  }
}
