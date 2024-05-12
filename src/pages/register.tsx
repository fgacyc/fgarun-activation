import {
  AltField,
  AltRadioField,
  EmailField,
  Field,
  RadioField,
} from "@/components/Form/Field";
import { RunnerSVG } from "@/graphics/Runner";
import { getTodayDate } from "@/helper";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as Yup from "yup";

export type FormikRegisterForm = {
  name: string;
  email: string;
  gender: "male" | "female";
  dob: string;
  contact: string;
  existing_member: "yes" | "no";
  language: "Bahasa" | "Chinese" | "English" | "Tamil" | "Others";
  preferred_language: "Bahasa" | "Chinese" | "English" | "Tamil";
  interest:
    | ""
    | "Creative Arts"
    | "Community Impact"
    | "Family"
    | "Finance"
    | "Fitness & Sports"
    | "Health & Wellness"
    | "Leadership & Development"
    | "Mental Health"
    | "Others";
  specify_interest?: string;
  with_nf: "yes" | "no";
};

export default function Register() {
  const router = useRouter();
  const { isLoading, user } = useUser();
  useEffect(() => {
    if (isLoading) return;
    if (user) return;

    void router.push("/");
  }, [isLoading, router, user]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center bg-[url('/assets/fga_run_bg.jpg')] bg-fixed bg-center p-7 py-12">
        <h1
          className="font-sf text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]"
          style={{
            textShadow: "#000 1px 0 10px",
          }}
        >
          Run For <span className="text-[#d7fe00]">FGA</span>
        </h1>
        {isLoading ? (
          <div className="h-[100px] w-[100px] rounded-lg bg-black/70 p-2">
            <RunnerSVG />
          </div>
        ) : (
          <Formik<FormikRegisterForm>
            initialValues={{
              name: user?.name ?? "",
              gender: "male",
              email: user?.email ?? "",
              dob: getTodayDate(),
              contact: "",
              existing_member: "yes",
              language: "Bahasa",
              preferred_language: "Bahasa",
              with_nf: "yes",
              interest: "",
              specify_interest: "",
            }}
            validationSchema={Yup.object().shape({
              contact: Yup.string()
                .required("Required.")
                .matches(
                  /^(\+?6?01)[0|1|2|3|4|6|7|8|9]-*[0-9]{7,8}$/,
                  "Invalid format.",
                ),
              dob: Yup.string().required("Required."),
              name: Yup.string().required("Required."),
              interest: Yup.string().required("Required."),
              specify_interest: Yup.string().when("interest", {
                is: "Others",
                then: (schema) => schema.required("Required."),
              }),
            })}
            onSubmit={(values, action) =>
              // console.log(new Date(values.dob).toISOString())
              {
                console.log(values);
                action.setSubmitting(false);
              }
            }
          >
            {({ isSubmitting, values }) => (
              <Form className="mt-5 flex w-full max-w-[350px] flex-col gap-2">
                <EmailField<FormikRegisterForm>
                  formikKey="email"
                  disabled
                  label="Email"
                />
                <Field<FormikRegisterForm>
                  formikKey="name"
                  disabled={isSubmitting}
                  label="Full Name"
                />
                <RadioField<FormikRegisterForm>
                  formikKey="gender"
                  disabled={isSubmitting}
                  label="Gender"
                  options={[
                    {
                      label: "Male",
                      value: "male",
                    },
                    {
                      label: "Female",
                      value: "female",
                    },
                  ]}
                />
                <Field<FormikRegisterForm>
                  formikKey="dob"
                  disabled={isSubmitting}
                  label="Date of Birth"
                />
                <Field<FormikRegisterForm>
                  formikKey="contact"
                  disabled={isSubmitting}
                  label="Phone no."
                />
                <RadioField<FormikRegisterForm>
                  formikKey="existing_member"
                  disabled={isSubmitting}
                  label="Existing FGA Member?"
                  options={[
                    {
                      label: "Yes",
                      value: "yes",
                    },
                    {
                      label: "No",
                      value: "no",
                    },
                  ]}
                />
                {values.existing_member === "yes" && (
                  <Field<FormikRegisterForm>
                    formikKey="language"
                    disabled={isSubmitting}
                    as="select"
                    label="Language"
                    options={[
                      {
                        label: "Bahasa",
                        value: "Bahasa",
                      },
                      {
                        label: "Chinese",
                        value: "Chinese",
                      },
                      {
                        label: "English",
                        value: "English",
                      },
                      {
                        label: "Tamil",
                        value: "Tamil",
                      },
                      {
                        label: "Others",
                        value: "Others",
                      },
                    ]}
                  />
                )}

                {values.existing_member === "yes" && (
                  <AltRadioField<FormikRegisterForm>
                    disabled={isSubmitting}
                    formikKey="with_nf"
                    label="Are you here today with a friend new to FGA?"
                    options={[
                      {
                        label: "Yes",
                        value: "yes",
                      },
                      {
                        label: "No",
                        value: "no",
                      },
                    ]}
                  />
                )}

                {values.existing_member === "no" && (
                  <AltField<FormikRegisterForm>
                    formikKey="preferred_language"
                    disabled={isSubmitting}
                    label="What is your primary / preferred language?"
                    as="select"
                    options={[
                      {
                        label: "Bahasa",
                        value: "Bahasa",
                      },
                      {
                        label: "Chinese",
                        value: "Chinese",
                      },
                      {
                        label: "English",
                        value: "English",
                      },
                      {
                        label: "Tamil",
                        value: "Tamil",
                      },
                    ]}
                  />
                )}
                {/* TODO: Change */}
                <AltField<FormikRegisterForm>
                  formikKey="interest"
                  disabled={isSubmitting}
                  label="What activities or topics are you interested in?"
                  as="select"
                  options={[
                    {
                      label: "",
                      value: "",
                    },
                    {
                      label: "Creative Arts",
                      value: "Creative Arts",
                    },
                    {
                      label: "Community Impact",
                      value: "Community Impact",
                    },
                    {
                      label: "Family",
                      value: "Family",
                    },
                    {
                      label: "Finance",
                      value: "Finance",
                    },
                    {
                      label: "Fitness & Sports",
                      value: "Fitness & Sports",
                    },
                    {
                      label: "Health & Wellness",
                      value: "Health & Wellness",
                    },
                    {
                      label: "Leadership & Development",
                      value: "Leadership & Development",
                    },
                    {
                      label: "Mental Health",
                      value: "Mental Health",
                    },
                    {
                      label: "Others",
                      value: "Others",
                    },
                  ]}
                />
                {values.interest === "Others" && (
                  <AltField
                    disabled={isSubmitting}
                    formikKey="specify_interest"
                    label="Please specify your topic of interest"
                  />
                )}

                {/* <p className="bg-white">{new Date().toLocaleDateString()}</p> */}
                <button
                  type="submit"
                  className="rounded-md bg-[#d7fe00] py-1 font-sf font-bold text-black shadow-md"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        )}
      </main>
    </>
  );
}
