import {onCall} from "firebase-functions/v2/https";
import {getMessaging} from "firebase-admin/messaging";

export const sendNotification = onCall(async (request) => {
  const {
    token,
    title,
    body,
  } = request.data;

  if (!token) {
    throw new Error("FCM token is required");
  }

  if (!title || !body) {
    throw new Error("Notification title and body are required");
  }

  await getMessaging().send({
    token,
    notification: {
      title,
      body,
    },
  });

  return {
    success: true,
    message: "Notification sent successfully",
  };
});