import React, {useState, useEffect, createRef} from 'react'
import useStyles from './Styles'
import {Card, CardActions , CardActionArea , CardContent,CardMedia , Button , Typography} from '@material-ui/core'
import classNames from 'classnames';

const NewsCard = ({article:{description,publishedAt,source,title,url,urlToImage} , i,isActive,activeArt}) => {
  const classes = useStyles();
  const [refs,setRefs]= useState([]);
  const scrollToRef = ref=>{
    window.scroll(0,ref.current.offsetTop-50)
  }
  useEffect(()=>{
    setRefs(refs=> Array(20).fill().map((i,j)=> refs[j]||createRef()))
  },[])
  
  useEffect(()=>{
    if(isActive&&refs[activeArt]){
      scrollToRef(refs[activeArt])
    }
  },[isActive,refs,i])
  return (
    <Card ref={refs[i]} className={classNames(classes.card, isActive ? classes.activeCard:null)}>
      <CardActionArea href={url} target='_blank'>
        <CardMedia className={classes.media} image={urlToImage || 'https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=20&m=1182477852&s=612x612&w=0&h=I3wdSzT_5h1y9dHq_YpZ9AqdIKg8epthr8Guva8FkPA='}></CardMedia>
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary' component={'h2'}>{(new Date(publishedAt)).toDateString()}</Typography>
          <Typography variant='body2' color='textSecondary' component={'h2'}>{source.name}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant='h5'>{title}</Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component={'p'}>{description}</Typography>

        </CardContent>

      </CardActionArea>
      <CardActions className={classes.cardAction}>
        <Button size='small' color='primary'>Learn More</Button>
        <Typography variant='h5' color='textSecondary'>{i+1}</Typography>
      </CardActions>
    </Card>
  )
}

export default NewsCard