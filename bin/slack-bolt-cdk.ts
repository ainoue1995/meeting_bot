#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { SlackBoltCdkStack } from '../src/slackBoltCdkStack'

const app = new cdk.App()
new SlackBoltCdkStack(app, 'SlackBoltCdkStack')
