import React from 'react'
import { useGlobalContext } from '../context/global'
import Popular from './Popular'
import styled from 'styled-components'
import Upcoming from './Upcoming'
import Airing from './Airing'
function Homepage(){

    const {handleSubmit, 
        search, 
        searchAnime, 
        handleChange,
        getUpcomingAnime,
        getAiringAnime,
        getPopularAnime,
    } = useGlobalContext()

    const [rendered, setRendered] = React.useState('popular');

    const switchComponent = () => {
        switch(rendered){
            case 'popular':
                return <Popular rendered={rendered} />
            case 'airing':
                return <Airing rendered={rendered} />
            case 'upcoming':
                return <Upcoming rendered={rendered} />
            default:
                return <Popular rendered={rendered} />
        }
    }

    return(
        <HomepageStyled>
            <header>
                <div className="logo">
                    <h1>
                        {rendered === 'popular' ? '人気アニメ' : 
                        rendered === 'airing' ? '放送中' : '公開予定'}
                    </h1>
                </div>
                <div className="search-container">
                    <div className="filter-btn popular-filter">
                        <button onClick={() =>{
                            setRendered('popular')
                        }}>人気アニメ<i className='fas fa-fire'></i></button>
                    </div>
                    <form action="" className="search-form" onSubmit={handleSubmit}>
                        <div className="input-control">
                            <input type="text" placeholder="アニメ検索" value={search} onChange={handleChange} />
                            <button type="submit">検索</button>
                        </div>
                    </form>
                    <div className="filter-btn airing-filter">
                        <button onClick={() =>{
                            setRendered('airing')
                            getAiringAnime()
                        }}>放送中</button>
                    </div>
                    <div className="filter-btn upcoming-filter">
                        <button onClick={() =>{
                            setRendered('upcoming')
                            getUpcomingAnime()
                        }}>公開予定</button>
                    </div>
                </div>
            </header>
            {switchComponent()}
        </HomepageStyled>
    )
}

const HomepageStyled = styled.div`
background-color: #EDEDED;
header{
    padding: 2rem 5rem;
    width: 60%;
    margin: 0 auto;
    transition: all .4s ease-in-out;
    h1{
        background:linear-gradient( to right, #78bfde, #e0aed1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: all .4s ease-in-out;
    }
    @media screen and (max-width:1530px){
        width: 95%;
    }
    .logo{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2rem;
    }
    .search-container{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .5rem;
        button{
            display: flex;
            white-space: nowrap;
            align-items: center;
            gap: .5rem;
            padding: .7rem 2rem;
            outline: none;
            border-radius: 30px;
            font-size: 1.2rem;
            background-color: #fff;
            cursor: pointer;
            color: #406777;
            transition: all .4s ease-in-out;
            font-family: inherit;
            border: 5px solid #78bfde;
        }
        form{
            position: relative;
            width: 100%;
            .input-control{
                position: relative;
                transition: all .4s ease-in-out;
            }
            .input-control input{
                width: 100%;
                padding:.7rem 1rem;
                border: none;
                outline: none;
                border-radius: 30px;
                font-size: 1.2rem;
                background-color: #fff;
                border: 5px solid #e0aed1;
                transition: all .4s ease-in-out;
            }
            .input-control button{
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
}
`

export default Homepage;