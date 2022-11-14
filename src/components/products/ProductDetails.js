//This is being built as part of Capstone project.
//ProductDetails.js contains all the functionailities with respect to the display of products details

import React , {useState} from 'react';
import Header from '../../common/header/Header';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './Products.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//Below styling is for the grid
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function ProductDetails(props){
    //The below state variable is setup for the toggle button
    const [alignment, setAlignment] = React.useState(() => ['web','android']);
    const [sortBy, setSortBy] = React.useState('');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
      };

      const handleSortChange = (event) => {
        setSortBy(event.target.value);
      }
    return(
        <div>
            <header>
                <Header />
            </header>
            <br></br>
            <div id = "toggle">
                <ToggleButtonGroup 
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    >
                        <ToggleButton value="all">All</ToggleButton>
                        <ToggleButton value="web">Web</ToggleButton>
                        <ToggleButton value="android">Android</ToggleButton>
                        <ToggleButton value="ios">iOS</ToggleButton>
                </ToggleButtonGroup>
            </div> {/* end of div id toggle */}
            <br></br>
            {/* Below code is for dividing the web page into grids for product display */}
            <div className = "gridMui">
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <Item>1</Item>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        benevoent
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                 </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>2</Item>
                        </Grid>
                    </Grid>
                </Box>
            </div> {/* Grid ending */}
        </div> //end of main div
    );
}

export default ProductDetails;