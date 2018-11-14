import React from 'react';

export default function Cond({ when, children }) {
    if (when) {
        return (
            <>
                {...children}
            </>
        );
    } else {
        return (
            <>
            </>
        );
    }
}