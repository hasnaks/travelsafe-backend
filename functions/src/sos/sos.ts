import {onCall} from "firebase-functions/v2/https";
import {getFirestore, FieldValue} from "firebase-admin/firestore";

const db = getFirestore();

export const createSOS = onCall(async (request) => {
  const {userId, latitude, longitude, message} = request.data;

  if (!userId) {
    throw new Error("User ID is required");
  }

  const sosData = {
    userId,
    latitude: latitude ?? null,
    longitude: longitude ?? null,
    message: message ?? "Emergency SOS",
    status: "active",
    createdAt: FieldValue.serverTimestamp(),
  };

  const sosRef = await db.collection("emergencies").add(sosData);

  return {
    success: true,
    sosId: sosRef.id,
    message: "SOS alert created successfully",
  };
});