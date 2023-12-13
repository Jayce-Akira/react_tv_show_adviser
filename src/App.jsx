import { useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import "./global.css";
import s from './style.module.css';
import { useEffect } from "react";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logo from "./assets/images/logo.png"
import { TVShowListItem } from "./components/TVShowListItem/TVShowListItem";
import { TVShowList } from "./components/TVShowList/TVShowList";

// TVShowAPI.fetchPopulars();

export function App() {
    // On créé notre State
    const [currentTVShow, setCurrentTVShow] = useState();
    const [recommendationList, setRecommendationList] = useState([]);
    // on fait un useEffect
    async function fetchPopulars(){
        const populars = await TVShowAPI.fetchPopulars();
        if(populars.length > 0) {
            setCurrentTVShow(populars[0]);
        }
    }
    async function fetchRecommendations(TVShowId){
        const recommendations = await TVShowAPI.fetchRecommendations(TVShowId);
        if(recommendations.length > 0) {
            setRecommendationList(recommendations.slice(0,10));
        }
    }

    useEffect(() => {
        fetchPopulars();
    }, []);

    useEffect(() => {
        if(currentTVShow) {
            fetchRecommendations(currentTVShow.id);
        }
    }, [currentTVShow]);

    // console.log("***", currentTVShow);

    function setCurrentTVShowFromRecommendation(tvShow){
        alert(JSON.stringify(tvShow))
    }

    return (
        <div className={s.main_container} style={{background: currentTVShow ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover` : "black",}}>
            <div className={s.header}>
                <div className="row">
                    <div className="col-4">
                        <Logo image={logo} title="Watowatch" subtitles="Find a show you may like" />
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <input style={{ width:"100%" }} type="text" />
                    </div>
                </div>
            </div>
            <div className={s.tv_show_detail}>
                {currentTVShow && <TVShowDetail tvShow={currentTVShow}/>}
            </div>
            <div className={s.recommendations}>
                {recommendationList && recommendationList.length > 0 && (<TVShowList onClickItem={(setCurrentTVShow)} tvShowList={recommendationList}/>)}
            </div>
        </div>
    );
}