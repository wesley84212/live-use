import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class FromTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            date: ''
        };
        this.valueChange = this.valueChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.dataSubmit = this.dataSubmit.bind(this);
    }
    async createKhwData(input) {
        const request = new Request('http://localhost:3001/kHw/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: input })
        })
        const res = await fetch(request);
        if (res.status === 200) {
            return res.json();
        } else {
            throw res;
        }
    }
    valueChange(event) {
        this.setState({ value: Number(event.target.value) });
    }

    dateChange(event) {
        this.setState({ date: event.target.value });
    }

    dataSubmit(event) {
        let input = [];
        input.push(this.state.value);
        input.push(this.state.date);
        this.createKhwData(input);
        alert("今日電表紀錄完成")
    }

    render() {
        return (
            <form onSubmit={this.dataSubmit}>
                <label>
                    電錶度數:
              <input type="text" value={this.state.value} onChange={this.valueChange} />
                </label>
                <label>今日日期: </label>
                <input type="date" date={this.state.date} onChange={this.dateChange} />
                <input type="submit" value="Submit" />
            </form>

        );
    }
}
export default FromTest;
