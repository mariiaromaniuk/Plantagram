// This Is My First Draft at Martial UI and styling the project Uncomment to view. May not work out long term

// import React from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// // import {Link} from 'react-router-dom'
// import AppBar from '@material-ui/core/AppBar'
// import Button from '@material-ui/core/Button'
// // import CameraIcon from '@material-ui/icons/PhotoCamera';
// import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
// import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
// import CssBaseline from '@material-ui/core/CssBaseline'
// import Grid from '@material-ui/core/Grid'
// import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography'
// import {makeStyles} from '@material-ui/core/styles'
// import Container from '@material-ui/core/Container'
// import Link from '@material-ui/core/Link'

// // import { plants } from '../components/plants/AllPlants'

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   )
// }

// const useStyles = makeStyles(theme => ({
//   icon: {
//     marginRight: theme.spacing(2)
//   },
//   heroContent: {
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(8, 0, 6)
//   },
//   heroButtons: {
//     marginTop: theme.spacing(4)
//   },
//   cardGrid: {
//     paddingTop: theme.spacing(8),
//     paddingBottom: theme.spacing(8)
//   },
//   card: {
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   cardMedia: {
//     paddingTop: '56.25%' // 16:9
//   },
//   cardContent: {
//     flexGrow: 1
//   },
//   footer: {
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(6)
//   }
// }))

// const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

// export default function Album(props) {
//   const classes = useStyles()
//   const plants = props.props
//   console.log('plants', plants)
//   return (
//     <React.Fragment>
//       <main>
//         {/* Hero unit */}
//         <div className={classes.heroContent}>
//           <Container maxWidth="sm">
//             <Typography
//               component="h1"
//               variant="h2"
//               align="center"
//               color="textPrimary"
//               gutterBottom
//             >
//               Plantagram
//             </Typography>
//             <Typography
//               variant="h5"
//               align="center"
//               color="textSecondary"
//               paragraph
//             >
//               All of our exotic plants have been hand-picked by our team of
//               botanists to bring your home warmth and joy. Scroll down to meet
//               your new photosynthetic friend!
//             </Typography>
//             <div className={classes.heroButtons}>
//               <Grid container spacing={2} justify="center">
//                 <Grid item>
//                   <Button variant="contained" color="primary">
//                     Shop All Plants
//                   </Button>
//                 </Grid>
//                 <Grid item>
//                   <Button variant="outlined" color="primary">
//                     View Your Cart
//                   </Button>
//                 </Grid>
//               </Grid>
//             </div>
//           </Container>
//         </div>
//         <Container className={classes.cardGrid} maxWidth="md">
//           {/* End hero unit */}
//           <Grid container spacing={4}>
//             {plants ? (
//               plants.map(card => (
//                 <Grid item key={card} xs={12} sm={6} md={4}>
//                   <Card className={classes.card}>
//                     <CardMedia
//                       className={classes.cardMedia}
//                       image="https://images.unsplash.com/photo-1517204452548-5f07ce910c9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60"
//                       title="Image title"
//                     />
//                     <CardContent className={classes.cardContent}>
//                       <Typography gutterBottom variant="h5" component="h2">
//                         Heading
//                       </Typography>
//                       <Typography>
//                         This is a media card. You can use this section to
//                         describe the content.
//                       </Typography>
//                     </CardContent>
//                     <CardActions>
//                       <Button size="small" color="primary">
//                         View
//                       </Button>
//                       <Button size="small" color="primary">
//                         Edit
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               ))
//             ) : (
//               <h2>Loading...</h2>
//             )}
//           </Grid>
//         </Container>
//       </main>
//     </React.Fragment>
//   )
// }
