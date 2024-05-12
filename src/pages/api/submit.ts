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
    existing_member,
    gender,
    interest,
    language,
    name,
    preferred_language,
    with_nf,
    specify_interest,
    uid,
  } = JSON.parse(req.body as string) as FormikRegisterForm;

  const fgamember =
    existing_member === "yes"
      ? { language: language, with_nf: with_nf === "yes" }
      : { preferred_language: preferred_language };

  const specific_interest2 =
    interest === "Others" ? { specific_interest: specify_interest } : null;
  try {
    const up = await db.registration.create({
      data: {
        uid: uid,
        contact: contact,
        dob: dob,
        email: email,
        existing_member: existing_member === "yes",
        gender: gender,
        interest: interest,
        name: name,
        ...fgamember,
        ...specific_interest2,
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

    const gsup = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "A:L",
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
            up.existing_member ? "Yes" : "No",
            up.language ?? "N/A",
            up.with_nf ? "Yes" : "No",
            up.preferred_language ?? "N/A",
            up.interest === "Others" ? up.specific_interest : up.interest,
            _.padStart(String(up.lucky_draw_no), 4, "0"),
          ],
        ],
      },
    });

    return res.status(200).json(gsup);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err });
  }
};

export default handler;
