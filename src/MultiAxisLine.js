import React, { useState, useEffect } from 'react'
//
import { Chart } from 'react-charts'
import { Resizable } from "re-resizable";
import Slider from '@material-ui/core/Slider';


const getAvgFunction = function (chunkSize, dataSource) {
    let { result, timeInterval, data } = JSON.parse(dataSource);
    let newValue = [];
    let i, j, temparray, chunk = chunkSize;
    const list = Object.entries(data);

    for (i = 0, j = Object.keys(data).length; i < j; i += chunk) {///// i= 1 !!! to ignore 00:00 result
        temparray = list.slice(i, i + chunk);
        // do whatever

        let averageDate = (Number(temparray[temparray.length - 1][0]) + Number(temparray[0][0])) / 2 + 0.5;
        averageDate = averageDate % 1 === 0.5 ? averageDate : averageDate + 0.5;
        averageDate = (chunk % 2 === 0) ? averageDate - 0.5 : averageDate;

        let averageArray = [];
        for (let k = 0; k < result.length; k++) {
            const average = temparray.reduce((prev, crnt) => prev + Number(crnt[1][k]), 0) / temparray.length;
            averageArray.push(average);
        }
        newValue[averageDate] = averageArray;
    }
    data = newValue;

    for (const timeStamp in data) {
        const time = Number(timeStamp) * timeInterval;
        for (let j = 0; j < result.length; j++) {
            result[j].data.push({ primary: time, secondary: data[timeStamp][j] });
        }
    }

    return result;
}


export default function Line() {

    // series array
    const [data, setData] = useState([{ "label": "Google", "data": [{ "primary": 1616913960000, "secondary": 63 }, { "primary": 1616914080000, "secondary": 51 }, { "primary": 1616914200000, "secondary": 54 }, { "primary": 1616914320000, "secondary": 53 },] }]);
    const [dataSource, setDataSource] = useState();
    const [dataAvg, setDataAvg] = useState([{ "label": "Google", "data": [{ "primary": 1616913960000, "secondary": 63 }, { "primary": 1616914080000, "secondary": 51 }, { "primary": 1616914200000, "secondary": 54 }, { "primary": 1616914320000, "secondary": 53 },] }]);
    const [info, setInfo] = useState();
    const [chunkSize, setChunkSize] = React.useState(10);


    
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/API')
            return res.ok && await res.json()
        }
        fetchData().then(res => {
            if(!res) return;
            
            setDataSource(JSON.parse(JSON.stringify(res)));

            let { result, timeInterval, data } = res;

            for (const timeStamp in data) {
                const time = Number(timeStamp) * timeInterval;
                for (let j = 0; j < result.length; j++) {
                    result[j].data.push({ primary: time, secondary: data[timeStamp][j] });
                }
            }

            setData(result);
            document.getElementById("resizable").style = `position: relative; user-select: auto;
                width: 91vw; height: 45vw; box-sizing: border-box; flex-shrink: 0;`;
            
        });

    }, []);

    useEffect(() => {
        let items = [];
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            for (let j = 0; j < element.data.length; j++) {
                const item = element.data[j];
                if (item.secondary > 100000) {
                    const date = new Date(item.primary);
                    items.push(<li key={j}>
                        {`${element.label}\t${date.toLocaleDateString("en-US")}
                        \t${date.toLocaleTimeString("en-US")}
                        \tError Code:${parseInt((100000 - Number(item.secondary)) * 1000)}`}
                        </li>)
                }
            }
        }
        setInfo(items);
    }, [data]);

    const handleChange = (event, newValue) => {
        setChunkSize(newValue);
    };

    useEffect(() => {
        if (!dataSource) return;
        if (!getAvgFunction) return;
        setDataAvg(getAvgFunction(chunkSize, JSON.stringify(dataSource)));
        document.getElementById("resizable2").style = "position: relative; user-select: auto; width: 91vw; height: 45vw; box-sizing: border-box; flex-shrink: 0;";
    }, [chunkSize, dataSource]);

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
            <p>Average</p>
            <Slider min={2} max={180} value={chunkSize} onChange={handleChange}
                style={{ width: "50vw" }} valueLabelDisplay="auto"
                marks={[{ value: 2, label: '4 minutes', }, { value: 90, label: '3 hours', },
                { value: 180, label: '6 hours', }]} aria-labelledby="continuous-slider" />
            <br />
            <Resizable id="resizable2" defaultSize={{ width: "90vw", height: "45vw", }}>
                <Chart data={dataAvg} series={series} axes={axes} tooltip dark />
            </Resizable>
            <br />

            {info}
        </>
    )
}