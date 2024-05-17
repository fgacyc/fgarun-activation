/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type NextApiHandler } from "next";
import { type FormikRegisterForm } from "../register";
import { db } from "@/server/db";
import { google } from "googleapis";
import _ from "lodash";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") return res.status(501).end();
  const {
    contact,
    dob,
    email,
    new_to_fga,
    gender,
    interest,
    language,
    name,
    preferred_language,
    specify_interest,
    uid,
    with_nf,
  } = JSON.parse(req.body as string) as FormikRegisterForm;

  const specific_interest2 =
    interest === "Others" ? { specific_interest: specify_interest } : null;

  const fgamember =
    new_to_fga === "no"
      ? { language: language, ...specific_interest2 }
      : { preferred_language: preferred_language };

  try {
    const up = await db.registration.create({
      data: {
        uid: uid,
        contact: contact,
        dob: dob,
        email: email,
        new_to_fga: new_to_fga === "yes",
        with_nf: new_to_fga === "yes" ? false : with_nf === "yes",
        gender: gender,
        interest: interest,
        name: name,
        ...fgamember,
      },
    });

    if (!up) return res.status(500).end();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });
    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const convertDob = new Date(up.dob).toLocaleDateString("en-US", {
      dateStyle: "medium",
      timeZone: "Asia/Kuala_Lumpur",
    });

    const gsup1 = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Master_Sheet!A:L",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            `=EPOCHTODATE(${up.created_at.getTime()},2)`,
            up.name,
            up.email,
            up.contact,
            2024 - parseInt(convertDob.slice(-4)),
            up.gender,
            up.new_to_fga ? "Yes" : "No",
            up.with_nf ? "Yes" : "No",
            up.language ?? "N/A",
            up.preferred_language ?? "N/A",
            up.new_to_fga
              ? up.interest === "Others"
                ? up.specific_interest
                : up.interest
              : "N/A",
            _.padStart(String(up.lucky_draw_no), 4, "0"),
          ],
        ],
      },
    });

    const gsup2 = up.new_to_fga
      ? await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.SPREADSHEET_ID,
          range: "NF_Redemption!A:L",
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [
              [
                `=EPOCHTODATE(${up.created_at.getTime()},2)`,
                up.name,
                up.email,
                up.contact,
                // 2024 - parseInt(convertDob.slice(-4)),
                up.gender,
                up.new_to_fga ? "Yes" : "No",
                // up.language ?? "N/A",
                up.preferred_language ?? "N/A",
                // up.interest === "Others" ? up.specific_interest : up.interest,
                _.padStart(String(up.lucky_draw_no), 4, "0"),
              ],
            ],
          },
        })
      : { status: 200 };

    if (gsup1.status === 200 && gsup2.status === 200) {
      return res.status(200).json(gsup1);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err });
  }
};

export default handler;
