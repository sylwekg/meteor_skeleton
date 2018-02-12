import React from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blueGrey, red } from 'material-ui/colors';
import MainAppBar from './MainAppBar';
import ResponsiveDrawer from './ResponsiveDrawer';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
      primary: blueGrey,
      accent: red,
      type: 'light',
    },
  });

export const MainLayout = ({content}) => (
    <MuiThemeProvider theme={theme}>
        <div>
            <header>
                {/* <MainAppBar /> */}
                {/* <nav>
                    <a href="/"> Resolutions </a>
                    <a href="/about"> About </a>

                </nav> */}
                <ResponsiveDrawer content = {content} />
            </header>
            <main>
                
                
            </main>
            <footer>
                
            </footer>
        </div>
    </MuiThemeProvider>
)



