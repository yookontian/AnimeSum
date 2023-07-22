import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from 'styled-components'

function AnimeItem()
{
    const {id} = useParams()

    // state
    const [anime, setAnime] = React.useState({});
    const [characters, setCharacters] = React.useState([]);
    const [showMore, setShowMore] = React.useState(false);

    console.log("anime", anime);
    // destructuring anime
    let {
        title, title_japanese, synopsis, 
        trailer,duration,aired, 
        season, images, rank, 
        score,scored_by, popularity, 
        status, rating, source } = anime
    
    // if synopsis endwith "[Written by MAL Rewrite]" then remove it.
    if(synopsis?.endsWith("[Written by MAL Rewrite]"))
        synopsis = synopsis?.substring(0, synopsis.length - 24);

    // if status is "Currently Airing", then transmit aired to a string, then aired = substring(0, aired.length - 5)
    if(status === "Currently Airing" && aired) 
    {
        aired = aired?.string;
        aired = aired.substring(0, aired.length - 5);
    }

    // get anime based on id
    const getAnime = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
        const data = await response.json();
        setAnime(data.data);
    }


    // get characters
    const getCharacters = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`);
        const data = await response.json();
        setCharacters(data.data);
        // console.log("character", data.data);
    }

    useEffect(() => {
        getAnime(id);
        getCharacters(id);
    }, [])

    return(
        <AnimeItemStyled>
            <h1>
                {title_japanese}<br></br>{title}
            </h1>
            <div className="details">
                <div className="detail">
                    <div className="image">
                        <img src={images?.jpg.large_image_url} alt="" />
                    </div>
                    <div className="anime-details">
                        <p><span>初放送: </span><span>{aired}</span></p>
                        <p><span>レーティング: </span><span>{rating}</span></p>
                        <p><span>得点ランキング:</span><span>{rank} 位</span></p>
                        <p><span>総合得点:</span><span>{score} 点</span></p>
                        <p><span>評価した: </span><span>{scored_by} 人</span></p>
                        <p><span>人気ランキング: </span><span>{popularity} 位</span></p>
                        <p><span>放送状態: </span><span>{status}</span></p>
                        <p><span>原作: </span><span>{source}</span></p>
                        <p><span>放送時期: </span><span>{season}</span></p>
                        <p><span>1話の放送時間: </span><span>{duration}</span></p>
                    </div>
                </div>
                    <p className="description">
                        {showMore ? synopsis : synopsis?.substring(0, 450) + "..."}
                        <button onClick={() =>{
                            setShowMore(!showMore);
                        }}>{showMore ? 'Show Less': 'Read More'}</button>
                    </p>
            </div>
                <h3 className="title">予告編</h3>
                <div className="trailer-con">
                    {trailer?.embed_url ? 
                        <iframe 
                            src={trailer?.embed_url} 
                            title="Inline Frame Example"
                            width="800"
                            height="450"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe> :
                        <h3>Trailer not available</h3>
                    }
                </div>
                <h3 className="title">キャラクター</h3>
                <div className="characters">
                    {characters?.map((character, index) => {
                        const {role} = character;
                        const {images, name, mal_id} = character.character; 
                        return <Link to={`/character/${mal_id}`} key={index}>
                            <div className="character">
                                <img src={images?.jpg.image_url} alt="" />
                                <h4>{name}</h4>
                                <p>{role}</p>
                            </div>
                        </Link>
                    })}
                </div>

        </AnimeItemStyled>
    )
}

const AnimeItemStyled = styled.div`
    padding: 3rem 18rem;
    background-color: #EDEDED;
    h1{
        display: inline-block;
        font-size: 3rem;
        margin-bottom: 1.5rem;
        cursor: pointer;
        background:linear-gradient( to right, #78bfde, #e0aed1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: all .4s ease-in-out;
        &:hover{
            transform: skew(-3deg);
        }
    }
    .title{
        display: inline-block;
        margin: 3rem 0;
        font-size: 2rem;
        cursor: pointer;
        background:linear-gradient( to right, #78bfde, #e0aed1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .description{
        margin-top: 2rem;
        color: #6c7983;
        line-height: 1.7rem;
        button{
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 1.2rem;
            color: #e0aed1;
            font-weight: 600;
        }
    }

    .trailer-con{
        display: flex;
        justify-content: center;
        align-items: center;
        iframe{
            outline: none;
            border: 5px solid #e0aed1;
            padding: 1.5rem;
            border-radius: 10px;
            background-color: #FFFFFF;
        }
    }

    .details{
        background-color: #fff;
        border-radius: 20px;
        padding: 2rem;
        border: 5px solid #78bfde;
        .detail{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            img{
                border-radius: 7px;
            }
        }
        .anime-details{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p{
                display: flex;
                gap: 1rem;
            }
            p span:first-child{
                font-weight: 600;
                color: #38464c;
            }
        }
    }
    .characters{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grip-gap: 2rem;
        background-color: #fff;
        padding: 2rem;
        border-radius: 20px;
        border: 5px solid #78bfde;
        .character{
            padding: .4rem .6rem;
            border-radius: 7px;
            background-color: #EDEDED;
            transition: all .4s ease-in-out;
            img{
                width: 100%;
            }
            h4{
                padding: .5rem 0;
                color: #4696b9;
            }
            p{
                color: #e8a1af;
            }
            &:hover{
                transform: translateY(-5px);
            }
        }
    }
`;


export default AnimeItem;