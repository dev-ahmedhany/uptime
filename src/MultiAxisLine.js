import React, { useState, useEffect } from 'react'
import { Chart } from 'react-charts'
import { Resizable } from "re-resizable";
import Slider from '@material-ui/core/Slider';
import Details from './components/Details'
import { CircularProgress, Typography } from '@material-ui/core';


const getAvgFunction = function (chunkSize, result, timeInterval, data) {
    let finalResult = JSON.parse(JSON.stringify(result))
    let newValue = [];
    let i, j, temparray, chunk = chunkSize;
    const list = Object.entries(data);

    for (i = 0, j = Object.keys(data).length; i < j; i += chunk) {
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
            if (data[timeStamp][j])
                finalResult[j].data.push({ primary: time, secondary: data[timeStamp][j] });
        }
    }

    return finalResult;
}


export default function Line() {
    // series array
    const [data, setData] = useState();
    const [isDataAvalible, setIsDataAvalible] = useState(false);
    const [dataSource, setDataSource] = useState();
    const [dataAvg, setDataAvg] = useState();
    const [info, setInfo] = useState([]);
    const [chunkSize, setChunkSize] = React.useState(10);
    console.log("rendered");

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://uptime.aswu.workers.dev/API')
            return res.ok && await res.json()
        }
        fetchData().then(res => {
            if (!res) return;

            setDataSource(res);

            const { result, timeInterval, data } = res;
            let finalResult = JSON.parse(JSON.stringify(result))
            let errorList = [];

            for (const timeStamp in data) {
                const time = Number(timeStamp) * timeInterval;
                for (let i = 0; i < result.length; i++) {

                    errorList.push({ name: result[i].label, Data: [] })

                    if (data[timeStamp][i]) {

                        finalResult[i].data.push({ primary: time, secondary: data[timeStamp][i] });

                        if (data[timeStamp][i] > 100000) {
                            errorList[i].Data.push({
                                time: (new Date(time)).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' }),
                                code: parseInt(Math.abs((100000 - Number(data[timeStamp][i])) * 1000))
                            })
                        }
                    }
                }
            }

            setData(finalResult);
            setInfo(errorList);

        });

    }, []);

    const handleChange = (event, newValue) => {
        setChunkSize(newValue);
    };

    useEffect(() => {
        if (!data) return;
        setIsDataAvalible(true);
        console.log("data ready", new Date());
    }, [data]);

    useEffect(() => {
        if (!dataSource) return;
        if (!getAvgFunction) return;
        const { result, timeInterval, data } = dataSource;
        setDataAvg(getAvgFunction(chunkSize, result, timeInterval, data));
    }, [chunkSize, dataSource]);

    const series = React.useMemo(() => ({ showPoints: false }), [])
    const axes = React.useMemo(() => [{ primary: true, type: 'time', position: 'bottom' },
    { type: 'linear', position: 'left' }], [])

    return (
        <>
            {isDataAvalible ?
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
                    <Typography>Error List</Typography>
                    <Details Data={info}></Details>
                </> :
                <>
                    <CircularProgress />
                </>
            }
        </>
    )
}