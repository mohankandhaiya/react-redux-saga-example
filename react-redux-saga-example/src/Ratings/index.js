import React from 'react'
import { Rate } from 'antd';

function Ratings() {
    return (
        <div className="center rate-container">
            <Rate />
            <p>(2 Ratings)</p>
            <p>Click the above star to rate it.</p>
        </div>
    )
}

export default Ratings