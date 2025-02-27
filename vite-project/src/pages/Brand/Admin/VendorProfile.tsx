import {useEffect, useState} from "react";
import JWTDecode from "../../../security/JWTDecode.tsx";
import axios from "axios";
import {toast} from "react-toastify";
import Loading from "../../../components/loading/Loading.tsx";
import {useFormik} from "formik";
import * as Yup from "yup";

interface vendorData {
    id?: string;
    name?: string;
    email?: string;
    numberphone?: string;
    address?: string;
    is_locked?: boolean;
}

const VendorProfile = () => {
    const [data, setData] = useState<vendorData>({});
    const [isEdit, setIsEdit] = useState(false);
    const [effect, setEffect] = useState([false])

    const handleEdit = (index: number) => {
        setIsEdit(!isEdit);
        setEffect((prev) => {
            const temp = [...prev]
            temp[index] = !temp[index]
            return temp
        })
    }


    const handleResetFields = () => {
        setIsEdit(false);
        //formData.resetForm(); delete all data was shown in input field:(

        formData.setValues({
            id: data["id"] || '',
            name: data["name"] || '',
            email: data["email"] || '',
            numberphone: data["numberphone"] || '',
            address: data["address"] || '',
            is_locked: data["is_locked"] || false
        });

        setEffect(() => {
            return [false]
        })
    }

    const formData = useFormik({
        initialValues: {
            id: '',
            name: '',
            email: '',
            numberphone: '',
            address: '',
            is_locked: false
        },
        onSubmit: async (values) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const ID = JWTDecode(sessionStorage.getItem("userToken")).id;
            const url = import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT + import.meta.env.VITE_API_U_BRAND + ID;
            const response = await axios.put(url, values, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('userToken')}`
                }
            });
            if (response.status === 200) {
                toast.success('Cập nhật thành công. Vui lòng đăng nhập lại để thấy sự thay đổi', {autoClose: 2000});
            } else toast.error('Update failed! Please try again');
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().required('Email is required'),
            numberphone: Yup.string().required('Number is required'),
            address: Yup.string().required('Address is required'),
        })
    })

    useEffect(() => {
        const fetch = async () => {
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const id = JWTDecode(sessionStorage.getItem("userToken")).id;
                const api = import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT + import.meta.env.VITE_API_I_BRAND + id;

                const response = await axios.get(api, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
                    }
                });

                if (response) {
                    toast.success('Loading data successfully.', {autoClose: 1500, position: "bottom-right"});
                    setTimeout(() => {
                        setData(response.data);
                    }, 1600);
                }
            } catch (e: any) {
                console.error(e.message);
            }
        }
        fetch()
    }, []);

    useEffect(() => {
        if (data) {
            formData.setValues({
                id: data["id"] || '',
                name: data["name"] || '',
                email: data["email"] || '',
                numberphone: data["numberphone"] || '',
                address: data["address"] || '',
                is_locked: data["is_locked"] || false
            });
        }
    }, [data]);

    if (JSON.stringify(data) === '{}') return <Loading/>;

    return (
        <div className={'w-96 h-screen flex flex-col justify-start items-center ml-9'}>
            <div className={'w-fit h-fit grid grid-cols-2 grid-rows-2 gap-4 text-black nb-2'}>
                <button
                    className={`border border-gray-600 rounded-4xl text-center p-1 ${effect[0] ? ` border-indigo-500 bg-indigo-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 text-white` : `bg-white text-black`}`}
                    onClick={() => handleEdit(0)}>Chỉnh sửa
                </button>
                <button className={'border border-gray-600 rounded-4xl text-center p-1'}>Hỗ trợ</button>
                <button className={' col-span-2 border border-gray-600 rounded-4xl text-center p-1'}>Đổi mật khẩu
                </button>
            </div>
            <div className={'w-full h-fit flex flex-col justify-center items-center'}>
                <h3 className={'font-bold text-lg w-fit m-2 text-yellow-600'}>Thông tin cửa hàng</h3>
                <form className={'w-70'} onSubmit={(e) => {
                    e.preventDefault();
                    formData.handleSubmit(e);
                }}>
                    <fieldset
                        className={'w-full border border-gray-700 rounded-lg p-0 m-2 flex flex-col items-center justify-around'}>
                        <legend>ID</legend>
                        <input className={'p-2 w-full'} type={'text'} name={'id'} disabled={true} value={data["id"]}/>
                    </fieldset>

                    <fieldset
                        className={'w-full border border-gray-700 rounded-lg p-0 m-2 flex flex-col items-center justify-around'}>
                        <legend>Tên cửa hàng</legend>
                        <input className={'p-2 w-full'} type={'text'} name={'name'} disabled={!isEdit}
                               value={formData.values.name}
                               onChange={formData.handleChange}/>
                    </fieldset>
                    <fieldset
                        className={'w-full border border-gray-700 rounded-lg p-0 m-2 flex flex-col items-center justify-around'}>
                        <legend>Email</legend>
                        <input className={'p-2 w-full'} type={'text'} name={'email'} disabled={!isEdit}
                               value={formData.values.email}
                               onChange={formData.handleChange}/>
                    </fieldset>
                    <fieldset
                        className={'w-full border border-gray-700 rounded-lg p-0 m-2 flex flex-col items-center justify-around'}>
                        <legend>Địa chỉ</legend>
                        <textarea className={'p-2 w-full'} name={'address'} disabled={!isEdit}
                                  value={formData.values.address} onChange={formData.handleChange}></textarea>
                    </fieldset>
                    <fieldset
                        className={'w-full border border-gray-700 rounded-lg p-2 m-2 flex flex-col items-center justify-around'}>
                        <legend>Tình trạng</legend>
                        <div className={' w-full flex flex-row justify-around items-center'}>
                            Bị khóa
                            <input type={'checkbox'} name={'email'} disabled={!isEdit}
                                   checked={formData.values.is_locked}/>
                        </div>
                    </fieldset>
                    <div className={'w-full flex flex-row items-center justify-around'}>
                        <button type={'button'}
                                className={`border border-gray-600 rounded-4xl text-center py-1 px-3`}
                                onClick={handleResetFields} disabled={!isEdit}>Hủy
                        </button>
                        <button type={'submit'}
                                disabled={!isEdit}
                                className={`border border-gray-600 rounded-4xl text-center py-1 px-3`}>Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default VendorProfile