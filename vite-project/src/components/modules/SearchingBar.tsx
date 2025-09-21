import React, { useRef } from "react";
import { Formik, Form, Field, FormikHelpers, FormikProps } from "formik";
import { toast } from "react-toastify";
import { BsArrowClockwise, BsSearch } from "react-icons/bs";
import { SearchContext } from "@/context/SearchContext.tsx";

interface Props {
  minLength: number;
  errorText: string;
  placeholderText?: string;
}

const SearchingBar: React.FC<Props> = ({
  minLength,
  errorText,
  placeholderText,
}) => {
  const formikRef = useRef<FormikProps<{ keyword: string }>>(null);

  const handleResetData = () => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
  };

  const { setSearchQuery } = React.useContext(SearchContext);

  return (
    <div className="w-[90%]">
      <Formik
        innerRef={formikRef}
        initialValues={{ keyword: "" }}
        onSubmit={async (
          values,
          { setSubmitting }: FormikHelpers<{ keyword: string }>
        ) => {
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

            setSearchQuery(checkStr);
          } catch (e) {
            console.error("Failed to search", e);
            toast.error("Lỗi tìm kiếm!");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form
            className="w-full flex justify-around items-center gap-4 border-2 border-[rgb(var(--main-color))] rounded-full py-2 px-4 bg-white"
            onSubmit={handleSubmit}
          >
            <fieldset className="w-full">
              <Field
                className="outline-0 w-full text-[rgb(var(--text-color))] bg-white"
                name="keyword"
                value={values.keyword}
                onChange={handleChange}
                placeholder={placeholderText ?? "Type anything"}
              />
            </fieldset>
            <div className="w-fit flex justify-center items-center gap-4">
              <button
                className={"w-fit"}
                type="button"
                onClick={() => handleResetData()}
              >
                <BsArrowClockwise size={20} color={"rgb(var(--main-color))"} />
              </button>
              <button className="w-fit" type="submit">
                <BsSearch size={20} color={"rgb(var(--main-color))"} />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchingBar;
