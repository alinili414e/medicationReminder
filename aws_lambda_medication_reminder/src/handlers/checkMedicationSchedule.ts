
import AWS from 'aws-sdk';
import { DYNAMODB_TABLE_NAME } from '../constants';
import { MEDICATION_SCHEDULE_ERROR } from '../errors';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler = async (event: any): Promise<any> => {
    const currentTime = new Date();
    const thirtyMinutesLater = new Date(currentTime.getTime() + 30 * 60000);
    const formattedTime = thirtyMinutesLater.getHours() + ':' + thirtyMinutesLater.getMinutes();

    const params = {
        TableName: DYNAMODB_TABLE_NAME,
        FilterExpression: "contains(#drugTimes, :currentTime)",
        ExpressionAttributeNames: {
            "#drugTimes": "listOfDrugs.time"
        },
        ExpressionAttributeValues: {
            ":currentTime": formattedTime
        }
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        return { patients: data.Items };
    } catch (error) {
        console.error(error);
        throw new Error(MEDICATION_SCHEDULE_ERROR);
    }
};
