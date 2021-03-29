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
            const element = data[i];
            for (let j = 0; j < element.data.length; j++) {
                const item = element.data[j];
                if (item.secondary < 1) {
                    const date = new Date(item.primary);
                    items.push(<li key={j}>{`${element.label}\t${date.toLocaleDateString("en-US")}\t${date.toLocaleTimeString("en-US")}\tError Code:${Number(item.secondary) * 1000}`}</li>)
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
            <ResizableBox width={800} height={400}>
                <Chart data={data} series={series} axes={axes} tooltip dark />
            </ResizableBox>
            {info}
        </>
    )
}