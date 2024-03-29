# AWS Lambda Medication Reminder

## Description

The AWS Lambda Medication Reminder is a serverless application designed to send medication reminders to patients who may not be up to date using smartphones and apps. It leverages AWS Lambda functions, DynamoDB, and SNS to notify patients about their medication schedules.If there is no confirmation response from the patients regarding taking their medication their emergency contacts will be notified via text.

## Features

- **Automated Reminders**: Sends automated reminders to patients for their medication times.
- **DynamoDB Integration**: Utilizes AWS DynamoDB for efficient data storage and retrieval.
- **Serverless Architecture**: Built on AWS Lambda for a scalable, serverless implementation.

## Prerequisites

Before deploying and using this project, ensure you have the following:

- AWS Account
- AWS CLI configured with appropriate permissions
- Node.js and npm installed
- Knowledge of AWS services (Lambda, DynamoDB, SNS)

## Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/medicationReminder.git
cd medicationReminder
