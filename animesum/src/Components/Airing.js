import React from 'react'
import { useGlobalContext } from '../context/global';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


function Airing({rendered}) {
    const {airingAnime, isSearch, searchResults} = useGlobalContext();

    const conditionalRender = () => 
    {
        if(!isSearch && rendered === 'airing')
            return airingAnime?.map((anime) => {
                return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                    <img src={anime.images.jpg.large_image_url} alt="" />
                    </Link>
            })
        else
        {
            return searchResults?.map((anime) => {
                return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                    <img src={anime.images.jpg.large_image_url} alt="" />
                </Link>
            })
        }
    }

    return (
        <PopularStyled >
            <div className="airing-anime">
                {conditionalRender()}
            </div>
        </PopularStyled >
    )
}

const PopularStyled = styled.div`
    display: flex;
    .airing-anime{
        margin-top: 2rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 2rem;
        padding-right: 0;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-gap: 1.5rem;
        background-color: #fff;
        border-top: 5px solid #e5e7eb;
        a{
            height: 400px;
            width: 100%;
            border-radius: 7px;
            border: 5px solid #e5e7eb;
        }
        a img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
        }
        
    }
`;

export default Airing