import {onCall} from "firebase-functions/v2/https";
import {getFirestore, FieldValue} from "firebase-admin/firestore";

const db = getFirestore();

export const createVolunteerAlert = onCall(async (request) => {
  const {
    userId,
    emergencyId,
    latitude,
    longitude,
    message,
  } = request.data;

  if (!userId) {
    throw new Error("User ID is required");
  }

  const volunteerAlertData = {
    userId,
    emergencyId: emergencyId ?? null,
    latitude: latitude ?? null,
    longitude: longitude ?? null,
    message: message ?? "Emergency assistance required",
    status: "pending",
    createdAt: FieldValue.serverTimestamp(),
  };

  const alertRef = await db
    .collection("volunteerAlerts")
    .add(volunteerAlertData);

  return {
    success: true,
    alertId: alertRef.id,
    message: "Volunteer alert created successfully",
  };
});
