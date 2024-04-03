import { translate } from 'google-translate-api-browser';
import { textToSpeech } from './textToSpeech.js';

import Presets from '../Model/Presets.js';
import Language from '../Model/Language.js';
import createHttpError from 'http-errors';

const insertLanguage = async (lang, translate) => {
    const language = new Language({ language: lang, translated: translate });
    const savedLang = await language.save();
    return savedLang._id;
}

export const langTranslation = async (req, res, next) => {
    try {

        const { station_id, title, tag, languages, original_text } = req.body;

        if(!station_id || !title || !tag || !languages || !original_text) throw createHttpError(400, "Missing required fields");  
        
        const langTranslationsArray = [];
        let reqLangObjId = [];

        if (languages.length > 0) {

            for (const lang of languages) {
                const langTranslate = await translate(original_text, { to: lang });
                reqLangObjId.push(await insertLanguage(lang, langTranslate.text));
                langTranslationsArray.push(langTranslate.text);
            }

        } else {
            const guTranslate = await translate(original_text, { to: "gu" });
            reqLangObjId.push(await insertLanguage("gu", guTranslate.text));
            langTranslationsArray.push(guTranslate.text)

            const hiTranslate = await translate(original_text, { to: "hi" });
            reqLangObjId.push(await insertLanguage("hi", hiTranslate.text));
            langTranslationsArray.push(hiTranslate.text)

            const mrTranslate = await translate(original_text, { to: "mr" });
            reqLangObjId.push(await insertLanguage("mr", mrTranslate.text));
            langTranslationsArray.push(mrTranslate.text)
        }

        const langTranslations = langTranslationsArray.join('\t');
        // console.log(langTranslations);
        const URL = await textToSpeech(req, res, next, langTranslations);

        const newPresets = new Presets({
            station_id: station_id,
            title: title,
            tag: tag,
            languages: reqLangObjId,
            original_text: original_text,
            audio_url: URL
        });

        const preset = await newPresets.save();

        res.status(200).json(preset);
    } catch (error) {
        next(error);
    }
}

// translate(message, { to: "hi" })
//     .then(res => {
//         console.log(res.text)
//     })
//     .catch(err => {
//         console.error(err);
//     });

// translate(message, { to: "mr" })
//     .then(res => {
//         console.log(res.text)
//     })
//     .catch(err => {
//         console.error(err);
//     });

// translate(message, { to: "ur" })
//     .then(res => {
//         console.log(res.text)
//     })
//     .catch(err => {
//         console.error(err);
//     });