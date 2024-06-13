import db from "@/utils/db";
import verifyAction from "@/utils/verifyAction";

export default async function getAvailableStations() {
  try {
    await verifyAction();
    const stations = await db.station.findMany({
      select: {
        BroadCaster: true,
        stationName: true,
        id: true,
      },
    });
    return stations;
  } catch (error: any) {
    console.error(error);
    return [];
  }
}
