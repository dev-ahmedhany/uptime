import React, { useState, useEffect } from 'react'
//
import { Chart } from 'react-charts'
import ResizableBox from "./ResizableBox";

export default function Line() {
    // series array
    const [data, setData] = useState([{ "label": "Google", "data": [{ "primary": 1616913960000, "secondary": 63 }, { "primary": 1616914080000, "secondary": 51 }, { "primary": 1616914200000, "secondary": 54 }, { "primary": 1616914320000, "secondary": 53 },] }]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("/API");
            res.json().then(res => setData(res));
        }

        fetchData();
    }, []);


    const series = React.useMemo(
        () => ({
            showPoints: false
        }),
        []
    )
    const axes = React.useMemo(
        () => [
            { primary: true, type: 'time', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )
    return (
        <ResizableBox>
            <Chart data={data} series={series} axes={axes} tooltip dark />
        </ResizableBox>
    )
}