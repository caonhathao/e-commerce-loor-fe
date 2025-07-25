import React, {SetStateAction, useEffect, useRef} from "react";
import {Formik, Form, Field, FormikHelpers, FormikProps} from "formik";
import {toast} from "react-toastify";
import {BsSearch} from "react-icons/bs";
import apiClient from "../../services/apiClient.tsx";

interface Props {
    url: string;
    minLength: number;
    errorText: string;
    setData: React.Dispatch<SetStateAction<any>>;
    reload: boolean;
    placeholderText?: string;
}

const SearchingBar: React.FC<Props> = ({
                                           url,
                                           minLength,
                                           errorText,
                                           setData,
                                           reload,
                                           placeholderText,
                                       }) => {
    const formikRef = useRef<FormikProps<{ keyword: string }>>(null);

    useEffect(() => {
        if (reload && formikRef.current) {
            formikRef.current.resetForm();
        }
    }, [reload]);

    return (
        <div className="w-[80%]">
            <Formik
                innerRef={formikRef}
                initialValues={{ keyword: '' }}
                onSubmit={async (values, { setSubmitting }: FormikHelpers<{ keyword: string }>) => {
                    try {
                        const checkStr = values.keyword.trim();
                        if (checkStr.length === 0) {
                            toast.warning(errorText);
                            return;
                        }

                        if (checkStr.length < minLength) {
                            toast.warning(`Tối thiểu ${minLength} kí tự`);
                            return;
                        }

                        const response = await apiClient.get(url, {
                            params: {
                                keyword: values.keyword,
                            },
                        });
                        if (response.status === 200) {
                            setData(response.data);
                        }
                    } catch (e) {
                        console.error("Failed to search", e);
                        toast.error("Error!");
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ values, handleChange, handleSubmit }) => (
                    <Form
                        className="w-full flex justify-around items-center border-2 border-[rgb(var(--main-color))] rounded-full p-2 bg-white"
                        onSubmit={handleSubmit}
                    >
                        <fieldset className="w-[80%]">
                            <Field
                                className="outline-0 w-full text-[rgb(var(--text-color))] bg-white"
                                name="keyword"
                                value={values.keyword}
                                onChange={handleChange}
                                placeholder={placeholderText ?? "Type anything"}
                            />
                        </fieldset>
                        <button className="w-[10%]" type="submit">
                            <BsSearch size={20} color={"rgb(var(--main-color))"} />
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SearchingBar;
