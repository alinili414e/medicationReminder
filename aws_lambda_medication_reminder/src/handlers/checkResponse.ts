import { RESPONSE_CHECK_ERROR } from "../errors";
import { DynamoDB } from "aws-sdk";

interface Patient {
  patientId: string;
  patientName: string;
  phoneNumber: string;
  emergencyContact: string;
}

export const handler = async (
  event: any
): Promise<{ nonResponders: Patient[] }> => {
  // Logic to check if patients have responded to the notification

  try {
    const nonResponders: Patient[] = await getNonResponders();
    return { nonResponders };
  } catch (error) {
    console.error(error);
    throw new Error(RESPONSE_CHECK_ERROR);
  }
};

const dynamoDB = new DynamoDB.DocumentClient();

const getNonResponders = async (): Promise<Patient[]> => {
  const params = {
    TableName: "nonResponders",
    IndexName: "patientId",
    FilterExpression:
      "attribute_not_exists(responseStatus) OR responseStatus = :status",
    ExpressionAttributeValues: {
      ":status": "pending",
    },
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    return data.Items as Patient[];
  } catch (error) {
    console.error("Error querying DynamoDB:", error);
    throw new Error("Error fetching non-responders from DynamoDB");
  }
};
