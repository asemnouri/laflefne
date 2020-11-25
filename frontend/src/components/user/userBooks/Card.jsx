import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './Card.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function MediaControlCard({ removeGetRes,compDidmount, reserveShow, favoriteNotEmp, adults, dateDifferenceNumber, data, currentUser, hideRes, hideFav }) {
    const classes = useStyles();
    const theme = useTheme();
  
    const [favNotEmpty, setFav] = React.useState(favoriteNotEmp || false);
    const [reservation, setReservation] = React.useState((removeGetRes || reserveShow || false));
    return (
        <Card className={classes.root} id="body" style={{borderRadius:"25px"}}>
          <div className="first_img">
            <div>
            </div>
          </div>
          <div className="center">
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <div className = "first_Center">
                  <Typography component="h5" variant="h5">
                  Wadi Al-Qilt
                    {/* {data.name} */}
                  </Typography>
                </div>
                <div className="center-second">
                  <Typography variant="subtitle1" color="textSecondary">
                    <div className="citysize">
                    tripType: One Day Trip
                      {/* {data.address.locality}, {data.address.countryName} */}
                      </div>
                  </Typography>
                </div>
              </CardContent>
              <div className="dollers" >
                <Typography >
                <div className="facility" >
                <div>price : $19.99</div>
                  <div>
                  date: 2020-11-18
                  </div>
                  <div>deadLine:2020-11-17</div>
                  </div>
                 
                </Typography>
              </div>
            </div>
          </div>
         
        </Card>
      );
    }

