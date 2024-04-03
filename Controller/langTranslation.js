import { translate } from 'google-translate-api-browser';
import { textToSpeech } from './textToSpeech.js';

import Presets from '../Model/Presets.js';
import Language from '../Model/Language.js';

const insertLanguage = async (lang, translate) => {
    const language = new Language({ language: lang, translated: translate });
    const savedLang = await language.save();
    return savedLang._id;
}

export const langTranslation = async (req, res, next) => {
    try {
        const langTranslationsArray = [];

        // Now you can join the translated texts if needed
        let reqLangObjId = [];

        const body = req.body;

        console.log(body.languages.length);

        if (body.languages.length > 0) {

            for (const lang of body.languages) {
                const langTranslate = await translate(body.original_text, { to: lang });
                reqLangObjId.push(await insertLanguage(lang, langTranslate.text));
                langTranslationsArray.push(langTranslate.text);
            }

        } else {
            const guTranslate = await translate(body.original_text, { to: "gu" });
            reqLangObjId.push(await insertLanguage("gu", guTranslate.text));
            langTranslationsArray.push(guTranslate.text)

            const hiTranslate = await translate(body.original_text, { to: "hi" });
            reqLangObjId.push(await insertLanguage("hi", hiTranslate.text));
            langTranslationsArray.push(hiTranslate.text)

            const mrTranslate = await translate(body.original_text, { to: "mr" });
            reqLangObjId.push(await insertLanguage("mr", mrTranslate.text));
            langTranslationsArray.push(mrTranslate.text)
        }

        const langTranslations = langTranslationsArray.join('          ');
        console.log(langTranslations);
        const URL = await textToSpeech(body, res, next, langTranslations);

        const newPresets = new Presets({
            title: body.title,
            tag: body.tag,
            languages: reqLangObjId,
            original_text: body.original_text,
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