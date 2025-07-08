import {BsSearch} from "react-icons/bs";
import React from "react";

interface Props {
    placeholderText?: string
}

const SearchingBar: React.FC<Props> = (
    {placeholderText}
) => {
    return <div className={'w-[80%]'}>
        <form
            className='w-full flex justify-around items-center border-2 border-[rgb(var(--main-color))] rounded-full p-2 bg-[rgb(var(--background))]'>
            <fieldset className='w-[80%]'>
                <input
                    className='outline-0 w-full text-[rgb(var(--text-color))] bg-transparent'
                    type='text'
                    name='keyword'
                    placeholder={placeholderText ?? 'Type anything'}
                />
            </fieldset>
            <button className='w-[10%]' type="submit">
                <BsSearch size={20} color={'rgb(var(--main-color)'}/>
            </button>
        </form>
    </div>;
};
export default SearchingBar;