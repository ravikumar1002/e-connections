import { createTheme, ThemeOptions } from '@mui/material';


declare module '@mui/material/styles/createMixins' {
    interface Mixins {
        drawerWidth: {
            expanded: {
                xs: number,
                sm: number,
            }
            collapsed: {
                xs: number,
                sm: number,
            }
        };
        appBar: {
            height: number,
        }
    }
}

const appTheme: ThemeOptions = createTheme({
    // palette: {
    //     mode,
    // },
    components: {
        MuiTextField: {
            defaultProps: {
                size: 'small',
            },
            styleOverrides: {
                root: {
                    '& .MuiInputBase-inputSizeSmall': {
                        fontSize: '14px',
                        '& ::placeholder': {
                            fontSize: '10px',
                        },
                    },
                },
            },
        },
        MuiButton: {
            defaultProps: {
                size: 'small',
                variant: 'contained',
                sx: {
                    textTransform: 'capitalize',
                },
            },
        },
        MuiGrid: {
            defaultProps: {
                spacing: 2,
            },
        },
        MuiGrid2: {
            defaultProps: {
                spacing: 1,
            },
        },
        MuiTypography: {
            defaultProps: {
                variant: 'body2',
            },
        },
        MuiTooltip: {
            defaultProps: {
                arrow: true,
                placement: 'top',
            },
        },
    },
    mixins: {
        drawerWidth: {
            expanded: {
                sm: 200,
                xs: 0
            },
            collapsed: {
                sm: 81,
                xs: 0,
            }
        },
        appBar: {
            height: 64,
        }
    },
});

export default appTheme;
