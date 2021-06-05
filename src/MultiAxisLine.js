import React, { useState, useEffect, useCallback } from 'react'
import { Chart } from 'react-charts'
import { Resizable } from "re-resizable";
import Slider from '@material-ui/core/Slider';
import Details from './components/Details'
import { CircularProgress, Typography } from '@material-ui/core';

export default function Line() {
    // series array
    const [isDataAvalible, setIsDataAvalible] = useState(false);
    const [dataSource, setDataSource] = useState();
    const [dataAvg, setDataAvg] = useState();
    const [info, setInfo] = useState([]);
    const [chunkSize, setChunkSize] = React.useState(15);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://uptime.aswu.workers.dev/API')
            return res.ok && await res.json()
        }
        fetchData().then(res => {
            if (!res) return;
            setDataSource(res);
        });
    }, []);

    const handleChange = (event, newValue) => {
        setChunkSize(newValue);
    };

    const getAvgFunction = useCallback((chunkSize, result, timeInterval, data) => {
        let finalResult = JSON.parse(JSON.stringify(result))
        let newValue = [];
        let i, j, temparray, chunk = chunkSize;
        const list = Object.entries(data);

        for (i = 0, j = Object.keys(data).length; i < j; i += chunk) {
            temparray = list.slice(i, i + chunk);
            // do whatever

            let averageDate = Number(temparray[0][0])
            if (chunkSize > 1) {
                averageDate = (Number(temparray[temparray.length - 1][0]) + Number(temparray[0][0])) / 2 + 0.5;
                averageDate = averageDate % 1 === 0.5 ? averageDate : averageDate + 0.5;
                averageDate = (chunk % 2 === 0) ? averageDate - 0.5 : averageDate;
            }
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
    }, []);

    useEffect(() => {
        if (!dataAvg) return;
        setIsDataAvalible(true);
    }, [dataAvg]);

    useEffect(() => {
        if (!dataSource) return;

        const { result, timeInterval, data } = dataSource;
        let errorList = [];

        for (const timeStamp in data) {
            const time = Number(timeStamp) * timeInterval;
            for (let i = 0; i < result.length; i++) {
                // old code 100000 here
                if (data[timeStamp][i] && data[timeStamp][i] > 30000) {
                    errorList.push({
                        name: result[i].label,
                        time: (new Date(time)).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' }),
                        code: Math.ceil(Math.abs(((Number(data[timeStamp][i]) > 100000 ? 100000 : 30000) - Number(data[timeStamp][i])) * 1000))
                    })
                }
            }
        }

        setInfo(errorList);

    }, [dataSource]);

    useEffect(() => {
        if (!dataSource) return;
        const { result, timeInterval, data } = dataSource;
        setDataAvg(getAvgFunction(chunkSize, result, timeInterval, data));
    }, [chunkSize, dataSource, getAvgFunction]);

    const series = React.useMemo(() => ({ showPoints: false }), [])
    const axes = React.useMemo(() => [{ primary: true, type: 'time', position: 'bottom' },
    { type: 'linear', position: 'left' }], [])

    return (
        <>
            {isDataAvalible ?
                <>
                    <br />
                    <p>Average</p>
                    <Slider min={1} max={180} value={chunkSize} onChange={handleChange}
                        style={{ width: "50vw" }} valueLabelDisplay="auto"
                        marks={[{ value: 2, label: '2 minutes', }, { value: 90, label: '3 hours', },
                        { value: 180, label: '6 hours', }]} aria-labelledby="continuous-slider" />
                    <br />
                    <Resizable defaultSize={{ width: "90vw", height: "45vw", }}>
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