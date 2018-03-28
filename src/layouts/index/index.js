import 'assets/scss/common.scss';

import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';

import MainLayout from 'layouts/main';

/**
 * Default layout (entry point)
 * @returns {xml}
 */
export default function IndexLayout() {
    return (
        <Switch>
            <Route component={MainLayout} />
        </Switch>
    );
}

IndexLayout.propTypes = {
    location: PropTypes.object.isRequired
};
