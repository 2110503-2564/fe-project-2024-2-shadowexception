import BookingListClient from "./BookingListClient";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth/next";
import getReservations from "@/libs/getReservations";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default async function BookingList() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const bookingItems = await getReservations(session.user.token.toString());

  return (
    <>
      <Suspense
        fallback={
          <p>
            Loading . . . <LinearProgress />
          </p>
        }
      >
        <BookingListClient
          token={session.user.token.toString()}
          bookings={bookingItems.data}
        />
      </Suspense>
    </>
  );
}
