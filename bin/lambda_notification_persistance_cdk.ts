#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LambdaNotificationPersistanceCdkStack } from '../lib/lambda_notification_persistance_cdk-stack';

const app = new cdk.App();
new LambdaNotificationPersistanceCdkStack(app, 'LambdaNotificationPersistanceCdkStack');
