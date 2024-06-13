import { z } from "zod";

import { adminProcedure, router } from "../trpc";

import { CREATE_STATION_SCHEMA, EDIT_STATION_SCHEMA } from "@/utils/types/zod";
import db from "@/utils/db";
import createHashUtil from "@/utils/createHash";

const stationRouter = router({
  addStation: adminProcedure
    .input(CREATE_STATION_SCHEMA)
    .output(z.boolean())
    .mutation(async function ({ input }) {
      try {
        const { name, username, password } = input;
        // creating station
        const station = await db.station.create({
          data: {
            stationName: name,
          },
          select: {
            id: true,
          },
        });
        // creating broadcaster
        const broadcaster = await db.broadCaster.create({
          data: {
            username: username,
            password: createHashUtil(password),
            stationID: station.id,
          },
        });
        return !!broadcaster;
      } catch (error: any) {
        throw new Error(error.message);
      }
    }),
  editStation: adminProcedure
    .input(EDIT_STATION_SCHEMA)
    .output(z.boolean())
    .mutation(async function ({ input }) {
      try {
        const { stationName, stationId } = input;
        const station = await db.station.update({
          where: {
            id: stationId,
            BroadCaster: {
              every: {
                stationID: stationId,
              },
            },
          },
          data: {
            stationName: stationName,
          },
        });
        return !!station;
      } catch (error: any) {
        throw new Error(error.message);
      }
    }),
  deleteStation: adminProcedure
    .input(z.string())
    .output(z.boolean())
    .mutation(async function ({ input }) {
      try {
        const station = await db.station.delete({
          where: {
            id: input,
          },
        });
        return !!station;
      } catch (error: any) {
        throw new Error(error.message);
      }
    }),
});

export default stationRouter;
