// src/libs/editReservation.tsx
export default async function editReservation(
  reservationId: string,
  reservationDate: string,
  token: string
) {
  const response = await fetch(
      `https://project-sd-fronted-sub-backend.vercel.app/api/v1/reservations/${reservationId}`,
      {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(
            {reservationDate : reservationDate}
          )
      }
  );

  // Capture the response body, even if there's an error
  const responseBody = await response.text(); // Use .text() to get the body as text

  if (!response.ok) {
      console.error("Error Response Status:", response.status);
      console.error("Error Response Body:", responseBody); // Log the response body
      try {
          const errorData = JSON.parse(responseBody);
          throw new Error(errorData.message || `Something went wrong while updating the reservation. Status: ${response.status}`);
      } catch (parseError) {
          throw new Error(`Something went wrong while updating the reservation. Status: ${response.status}. Response Body: ${responseBody}`);
      }
  }

  console.log("Success Response Body:", responseBody); // Log the response body on success
  return JSON.parse(responseBody); // Parse the body as JSON if successful
}