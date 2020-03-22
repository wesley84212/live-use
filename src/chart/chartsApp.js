import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import { Link } from 'react-router-dom';
import { LineMarkSeries, XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, Hint } from 'react-vis';
// import _ from 'lodash';

class ChartsApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null,
            testData: null
        };
    }
    async GetKhwData() {
        const request = new Request('http://localhost:3001/kHw/', {
            method: 'GET',
            headers: new Headers({
                'content-Type': 'application/json'
            })
        })
        const res = await fetch(request);
        if (res.status === 200) {
            return res.json();
        } else {
            throw res;
        }
    }
    async componentDidMount() {
        this.setState({ testData: await this.GetKhwData() });
    }
    _forgetValue = () => {
        this.setState({
            value: null
        });
    };

    _rememberValue = value => {
        console.log('value', value);
        this.setState({ value });
    };

    getData = (value) => {
        let result = []
        const dateFormat = require('dateformat');
        if (value) {
            let temp = JSON.parse(JSON.stringify(value));
            for (var i in value) {
                if (i === "0") {
                    value[i].value = 0
                }
                else {
                    let key = String(Number(i) - 1);
                    value[i].value = temp[i].value - temp[key].value
                }
                let date = value[i].create_date;
                value[i].create_date = dateFormat(date, "yyyy-mm-dd");
                result.push(value[i]);
            }
        }
        Object.keys(result).forEach(function (key) {
            result[key].x = result[key].create_date;
            result[key].y = result[key].value;
            delete result[key].value;
            delete result[key].create_date;
        });
        return result;
    }
    async GetKhwDataByMonth(month) {
        const request = new Request('http://localhost:3001/kHw/' + month, {
            method: 'GET',
            headers: new Headers({
                'content-Type': 'application/json'
            })
        });
        const res = await fetch(request);
        if (res.status === 200) {
            return res.json();
        } else {
            throw res;
        }
    }

    setKhwTotal(data) {
        let total = null;
        data.map((data) => {
            total += data.y;
        })
        return total
    }

    render() {
        const { testData } = this.state;
        let newData = this.getData(testData);
        let total = this.setKhwTotal(newData);
        const { value } = this.state;
        return (
            <>
                <div>
                    <button onClick={async (e) => { this.setState({ testData: await this.GetKhwData() }) }}>總覽</button>
                    <button onClick={async (e) => { this.setState({ testData: await this.GetKhwDataByMonth(3) }) }}>3月</button>
                    <button onClick={async (e) => { this.setState({ testData: await this.GetKhwDataByMonth(4) }) }}>4月</button>
                    <button onClick={async (e) => { this.setState({ testData: await this.GetKhwDataByMonth(5) }) }}>5月</button>
                    <button onClick={async (e) => { this.setState({ testData: await this.GetKhwDataByMonth(6) }) }}>6月</button>
                </div>

                <XYPlot
                    width={1140}
                    height={440}
                    xType='ordinal'
                >
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <LineMarkSeries
                        lineStyle={{ stroke: '#e0e0e0' }}
                        markStyle={{ stroke: '#6dc6c1' }}
                        style={{ strokeWidth: '2px' }}
                        strokeStyle="solid"
                        data={newData}
                    />
                    {value ? <Hint value={value} /> : null}
                </XYPlot>
                <div><Link to="/FormTest" ><button>測試</button></Link></div>
                <span>電表總額:{total}</span>
            </>
        );
    }
}

export default ChartsApp;