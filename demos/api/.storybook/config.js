import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue as ReactThemes } from '@pxblue/react-themes';
import * as Colors from '@pxblue/colors';
import '@pxblue/react-themes/open-sans';
import { pxblueTheme } from '@pxblue/storybook-themes';
import { CssBaseline } from '@material-ui/core';

pxblueTheme.brandTitle = 'PX Blue React Native Component Library';
pxblueTheme.brandUrl = 'https://pxblue.github.io';
if (window.top.location.hostname === 'localhost') {
    pxblueTheme.brandImage = require('../assets/pxblue-react-native-alpha.svg');
} else if (window.top.location.pathname.slice(0, 18) === '/react-native-dev/') {
    pxblueTheme.brandImage = require('../assets/pxblue-react-native-beta.svg');
} else {
    pxblueTheme.brandImage = require('../assets/pxblue-react-native.svg');
}

addParameters({
    /* Users will see this while the component is loading. */
    notes: {
        markdown: '<div> </div>',
    },
    options: {
        theme: pxblueTheme,
        showRoots: true,
    },
});

export const appliedTheme = createMuiTheme(ReactThemes);

addDecorator((storyFn) => (
    <MuiThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <div className={'wrapper'} style={{ color: Colors.gray['800'] }}>
            {storyFn()}
        </div>
    </MuiThemeProvider>
));
