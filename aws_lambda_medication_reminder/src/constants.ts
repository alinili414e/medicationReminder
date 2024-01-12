export const DYNAMODB_TABLE_NAME = "EntirePatientDB";
export const AWS_REGION = "us-east-1";

export const getMedicationReminderMessage = (
  patientName: string,
  drugName: string
): string => {
  return `Hello ${patientName}, please take your medication: ${drugName}. Click here to confirm: [Link]`;
};

export const EMERGENCY_CONTACT_NOTIFICATION_MESSAGE =
  "Alert: {patientName} did not confirm taking their medication.";
