import React from "react";

interface AmountInputProps {
    index: number;
    amount: number[];
    setAmount: React.Dispatch<React.SetStateAction<number[]>>;
}

const AmountInput: React.FC<AmountInputProps> = ({amount, index, setAmount}) => {

    const handleIncease = () => {
        setAmount((prev) => {
            const newAmount = [...prev]
            newAmount[index] = newAmount[index] + 1
            return newAmount
        })
    }

    const handleDecrease = () => {
        if (amount[index] > 1)
            setAmount((prev) => {
                const newAmount = [...prev]
                newAmount[index] = newAmount[index] - 1
                return newAmount
            })
    }

    return (
        <div className={'w-fit h-fit flex flex-row jus-center items-center gap-2'}>
            <button type={'button'}
                    className={'w-10 h-10 border-2 border-[rgb(var(--main-color))] rounded-lg font-bold text-lg'}
                    onClick={handleDecrease}>
                -
            </button>
            <input type={'number'}
                   className={'w-10 h-10 text-center border-2 border-[rgb(var(--border-color))] rounded-lg'}
                   value={amount[index]}
                   readOnly={true}/>
            <button type={'button'}
                    className={'w-10 h-10 border-2 border-[rgb(var(--main-color))] rounded-lg font-bold text-lg'}
                    onClick={handleIncease}>
                +
            </button>
        </div>
    )
}
export default AmountInput