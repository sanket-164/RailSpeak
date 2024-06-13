import express from "express";

import { loginBroadcaster } from "./Controller/loginBroadcaster.js";
import { fetchPreset } from "./Controller/fetchPreset.js";
import { deletePreset } from "./Controller/deletePreset.js";
import { langTranslation } from "./Controller/langTranslation.js";
import verifyUser from "./Middleware/verifyUser.js";
import { editPreset } from "./Controller/editPreset.js";

const router = express.Router();

router.post('/login', loginBroadcaster);

router.use(verifyUser);

router.get("/fetchpreset", fetchPreset);
router.post('/translate', langTranslation);
router.delete('/delPreset', deletePreset);
router.put('/editPreset', editPreset);
export default router;