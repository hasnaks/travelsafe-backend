import {onCall} from "firebase-functions/v2/https";
import {getFirestore, FieldValue} from "firebase-admin/firestore";

const db = getFirestore();

export const createEmergency = onCall(async (request) => {
  const {
    userId,
    type,
    latitude,
    longitude,
    message,
  } = request.data;

  if (!userId) {
    throw new Error("User ID is required");
  }

  if (!type) {
    throw new Error("Emergency type is required");
  }

  const emergencyData = {
    userId,
    type,
    latitude: latitude ?? null,
    longitude: longitude ?? null,
    message: message ?? null,
    status: "active",
    createdAt: FieldValue.serverTimestamp(),
  };

  const emergencyRef = await db
    .collection("emergencies")
    .add(emergencyData);

  return {
    success: true,
    emergencyId: emergencyRef.id,
    message: "Emergency created successfully",
  };
});