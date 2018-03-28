import './style.scss';

import React from 'react';
import classNames from 'classnames';
import moment from 'moment';

export default class Button extends React.Component {
    state = {
        date: localStorage.getItem('date') ? moment.utc(localStorage.getItem('date')) : null
    };

    handleClick = () => {
        const date = moment.utc();

        localStorage.setItem('date', date.format());
        this.setState({date});
    };

    render() {
        const name = classNames('button', {'button--active': !!this.state.date}),
            text = this.state.date ? 'Reset counter' : 'Start counter';

        return (
            <button className={name} onClick={this.handleClick}>{text}</button>
        );
    }
}
