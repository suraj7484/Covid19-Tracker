import React from 'react'
import '../Table.css'
import numeral from "numeral"

const Table = ({countries}) => {
    return (
        <div className="table">
            {/* {console.log(countries)} */}
            {countries.map(country => (
                <tr>
                    <td>{country.country}</td>
                    <td>
                        <strong>{numeral(country.cases).format("0,0")}</strong>
                    </td>
                </tr>
            ))}
            
        </div>
    )
}

export default Table
