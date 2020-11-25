import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './Card.css';
// import img from "./singapore.png";
import RateReviewIcon from '@material-ui/icons/RateReview';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
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


    //
       
              /// oldone

            //   export default function MediaControlCard({ removeGetRes,compDidmount, reserveShow, favoriteNotEmp, adults, dateDifferenceNumber, data, currentUser, hideRes, hideFav }) {
            //     const classes = useStyles();
            //     const theme = useTheme();
              
            //     const [favNotEmpty, setFav] = React.useState(favoriteNotEmp || false);
            //     const [reservation, setReservation] = React.useState((removeGetRes || reserveShow || false));
            //     return (
            //         <Card className={classes.root} id="body" style={{borderRadius:"25px"}}>
            //           <div className="first_img">
            //             <div  >
            //               {/* < img src={data.thumbnailUrl} className="img img_abs" style={{borderRadius:"15px"}}/> */}
            //               {/* < img src={img} className="img img_abs" /> */}
                
            //               {/* {hideFav ?
            //                 <div></div>
            //                 :
            //                 currentUser ?
            //                   !(favNotEmpty || favoriteNotEmp) ?
            //                     <FavoriteBorderIcon color="action" fontSize="large" className="icon" onClick={() => handleFavAdd(data, currentUser)} />
            //                     :
            //                     <FavoriteIcon color="error" fontSize="large" className="icon" onClick={() => handleFavRemove(data, currentUser)} />
            //                   :
            //                   <div></div>
            //               } */}
            //             </div>
            //           </div>
            //           <div className="center">
            //             <div className={classes.details}>
            //               <CardContent className={classes.content}>
            //                 <div className = "first_Center">
            //                   <Typography component="h5" variant="h5">
            //                   Wadi Al-Qilt
            //                     {/* {data.name} */}
            //                   </Typography>
            //                 </div>
            //                 <div className="center-second">
            //                   <Typography variant="subtitle1" color="textSecondary">
            //                     <div className="citysize">
            //                     tripType: One Day Trip
            //                       {/* {data.address.locality}, {data.address.countryName} */}
            //                       </div>
            //                   </Typography>
            //                 </div>
            //               </CardContent>
            //               <div className="dollers" >
            //                 <Typography  >
            //                 <div>$ 19.99</div>
            //                   <div className="facility" >
            //                   date: 2020-11-18
            //                     {/* {data.address.streetAddress} */}
            //                   </div>
            //                   <div>deadLine:2020-11-17</div>
            //                 </Typography>
                            
            //                 {/* ${priceConverter(data.ratePlan.price.current, adults, dateDifferenceNumber())} */}
            //                 {/* {data.ratePlan.price.current} */}
            //               </div>
            //             </div>
            //           </div>
            //           {/* <div className={classes.controls}>
            //               <IconButton aria-label="previous">
            //                 {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
            //               </IconButton>
            //               <IconButton aria-label="play/pause">
            //                 <PlayArrowIcon className={classes.playIcon} />
            //               </IconButton>
            //               <IconButton aria-label="next">
            //                 {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
            //               </IconButton>
            //             </div> */}
            //         </Card>
            //       );
            //     }
            
            // //          <div className='third_component'>
                    
            // {/* <div className="thirdcom_firstone">  discription :
            // {/* <Rating name="half-rating-read" defaultValue={4} precision={0.5} readOnly /> */}
            // {/* <Rating name="half-rating-read" defaultValue={data.starRating} precision={0.5} readOnly /> */}
            
            // // </div>
            // // <div className="third_component_thirdline">
            // // <div style={{jus}}>
            // // <Button variant="contained" color="primary"  >
            // //         reserve here
            // // </Button>
            // // </div>
            
            
            // // </div>
            // // </div> */}
            
            //     //
            //             {/* <div style={{ padding: "6px" }}>
            //                 <RateReviewIcon className='ratereview' />
            //               </div>
            //             </div>
            //             <div className="third_component_secondline">
            //               {
            //                 currentUser ?
            //                   reservation ?
            //                     <Button variant="contained" color="primary" onClick={() => handleReserveRemove(data, currentUser)}>
            //                       remove reservation
            //               </Button>
            //                     :
            //                     <Button variant="contained" color="primary" onClick={() => handleReserveAdd(data, currentUser)}>
            //                       reserve here
            //               </Button>
            //                   : <div></div>
            //               } */}

            //                    {/* <div style={{ padding: "6px" }}>
            //     <RateReviewIcon className='ratereview' />
            //   </div>
            // </div>
            // <div className="third_component_secondline">
            //   {
            //     currentUser ?
            //       reservation ?
            //         <Button variant="contained" color="primary" onClick={() => handleReserveRemove(data, currentUser)}>
            //           remove reservation
            //   </Button>
            //         :
            //         <Button variant="contained" color="primary" onClick={() => handleReserveAdd(data, currentUser)}>
            //           reserve here
            //   </Button>
            //       : <div></div>
            //   } */}
