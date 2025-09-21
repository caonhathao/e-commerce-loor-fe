import logo from "../../assets/img/loli.png";
import "../../assets/css/components/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { BsBasket, BsPerson } from "react-icons/bs";
import SearchingBar from "./SearchingBar.tsx";
import { getAccessToken } from "../../services/tokenStore.tsx";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={"w-full h-full flex justify-start items-start"}>
      <div
        className={"w-full h-full flex justify-between flex-col items-start"}
      >
        {/* Navigation */}
        <div className={"w-full bg-[rgb(var(--secondary-background))]/10"}>
          <ul
            className={
              "p-2 flex flex-row flex-wrap justify-between items-center text-[rgb(var(--text-color))] text-sm"
            }
          >
            <li>
              <Link to={"/feedback"}>FEEDBACK</Link>
            </li>
            <li>
              <Link to={"/app"}>SAVE MORE ON APP</Link>
            </li>
            <li>
              <Link to={"/sell-on-loli"}>SELL ON LOLI</Link>
            </li>
            <li>
              <Link to={"/customer-care"}>CUSTOMER CARE</Link>
            </li>
            <li>
              <Link to={"/track-my-order"}>TRACK MY ORDER</Link>
            </li>
            <li>
              {getAccessToken() !== "" ? (
                <Link to={"/user"}>ACCOUNT</Link>
              ) : (
                <Link to={"/account"}>ACCOUNT</Link>
              )}
            </li>
            <li>
              <Link to={"/get-voucher"}>GET MORE VOUCHERS</Link>
            </li>
          </ul>
        </div>

        {/* Logo và Tiêu đề */}
        <div
          className={
            "w-full flex flex-col sm:flex-row justify-between items-center bg-[rgb(var(--bg-color))]"
          }
        >
          <div
            className={"w-fit flex flex-row justify-start items-center gap-2"}
          >
            <div className="w-[30%] p-3 rounded-full flex justify-center items-center">
              <img src={logo} alt="logo" className="w-[50%]" />
            </div>
            <div className="w-fit">
              <p className="text-center font-bold text-[rgb(var(--main-color))] text-xl tracking-wide">
                <Link to={"/"}>LOLI SHOPPING</Link>
              </p>
            </div>
          </div>

          {/* Search & Icons */}
          <div
            className={
              "flex flex-row justify-around items-center w-fit p-3 gap-4"
            }
          >
            <SearchingBar
              minLength={10}
              errorText="Từ khóa không hợp lệ"
              placeholderText={"Tìm kiếm gì đây nào..."}
            />

            <div className={"w-[10%] text-center mr-2"}>
              <Tooltip title={"Cart"}>
                <button
                  type="button"
                  className="text-[rgb(var(--main-color))] border-2 border-[rgb(var(--border-color))] p-2 rounded-full"
                  onClick={() => {
                    navigate("/user/show-cart");
                  }}
                >
                  <BsBasket size={25} />
                </button>
              </Tooltip>
            </div>

            <div className={"w-[10%] text-center ml-2"}>
              <button
                className="text-[rgb(var(--main-color))] border-2 border-[rgb(var(--border-color))] p-2 rounded-full"
                onClick={() => {
                  navigate("/user");
                }}
              >
                <BsPerson size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
