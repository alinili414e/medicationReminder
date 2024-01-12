
import AWS from 'aws-sdk';
import { getMedicationReminderMessage } from '../constants';
import { NOTIFICATION_SEND_ERROR } from '../errors';

const sns = new AWS.SNS();

export const handler = async (event: any): Promise<any> => {
    const patients = event.patients;

    for (const patient of patients) {
        const message = getMedicationReminderMessage(patient.patientName, patient.listOfDrugs.drugName);
        const smsParams = {
            Message: message,
            PhoneNumber: patient.phoneNumber
        };

        try {
            await sns.publish(smsParams).promise();
        } catch (error) {
            console.error(error);
            throw new Error(NOTIFICATION_SEND_ERROR);
        }
    }

    return { status: "Notifications sent" };
};
