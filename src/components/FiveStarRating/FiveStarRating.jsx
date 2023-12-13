import s from "./style.module.css";
import { StarFill, Star as StarEmpty, StarHalf } from "react-bootstrap-icons";

export function FiveStarRating({ rating }){
    // Déclarer un tableau d'étoiles (jsx) vide
    const starList = [];
    
    // Stocker dans une varible vide le nombre d'étoile pleine
    const starFillCount = Math.floor(rating);
    // Stocker dans uns variable si oui ou non nous avons une demi étoile
    const hasStarHalf = rating - starFillCount >= 0.5;
    // Stocker dans une variable le nombre d'étoile vide
    const emptyStarCount = 5 - starFillCount - (hasStarHalf ? 1 : 0);
    // Pushr dans le tableau les étoiles pleine
    // console.log(starFillCount, hasStarHalf, emptyStarCount);
    for (let i = 1; i <= starFillCount; i++ ){
        starList.push(<StarFill key={"star-fill" + i} />)
    }
    // Pusher dans le tableau les demi étoiles (Si nous en avons)
    if (hasStarHalf){
        starList.push(<StarHalf key={"star-half"} />)
    }
    // Pusher dans le tableau les étoiles vide
    for (let i = 1; i <= emptyStarCount; i++ ){
        starList.push(<StarEmpty key={"star-empty" + i } />)
    }
    return <div>
        {starList}
    </div>;

}