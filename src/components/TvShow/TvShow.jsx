import styled from "styled-components";

const TvShowContainer = styled.div`
    width:100%;
    height:2em;
    display:flex;
    border-bottom: 1px solid #d8d8d852;
    padding:6px 8px;
`;

const Thumbnail = styled.div`
    width:auto;
    height:100%;

    img {
        width:auto;
        height:100%;
    }
`

const Name = styled.h3`
    font-size:20px;
    color:#000;
    margin-left:10px;
`
const Rating = styled.span`
    color:#a1a1a1;
    font-size:16px;
`


export function TvShow(props){

}