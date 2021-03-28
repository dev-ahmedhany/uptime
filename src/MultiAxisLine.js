import React, { useState, useEffect } from 'react'
//
import { Chart } from 'react-charts'
import ResizableBox from "./ResizableBox";

export default function Line() {
    // series array
    const [data, setData] = useState([{ "label": "Google", "data": [{ "primary": 1616913960000, "secondary": 63 }, { "primary": 1616914080000, "secondary": 51 }, { "primary": 1616914200000, "secondary": 54 }, { "primary": 1616914320000, "secondary": 53 },] }]);
    const [info, setInfo] = useState();

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("/API");
            res.json().then(res => setData(res));
        }
        fetchData();
    }, []);

    useEffect(() => {
        let items = [];
        for (let i = 0; i < data.length; i++) {
            const element = data[i].data;
            for (let j = 0; j < element.length; j++) {
                const item = element[j];
                if (item.secondary < 1) {
                    items.push(<li key={j}>{element.label + Number(item.secondary) * 1000}</li>)
                }
            }
        }
        setInfo(items);
    }, [data]);

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
        <>
            <ResizableBox>
                <Chart data={data} series={series} axes={axes} tooltip dark />
            </ResizableBox>
            {info}
        </>
    )
}