export const formatedNumber = (s: number | undefined) => {
    if (s === undefined) return '';
    return s.toLocaleString('vi-VN');
}

export const formateDate=(s:string|undefined)=>{
    if(s===undefined) return '';
    return new Date(s).toLocaleDateString('vi-VN');
}