import React, {createContext, useContext, useReducer} from "react";

const GlobalContext = createContext();

const baseUrl = "https://api.jikan.moe/v4";

// actions
// if true, then no more fetching.
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";

const reducer = (state, action) => {
    // change the state based on the action, to not to fetch again.
    switch(action.type){
        case LOADING:
            return {...state, loading:true};
        case GET_POPULAR_ANIME:
            return {...state, popularAnime:action.payload, loading:false};
        default:
            return state;
    }
    return state;
}
// GlobalContextProvider is a component that wraps around the entire app.
export const GlobalContextProvider = ({children}) => {

    // the initial state of the app.
    const initialState = {
        popularAnime:[],
        upcomingAnime:[],
        airingAnime:[],
        pictures:[],
        isSearch:false,
        searchResults:[],
        loading:false,
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    // fetch popular anime
    const getPopularAnime = async () => {
        dispatch({type: LOADING})
        const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
        const data = await response.json();
        // console.log(data.data);
        dispatch({type: GET_POPULAR_ANIME, payload: data.data});
    }

    //initial render
    React.useEffect(() => {
        getPopularAnime();
    }, [])
    
    return(
        <GlobalContext.Provider value={{
            // passing the state and dispatch to the global context.
            ...state,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

// allow us to use the global context in any component we want.
export const useGlobalContext = () => {
    return useContext(GlobalContext);
}