import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import '../App.css';

// This code below was to be used to style the grid items
// const styles = theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     overflow: 'hidden',
//     backgroundColor: theme.palette.background.paper,
//   },
//   gridList: {
//     width: 500,
//     height: 450,
//   },
//   icon: {
//     color: 'rgba(255, 255, 255, 0.54)',
//   },
// });

const performFetch = async ()=> {
  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/vnd.simplywallst.v2',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "offset": 0,
      "size": 100,
      "rules": [
        ["is_fund", "=", "false"],
        ["primary_flag", "=", "true"],
        ["analyst_count", ">", "0"],
        ["country_name", "=", "AU"],
        ["value_score", ">", 1],
        ["order_by", "market_cap", "desc"]
      ]
    })
  };
  const fetchURL = 'https://simplywall.st/api/grid/filter?include=info%2Cscore';

  return fetch(fetchURL, options);
};

const getData = async ()=> {
  const resp = await performFetch();

  if (resp.status === 200) {
    const companies = await resp.json()
    console.log(companies)
    return companies.data;
  } else {
    // Need to decide what to do here
  }
};


// So I ran out of time because I got stuck on trying to make this async.
// As you can see from the above code I was able query the data but when trying
// to display the data I could not get the funnction below to work asynchronous.
// This is due to my lack of knowledge with TypeScript. I tried various methods
// that I could find online but none of them worked. I also ran out of time to create tests
const Grid: React.FC = async () => {
  const items = await getData();
  console.log(items)
  return (
    <div className="Grid">
      <GridList cellHeight={180} className={'gridList'}>
        <GridListTile key="Subheader" cols={6} style={{height: 'auto'}}>
          <ListSubheader component="div">Companies</ListSubheader>
        </GridListTile>
        {items.map(item => (
          <GridListTile key={item.id}>
            <img src={item.img} alt={item.title} />
            <GridListTileBar
              title={item.name}
              subtitle={item.ticker_symbol}
              actionIcon={
                <IconButton className={'icon'}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default Grid;
