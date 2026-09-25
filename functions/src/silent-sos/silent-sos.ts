import {onCall} from "firebase-functions/v2/https";
import {getFirestore, FieldValue} from "firebase-admin/firestore";

const db = getFirestore();

export const createSilentSOS = onCall(async (request) => {
  const {
    userId,
    latitude,
    longitude,
  } = request.data;

  if (!userId) {
    throw new Error("User ID is required");
  }

  const silentSOSData = {
    userId,
    latitude: latitude ?? null,
    longitude: longitude ?? null,
    status: "active",
    type: "silent_sos",
    createdAt: FieldValue.serverTimestamp(),
  };

  const silentSOSRef = await db
    .collection("emergencies")
    .add(silentSOSData);

  return {
    success: true,
    silentSOSId: silentSOSRef.id,
    message: "Silent SOS created successfully",
  };
});