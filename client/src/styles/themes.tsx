import {createTheme} from "@mui/material/styles";


declare module '@mui/material/styles' {
    interface Palette {
        blueColor: Palette['primary'];
        grayColor: Palette['primary'];
    }

    interface PaletteOptions {
        blueColor?: PaletteOptions['primary'];
        grayColor?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        blueColor: true;
        grayColor: true;
    }
}

export const theme = createTheme({
    palette: {
        blueColor: {
            main: '#0079BF',
            contrastText: '#fff',
        },

        grayColor: {
            main: '#091e420a',
            contrastText: '#848c9b',
        },
    },
});