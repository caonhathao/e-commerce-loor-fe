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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { login } = useAuth();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        try {
          const response = await apiClient.post(
            endpoints.auth.userLogin,
            values
          );
          if (response.status === 200) {
            const { access, data } = response.data;
            login(access, data);
            toast.success("Đăng nhập thành công", { autoClose: 1500 });
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
        password: Yup.string()
          .min(6, "Tối thiểu 6 kí tự")
          .required("Thiếu mật khẩu"),
      })}
      validateOnBlur={true}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
      }) => {
        return (
          <form
            className={cn("flex flex-col gap-6", className)}
            {...props}
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Login to your account</h1>
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
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
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/admin-sign-up" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}
