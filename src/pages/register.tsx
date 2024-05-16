import {
  // AltField,
  AltRadioField,
  EmailField,
  Field,
  // RadioField,
} from "@/components/Form/Field";
import { Title } from "@/components/Title";
import { RunnerSVG } from "@/graphics/Runner";
// import { getTodayDate } from "@/helper";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as Yup from "yup";

export type FormikRegisterForm = {
  uid: string;
  name: string;
  email: string;
  gender: "male" | "female";
  dob: string;
  contact: string;
  new_to_fga: "yes" | "no";
  language: "" | "Bahasa" | "Chinese" | "English" | "Tamil" | "Others";
  preferred_language: "" | "Bahasa" | "Chinese" | "English" | "Tamil";
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
  // with_nf: "yes" | "no";
};

export default function Register() {
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (isLoading) return;
    if (user) {
      void (async () => {
        const res = await fetch(`/api/check?uid=${user.sub}`);

        if (res.status === 302) {
          void router.push("/luckydraw");
        }
      })();
    } else void router.push("/");
  }, [isLoading, router, user]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center bg-[url('/assets/fga_run_bg.jpg')] bg-fixed bg-center p-7 py-12">
        {/* <h1
          className="font-sf text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]"
          style={{
            textShadow: "#000 1px 0 10px",
          }}
        >
          <span className="text-[#d6fe00]">FGA</span> Run 2024
        </h1> */}
        <Title />
        {isLoading ? (
          <div className="fixed left-1/2 top-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-black/70 p-2">
            <RunnerSVG />
          </div>
        ) : (
          <Formik<FormikRegisterForm>
            initialValues={{
              uid: user?.sub ?? "",
              name: user?.name ?? "",
              gender: "male",
              email: user?.email ?? "",
              dob: "2000-01-01",
              contact: "",
              new_to_fga: "no",
              language: "",
              preferred_language: "",
              // with_nf: "yes",
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
              dob: Yup.date().required("Required."),
              name: Yup.string().required("Required."),
              language: Yup.string().when("new_to_fga", {
                is: "no",
                then: (schema) => schema.required("Required."),
              }),
              preferred_language: Yup.string().when("new_to_fga", {
                is: "yes",
                then: (schema) => schema.required("Required."),
              }),
              interest: Yup.string().required("Required."),
              specify_interest: Yup.string().when("interest", {
                is: "Others",
                then: (schema) => schema.required("Required."),
              }),
            })}
            onSubmit={async (values, action) => {
              const dobInISO = new Date(values.dob).toISOString();
              // action.setSubmitting(true);
              // console.log(values);
              try {
                const post = await fetch("/api/submit", {
                  method: "POST",
                  body: JSON.stringify({ ...values, dob: dobInISO }),
                });

                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const res = await post.json();
                console.log("returns", res);

                if (post.ok) alert("Posted!");
                action.resetForm();
                await router.push("/luckydraw");
              } catch (err) {
                console.error(err);
              } finally {
                action.setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, values }) => (
              <Form className="mt-5 flex w-full max-w-[350px] flex-col gap-1">
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
                <AltRadioField<FormikRegisterForm>
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
                  label="Contact No."
                />
                <AltRadioField<FormikRegisterForm>
                  formikKey="new_to_fga"
                  disabled={isSubmitting}
                  label="Are you new to FGA?"
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
                {values.new_to_fga === "no" && (
                  <Field<FormikRegisterForm>
                    formikKey="language"
                    disabled={isSubmitting}
                    as="select"
                    label="Language Church"
                    options={[
                      { label: "", value: "" },
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

                {values.new_to_fga === "yes" && (
                  <Field<FormikRegisterForm>
                    formikKey="preferred_language"
                    disabled={isSubmitting}
                    label="What is your preferred language?"
                    as="select"
                    options={[
                      { label: "", value: "" },
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
                <Field<FormikRegisterForm>
                  formikKey="interest"
                  disabled={isSubmitting}
                  label="What are your areas of interest?"
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
                  <Field
                    disabled={isSubmitting}
                    formikKey="specify_interest"
                    label="Please specify"
                  />
                )}

                {/* <p className="bg-white">{new Date().toLocaleDateString()}</p> */}
                <button
                  type="submit"
                  className="mt-5 w-full max-w-[400px] rounded-lg bg-[#d6fe00] py-3 text-center font-sf text-[20px] font-bold text-[#000]"
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
