/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type NextApiHandler } from "next";
// import { type FormikRegisterForm } from "../register";
import { db } from "@/server/db";
import _ from "lodash";
// import { google } from "googleapis";
// import _ from "lodash";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") return res.status(501).end();

  const { uid } = req.query;
  try {
    const find = await db.registration.findFirst({
      where: { uid: String(uid) },
      select: {
        uid: true,
        name: true,
        lucky_draw_no: true,
      },
    });

    if (find?.uid) {
      return res
        .status(302)
        .json({
          name: find.name,
          lucky_draw: _.padStart(String(find.lucky_draw_no), 4, "0"),
        });
    } else {
      return res.status(404).end();
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err });
  }
};

export default handler;
