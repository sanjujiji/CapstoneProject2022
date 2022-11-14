//This is being built as part of Capstone project.
//Products.js contains all the functionailities with respect to the display of products for different users


import React , {useState} from 'react';
import Header from '../../common/header/Header';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './Products.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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


function Products(props){
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
            
            {/* Sort by dropdown */}
            <div className = "select">
                <InputLabel id="sortByLabel">Sort By:</InputLabel>
                <FormControl sx={{minWidth: 200 }}>
                    <Select
                        value={sortBy}
                        onChange={handleSortChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <i>Select...</i>
                            </MenuItem>
                            <MenuItem value={10}>Default</MenuItem>
                            <MenuItem value={20}>Price: High to Low</MenuItem>
                            <MenuItem value={30}>Price: Low to High</MenuItem>
                            <MenuItem value={40}>Price: Newest</MenuItem>
                    </Select> 
                </FormControl>
            </div>{/* end of div select */}
            
            {/* Below code is for dividing the web page into grids for product display */}
            <div className = "gridMui">
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
                            <Item>2</Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>3</Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>4</Item>
                        </Grid>
                    </Grid>
                </Box>
            </div> {/* Grid ending */}
        </div>//main div ending
    );
};

export default Products;