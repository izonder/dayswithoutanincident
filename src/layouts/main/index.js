import './style.scss';

import React from 'react';

import Display from 'components/display';
import Button from 'components/button';

/**
 * Main page layout
 * @returns {xml}
 */

export default function MainLayout() {
    return (
        <div className="container">
            <h1 className="container__title">Days without an incident</h1>
            <Display/>
            <Button/>
        </div>
    );
}
