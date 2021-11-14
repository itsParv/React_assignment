import React, { Component } from 'react';
import fbImg from './../assets/facebook.png';
import gaImg from './../assets/ga.png';
import googleAdsImg from './../assets/googleas.png';
import mailchimpImg from './../assets/mailchimp.png';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from './SourceCard.module.css';

export default class SourceCard extends Component {
  
  getImg = () => {
    const {id} = this.props.data;
    switch(id) {
      case 115: return gaImg;
      case 116: return fbImg;
      case 117: return googleAdsImg;
      case 114: return mailchimpImg;
      default: return gaImg
    }
  }
  render() {
    const {data, isFav, addToFav, click} = this.props;
    const img = this.getImg();
    return (
      <div className={styles.cardContainer} onClick={() => click(data)}>
        <span>{data.name}</span>
        <div className={styles.imgContainer}>
          <img style={{width: '60px'}} src={img} alt={data.name} />
        </div>
        <div className={styles.favIcon} onClick={(e) => addToFav(data.id,e)}>
          {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </div>
      </div>
    )
  }
}
