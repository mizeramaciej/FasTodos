import React, { Component } from 'react';

export default class Calendar extends Component {
    render = () => {
        return (
            <div className='calendar'>
            {this.props.toggle}
            </div>
        );
    }
}