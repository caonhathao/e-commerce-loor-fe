import {BsSearch} from "react-icons/bs";
import React, {SetStateAction} from "react";
import {Formik, Form, Field} from "formik";
import {toast} from "react-toastify";
import apiClient from "../../services/apiClient.tsx";

interface Props {
    url: string;
    setData: React.Dispatch<SetStateAction<any>>
    placeholderText?: string;
}

const SearchingBar: React.FC<Props> = ({url, setData, placeholderText}) => {

    return (
        <div className="w-[80%]">
            <Formik
                initialValues={{keyword: ''}}
                onSubmit={async (values) => {
                    try {
                        const response = await apiClient.get(url, {
                            params: {
                                keyword: values.keyword,
                            }
                        });
                        if (response.status === 200) {
                            setData(response.data);
                        }
                    } catch (e) {
                        console.error('Failed to search', e);
                        toast.error('Error!');
                    }
                }}
            >
                <Form
                    className="w-full flex justify-around items-center border-2 border-[rgb(var(--main-color))] rounded-full p-2 bg-[rgb(var(--background))]">
                    <fieldset className="w-[80%]">
                        <Field
                            className="outline-0 w-full text-[rgb(var(--text-color))] bg-transparent"
                            name="keyword"
                            placeholder={placeholderText ?? 'Type anything'}
                        />
                    </fieldset>
                    <button className="w-[10%]" type="submit">
                        <BsSearch size={20} color={'rgb(var(--main-color))'}/>
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default SearchingBar;
