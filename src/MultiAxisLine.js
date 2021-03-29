import React, { useState, useEffect } from 'react'
//
import { Chart } from 'react-charts'
import { Resizable } from "re-resizable";

export default function Line() {
    // series array
    const [data, setData] = useState([{ "label": "Google", "data": [{ "primary": 1616913960000, "secondary": 63 }, { "primary": 1616914080000, "secondary": 51 }, { "primary": 1616914200000, "secondary": 54 }, { "primary": 1616914320000, "secondary": 53 },] }]);
    const [dataAvg, setDataAvg] = useState([{ "label": "Google", "data": [{ "primary": 1616913960000, "secondary": 63 }, { "primary": 1616914080000, "secondary": 51 }, { "primary": 1616914200000, "secondary": 54 }, { "primary": 1616914320000, "secondary": 53 },] }]);
    const [info, setInfo] = useState();

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("/API");
            if (res.ok) {
                res.json().then(res => {
                    let { result, timeInterval, data } = res;
                    let Scheme = JSON.stringify(result);

                    for (const timeStamp in data) {
                        const time = Number(timeStamp) * timeInterval;
                        for (let j = 0; j < result.length; j++) {
                            result[j].data.push({ primary: time, secondary: data[timeStamp][j] });
                        }
                    }

                    setData(result);
                    document.getElementById("resizable").style = "position: relative; user-select: auto; width: 91vw; height: 45vw; box-sizing: border-box; flex-shrink: 0;";

                    result = JSON.parse(Scheme);
                    let newValue = [];
                    let i, j, temparray, chunk = 5;
                    for (i = 0, j = Object.keys(data).length; i < j; i += chunk) {///// i= 1 !!! to ignore 00:00 result
                        temparray = Object.entries(data).slice(i, i + chunk);
                        // do whatever
                        const averageDate = (Number(temparray[temparray.length - 1].k) + Number(temparray[0].k)) / 2 + 0.5;
                        let averageArray = [];
                        for (let k = 0; k < result.length; k++) {
                            const average = temparray.reduce((prev, crnt) => prev + Number(crnt.v[k]), 0) / temparray.length;
                            averageArray.push(average);
                        }
                        newValue.push({ k: averageDate, v: averageArray });
                    }

                    data = newValue;

                    for (const timeStamp in data) {
                        const time = Number(timeStamp) * timeInterval;
                        for (let j = 0; j < result.length; j++) {
                            result[j].data.push({ primary: time, secondary: data[timeStamp][j] });
                        }
                    }
                    setDataAvg(result);
                    document.getElementById("resizable2").style = "position: relative; user-select: auto; width: 91vw; height: 45vw; box-sizing: border-box; flex-shrink: 0;";
                });
            }
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
            <Resizable id="resizable" defaultSize={{ width: "90vw", height: "45vw", }}>
                <Chart data={data} series={series} axes={axes} tooltip dark />
            </Resizable>
            <br />
            <h2>Average</h2>
            <br />
            <Resizable id="resizable2" defaultSize={{ width: "90vw", height: "45vw", }}>
                <Chart data={dataAvg} series={series} axes={axes} tooltip dark />
            </Resizable>
            {info}
        </>
    )
}