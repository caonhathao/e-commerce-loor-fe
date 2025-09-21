import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useProduct } from "../../context/ProductContext.tsx";
import apiClient from "../../services/apiClient.tsx";
import endpoints from "../../services/endpoints.tsx";
import React from "react";

const AuthenticateBox = ({
  setIsDelete,
  setIsAllow,
  message,
}: {
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAllow: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}) => {
  const { setProduct } = useProduct();

  const handleCancel = () => {
    setIsDelete(false);
    setProduct(null);
  };

  const formData = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await apiClient.post(endpoints.auth.authBrand, values);
        if (response) {
          toast.success("Xác thực thành công", { autoClose: 1000 });
          //try to delete the product
          setIsAllow(true);
          setIsDelete(false);
        }
      } catch (e) {
        console.log("Failed to verify", e);
      }
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Please enter the password"),
    }),
    validateOnBlur: true,
  });

  return (
    <div
      className={
        "w-full h-full absolute top-0 flex flex-row items-center justify-center"
      }
    >
      <div
        className={
          "w-60 h-fit border border-b-gray-500 rounded-xl shadow-gray-300 shadow-xl bg-white p-3"
        }
      >
        <h3 className={"text-center font-bold text-lg"}>{message}</h3>
        <form
          className={"w-full flex flex-col items-center justify-center mt-3"}
          onSubmit={(e) => {
            e.preventDefault();
            formData.handleSubmit(e);
          }}
        >
          <fieldset className={"border border-b-gray-500 rounded-xl"}>
            <legend className={"text-center"}>Xác thực tài khoản</legend>
            <input
              className={"pl-2"}
              type={"text"}
              name={"password"}
              placeholder={"Mật khẩu tài khoản"}
              onChange={formData.handleChange}
            />
          </fieldset>
          {formData.errors.password && formData.touched.password && (
            <p className={"text-red-600"}>
              <small className={"text-red-600 italic"}>
                {formData.errors.password}
              </small>
            </p>
          )}
          <div
            className={"flex flex-row items-center justify-evenly w-full mt-3"}
          >
            <button
              type={"button"}
              className={"rounded-xl px-2 py-2 text-white bg-red-400"}
              onClick={handleCancel}
            >
              Hủy bỏ
            </button>
            <button
              type={"submit"}
              className={"rounded-xl px-2 py-2 text-white bg-green-600"}
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AuthenticateBox;
