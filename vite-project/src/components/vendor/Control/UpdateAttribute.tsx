import React, {useEffect, useState} from "react";
import {BsEraserFill, BsPlusCircle, BsXCircle} from "react-icons/bs";
import attJSON from "../../../utils/attributes.tsx";
import {toast, ToastContainer} from "react-toastify";
import apiClient from "../../../services/apiClient.tsx";
import endpoints from "../../../services/endpoints.tsx";
import {useParams} from "react-router-dom";

type Props = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateAttribute = ({setOpen}: Props) => {
    const [attributes, setAttributes] = useState<{ [key: string]: string }>({})
    const [category, setCategory] = useState('');
    const [isAdded, setIsAdded] = useState<boolean>(false)
    const [attKey, setAttKey] = useState<string>('')
    const [attValue, setAttValue] = useState<string>('')

    const params = useParams();

    const handleAddAttributes = (key: string, value: string) => {
        if (key === '') {
            toast.warning('Chưa chọn thuộc tính sản phẩm!')
            return;
        }
        if (value === '') {
            toast.warning('Thuộc tính không được để trống!')
            return;
        }
        setAttributes({...attributes, [key]: value})

    }

    const handleRemoveAttributesByValue = (valueToRemove: string) => {
        const filtered = Object.fromEntries(
            Object.entries(attributes).filter(([_, value]) => value !== valueToRemove)
        );
        setAttributes(filtered);
        setAttValue('')
        setAttKey('')
    };


    const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value !== 'unknow') {
            setCategory(e.target.value)
        } else {
            setCategory('')
        }
    }

    const handleSelectAttribute = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value !== 'unknow') {
            setAttKey(e.target.value);
            setAttValue('')
        } else {
            setAttKey('')
            setAttValue('')
        }
    }

    const handleAddAttributeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAttValue(e.target.value)
    }

    const handleSubmit = async (values: object) => {
        try {
            const response = await apiClient.post(endpoints.brand.updateAttribute(params.id), values);
            if (response.status === 200 || response.status === 201) {
                toast.success('Cập nhật thuộc tính thành công', {autoClose: 1500})
                setTimeout(() => {
                    window.location.reload()
                }, 1200)
            } else {
                toast.error(response.data.message)
            }
        } catch (e) {
            console.log('Failed to update attribute', e)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        console.log('attKye: ', attKey)
        console.log('attValue: ', attValue)
        console.log(attributes)
    }, [attributes]);

    return (
        <div className={'w-full h-fit absolute top-0 left-0 z-20 flex flex-col justify-center items-center'}>
            <div
                className={'w-full h-full bg-white shadow-lg shadow-amber-400 rounded-lg p-2 border-[1px] border-[var(--text-color)]'}>
                <div
                    className={'absolute -top-1 -right-1 bg-gradient-to-b from-indigo-500 from-20% via-purple-500 to-pink-500 p-1 rounded-lg cursor-pointer'}>
                    <BsXCircle size={30} color={'white'} onClick={() => handleClose()}/>
                </div>
                <div className={'w-full h-full flex flex-col justify-between items-center'}>
                    <div>
                        <div className={'w-full flex flex-col justify-center items-center '}>
                            <p className={'text-center font-bold text-[var(--text-color)] p-2 m-2 border-b-2 border-[var(--text-color)]'}>BẢNG
                                THUỘC TÍNH</p>
                        </div>
                        <div className={'w-full h-full '}>
                            <div
                                className={'w-full border-2 border-[var(--text-color)] rounded-2xl p-2 flex flex-row justify-around items-center gap-2'}>
                                <p className={'w-[30%] font-bold'}>Danh mục</p>
                                <select
                                    className={'w-[60%] h-full flex flex-col justify-start items-center border-2 border-gray-500 rounded-lg p-1'}
                                    onChange={(e) => handleSelectCategory(e)}>
                                    <option key={0} value={'unknow'}>---</option>
                                    {
                                        Object.entries(attJSON).map(([key, value]) => (
                                            <option key={key} value={key}>{value.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className={'w-full p-2 flex justify-center items-center font-bold'}>
                                <p className={' border-b-2 border-[var(--text-color)] w-fit'}>
                                    Thuộc tính
                                </p>
                            </div>
                            {attributes && Object.entries(attributes).map(([key, value]) => (
                                <div
                                    className={'my-1 border-2 border-[var(--text-color)] rounded-2xl p-2 flex flex-row justify-around items-center gap-2'}>
                                    <input
                                        className={'w-[60%] h-full flex flex-col justify-start items-center border-2 border-gray-500 rounded-lg p-1'}
                                        value={key}
                                        disabled={true}
                                    />
                                    <input type={'text'} className={'w-[40%] border-2 border-gray-500 rounded-lg p-1'}
                                           value={value}
                                           disabled={true}/>
                                    <button type={'button'}
                                            className={'border-2 border-[var(--bg-color-btn-1)] rounded-lg p-1.5 font-bold'}
                                            onClick={() => handleRemoveAttributesByValue(value)}><BsEraserFill
                                        size={20}/>
                                    </button>
                                </div>
                            ))}
                            <p className={'w-full border-2 border-[var(--text-color)] rounded-full my-2'}></p>
                            {category && category ? (
                                <div
                                    className={'my-1 border-2 border-[var(--text-color)] rounded-2xl p-2 flex flex-row justify-around items-center gap-2'}>
                                    <select
                                        className={'w-[60%] h-full flex flex-col justify-start items-center border-2 border-gray-500 rounded-lg p-1'}
                                        onChange={(e) => handleSelectAttribute(e)}
                                    >
                                        <option key={0} value={'unknow'}>---</option>
                                        {
                                            Object.entries(attJSON[category].attributes).map(([key, value]) => (
                                                <option key={key} value={value}>{value}</option>
                                            ))
                                        }
                                    </select>
                                    <input type={'text'} className={'w-[40%] border-2 border-gray-500 rounded-lg p-1'}
                                           value={attValue}
                                           onChange={(e) => handleAddAttributeValue(e)}/>

                                    <button type={'button'}
                                            className={'border-2 border-[var(--bg-color-btn-1)] rounded-lg p-1.5 font-bold'}
                                            onClick={() => handleAddAttributes(attKey, attValue)}><BsPlusCircle
                                        size={20}/>
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className={'w-full flex flex-row justify-center items-center'}>
                        <button type={'submit'} onClick={() => handleSubmit(attributes)}>Xác nhận</button>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}
export default UpdateAttribute