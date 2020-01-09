import React from 'react';

const Input = ({
    onSubmit,
    name,
    value,
    onChange,
    }) => (
    <form onSubmit={onSubmit}>
        <label>
            <input
                name={name}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </label>
        <input type='submit' value='Send' />
    </form>
)

export default Input