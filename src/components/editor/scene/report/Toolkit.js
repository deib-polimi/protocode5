import React from 'react';

export const TextId=({children}) => {
    return (<span className="text-primary font-weight-bold">{children}</span>);
}
export const TextOk=({children}) => {
    return (<span className="text-success font-weight-bold">{children}</span>);
}
export const TextWarn=({children}) => {
    return (<span className="text-warning font-weight-bold">{children}</span>);
}
export const TextError=({children}) => {
    return (<span className="text-danger font-weight-bold">{children}</span>);
}
export const DottedLine=() => {
    return (<hr style={{borderTtop: 'dotted 1px'}} />);
}
export const Indent=({children}) => {
    return <div className="pl-3 mb-2 mt-2">{children}</div>
}
export const TextInfo=({children}) => {
    return <span className="text-info font-weight-bold">{children}</span>
}