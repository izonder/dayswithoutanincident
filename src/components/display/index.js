/* eslint-disable no-magic-numbers, max-len */
import './style.scss';

import React from 'react';
import moment from 'moment';

const INTERVAL = 1000;

export default class Display extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            duration: this.calcDuration()
        };

        setInterval(this.handleTick, INTERVAL);
    }

    handleTick = () => {
        this.setState({duration: this.calcDuration()});
    };

    calcDuration = () => {
        const date = localStorage.getItem('date') ? moment.utc(localStorage.getItem('date')) : null;

        if (date) {
            const now = moment.utc();

            return now.diff(date);
        }
        return 0;
    };

    formatDuration = () => {
        const MAX_DAYS = 99,
            FULL_SCOREBOARD = '8888',
            {duration} = this.state,
            wrappedDuration = moment.duration(duration),
            hours = Math.floor(wrappedDuration.hours()),
            days = Math.floor(wrappedDuration.asDays());

        if (days > MAX_DAYS) return FULL_SCOREBOARD;

        return [
            days.toString().padStart(2, '0'),
            hours.toString().padStart(2, '0')
        ].join('');
    };

    computeStyle = (value, offsetX, offsetY) => {
        return {
            backgroundPosition: `-${value * offsetX}px -${offsetY}px`
        };
    };

    renderLed = () => {
        const duration = this.formatDuration();

        return [
            <div key="day1" className="display__digit-large display__digit-large--1" style={this.computeStyle(duration[0], 70, 0)} />,
            <div key="day2" className="display__digit-large display__digit-large--2" style={this.computeStyle(duration[1], 70, 0)} />,
            <div key="days" className="display__days" />,
            <div key="blink" className="display__blink" />,
            <div key="hour1" className="display__digit-small display__digit-small--1" style={this.computeStyle(duration[2], 35, 150)} />,
            <div key="hour2" className="display__digit-small display__digit-small--2" style={this.computeStyle(duration[3], 35, 150)} />,
            <div key="hours" className="display__hours" />
        ];
    };

    render() {
        const {duration} = this.state;

        return (
            <div className="display">
                <div className="display__led">
                    {duration ? this.renderLed() : ''}
                </div>
                <div className="display__shine" />
            </div>
        );
    }
}
