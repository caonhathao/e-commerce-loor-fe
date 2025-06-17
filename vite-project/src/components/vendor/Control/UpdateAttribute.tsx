import {useState} from "react";

const UpdateAttribute = () => {
    const [attributes, setAttributes] = useState<{ [key: string]: string }>({})
    const [isAdded, setIsAdded] = useState<boolean>(false)
    const [attName, setAttName] = useState<string>('')
    const [attValue, setAttValue] = useState<string>('')

    const handleAddAttributes = (key: string, value: string) => {
        setAttributes({...attributes, [key]: value})
    }

    const handleRemoveAttributes = (keyAtt: string) => {
        const filtered = Object.fromEntries(
            Object.entries(attributes).filter(([key]) => key !== keyAtt)
        );
        setAttributes(filtered);
    }

    const handleSubmit = (values: Object) => {
    }

    return (
        <div className={'w-full h-full absolute top-0 left-0 z-20 flex flex-row justify-center items-center'}>
            <div className={'w-full bg-white shadow-lg shadow-amber-400 rounded-lg p-2'}>
                <div
                    className={'border-2 border-[var(--text-color)] rounded-2xl p-2 flex flex-row justify-around items-center gap-2'}>
                    <select
                        className={'w-[40%] h-full flex flex-col justify-start items-center border-2 border-gray-500 rounded-lg p-1'}>
                        <option>Chất liệu</option>
                        <option>Màu sắc</option>
                        <option>Xuât xứ</option>
                        <option>Kích thước</option>
                    </select>
                    <input type={'text'} className={'w-[40%] border-2 border-gray-500 rounded-lg p-1'}/>
                    <button type={'button'} onClick={() => handleAddAttributes('', '')}>Add</button>
                </div>
            </div>
        </div>
    )
}
export default UpdateAttribute