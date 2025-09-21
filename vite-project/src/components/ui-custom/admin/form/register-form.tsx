import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik } from "formik";
import apiClient from "@/services/apiClient";
import endpoints from "@/services/endpoints";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { login } = useAuth();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        phone_number: "",
        confirm_password: "",
      }}
      onSubmit={async (values) => {
        try {
          const response = await apiClient.post(
            endpoints.auth.userRegister,
            values
          );
          if (response.status === 200) {
            const { access, data } = response.data;
            login(access, data);
            toast.success("Đăng kí thành công", { autoClose: 1500 });
            setTimeout(() => {
              navigate("/");
            }, 1700);
          }
        } catch (err) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          toast.error(err.response.data.message);
        }
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Email không hợp lệ").required("Thiếu email"),
        phone_number: Yup.string()
          .matches(
            /^(03|05|07|08|09|01[2689])[0-9]{8}$/,
            "Số điện thoại không hợp lệ"
          )
          .required("Thiếu số điện thoại"),
        password: Yup.string()
          .min(6, "Tối thiểu 6 kí tự")
          .required("Thiếu mật khẩu"),
        confirm_password: Yup.string()
          .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
          .required("Thiếu xác nhận mật khẩu"),
      })}
      validateOnBlur={true}
    >
      {({ handleChange, handleBlur, handleSubmit, errors }) => {
        return (
          <form
            className={cn("flex flex-col gap-6", className)}
            {...props}
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Create new admin account</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => {
                    handleChange(e);
                    e.target.setCustomValidity("");
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    if (errors.email) {
                      e.target.setCustomValidity(errors.email);
                    } else {
                      e.target.setCustomValidity("");
                    }
                  }}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="phone_number">Phone number</Label>
                <Input
                  id="phone_number"
                  type="text"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => {
                    handleChange(e);
                    e.target.setCustomValidity("");
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    if (errors.phone_number) {
                      e.target.setCustomValidity(errors.phone_number);
                    } else {
                      e.target.setCustomValidity("");
                    }
                  }}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => {
                    handleChange(e);
                    e.target.setCustomValidity("");
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    if (errors.password) {
                      e.target.setCustomValidity(errors.password);
                    } else {
                      e.target.setCustomValidity("");
                    }
                  }}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="confirm_password">Confirm password</Label>
                </div>
                <Input
                  id="confirm_password"
                  type="password"
                  required
                  onChange={(e) => {
                    handleChange(e);
                    e.target.setCustomValidity("");
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    if (errors.confirm_password) {
                      e.target.setCustomValidity(errors.confirm_password);
                    } else {
                      e.target.setCustomValidity("");
                    }
                  }}
                />
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
            <div className="text-center text-sm">
              You have an account?{" "}
              <a href="/admin-sign-in" className="underline underline-offset-4">
                Sign in
              </a>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}
