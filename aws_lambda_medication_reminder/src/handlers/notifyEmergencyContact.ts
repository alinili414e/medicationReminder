import { SNS } from "aws-sdk";
import { Handler } from "aws-lambda";
import { EMERGENCY_CONTACT_NOTIFICATION_MESSAGE } from "../constants";

interface NonResponder {
  patientId: string;
  patientName: string;
  emergencyContact: string;
}

interface NotifyEmergencyEvent {
  nonResponders: NonResponder[];
}

const sns = new SNS();

export const handler: Handler<NotifyEmergencyEvent> = async (event) => {
  const { nonResponders } = event;

  for (const patient of nonResponders) {
    const message = EMERGENCY_CONTACT_NOTIFICATION_MESSAGE.replace(
      "{patientName}",
      patient.patientName
    );
    const smsParams = {
      Message: message,
      PhoneNumber: patient.emergencyContact,
    };

    try {
      await sns.publish(smsParams).promise();
    } catch (error) {
      console.error(error);
    }
  }

  return { status: 200 };
};
