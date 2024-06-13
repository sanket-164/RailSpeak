import { z } from "zod";

export const LOGIN_SCHEMA = z.object({
  username: z.string(),
  password: z.string(),
});

export const CREATE_STATION_SCHEMA = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
});

export const EDIT_STATION_SCHEMA = z.object({
  stationName: z.string(),
  stationId: z.string(),
});
