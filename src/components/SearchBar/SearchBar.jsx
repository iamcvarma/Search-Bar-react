import styled from "styled-components";
import { IoClose, IoSearch } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "react-click-outside-hook";
import { MoonLoader } from "react-spinners";
import axios from "axios";
import { TvShow } from "../TvShow/TvShow";

const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 34em;
  height: 3.8em;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
  overflow: hidden;
`;
const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 4em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 21px;
  color: #12112e;
  font-weight: 500;
  border-radius: 6px;
  background-color: transparent;

  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }

  &::placeholder {
    color: #bebebe;
    transition: all 250ms ease-in-out;
  }
`;

const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 23px;
  margin-top: 6px;
  vertical-align: middle;
`;

const CloseIcon = styled(motion.span)`
  color: #bebebe;
  font-size: 23px;
  margin-top: 6px;
  margin-right: 20px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: #dfdfdf;
  }
`;
const LineSeperator = styled.span`
  display: flex;
  width: 100%;
  height: 2px;
  background-color: #d8d8d878;
`;

const SearchContent = styled.div`
  box-sizing:border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y:auto;
  overflow-x:none;
`;

const LoadingWrapper = styled.div`
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
`

const containerVarient = {
  expanded: {
    height: "20em",
  },
  collapsed: {
    height: "3.8em",
  },
};

const containerTransition = {
  type: "spring",
  damping: 22,
  stiffness: 150,
};

function SearchBar(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [searchQuery,setSearchQuery] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const [tvShows,setTvShows] = useState([])
  const [parentRef, isClickedOutside] = useClickOutside();
  

  useEffect(() => {
    if (isClickedOutside) {
      collaplseContainer();
    }
  }, [isClickedOutside]);

  useEffect(()=>{
    if(!searchQuery || searchQuery.trim()===""){
        if(isLoading){
            setIsLoading(false)
        }
        return}
    setIsLoading(true)
    const getData = setTimeout(async ()=>{
        const URL = processSearchQuery(searchQuery)

        const response = await axios.get(URL).catch(err=>console.log(err))

        setTvShows(response.data)
        console.log(response.data);
        setIsLoading(false)

    },500)
    return ()=>clearTimeout(getData)
  },[searchQuery])

  function expandContainer() {
    setExpanded(true);
  }

  function collaplseContainer() {
    setExpanded(false);
    setSearchQuery("")
    setIsLoading(false)
    setTvShows([])
  }
  console.log('render')
  function changeHandler(e){
    e.preventDefault();
    setSearchQuery(e.target.value)
  }
  function processSearchQuery(query){
    const url = `https://api.tvmaze.com/search/shows?q=${query}`
    return encodeURI(url)
  }
  
  async function searchTvShow(){
    if(!searchQuery || searchQuery.trim()==="") {return}
    setIsLoading(true)

    const URL = processSearchQuery(searchQuery)

    const response = await axios.get(URL).catch(err=>console.log(err))

    console.log(response)
    setIsLoading(false)

  }


  return (
    <SearchBarContainer
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={containerVarient}
      transition={containerTransition}
      ref={parentRef}
    >
      <SearchInputContainer>
        <SearchIcon>
          <IoSearch />
        </SearchIcon>
        <SearchInput
          placeholder="Search for Movies/TV shows"
          onFocus={expandContainer}
          value={searchQuery}
          onChange={changeHandler}
        />
        <AnimatePresence>
          {isExpanded && (
            <CloseIcon
              key="colse-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={collaplseContainer}
            >
              <IoClose />
            </CloseIcon>
          )}
        </AnimatePresence>
      </SearchInputContainer>
      {isExpanded && <LineSeperator />}
      {isExpanded && <SearchContent>
        {isLoading && <LoadingWrapper>
            <MoonLoader loading color="#000" size={20}/>
        </LoadingWrapper>}
        {!isLoading && tvShows.length!==0 && <>
          {tvShows.map(({show})=>{
            return <TvShow 
            thumbnailSrc={show?.image}
            name = {show.name}
            rating={show?.rating?.average}
            />
          })}
        </>}
      </SearchContent>}
    </SearchBarContainer>
  );
}

export default SearchBar;
