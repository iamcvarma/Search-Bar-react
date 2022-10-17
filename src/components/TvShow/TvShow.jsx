import styled from "styled-components";

const TvShowMainCard = styled.div`
    position:relative;
    width:98%;
    min-height:4.5em;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow:hidden;
    padding:2px;
    background-color:#000;
    & >img {
        position:absolute;
        width:100%;
        object-cover:cover;
        filter:blur(6px) brightness(60%);
        object-postion:30px;
        
    }
`;

const TvShowContainer = styled.div`
  width: 100%;
  height: 4em;
  display: flex;
  border-bottom: 1px solid #d8d8d852;
  padding: 6px 8px;
  z-index: 2;
`;

const Thumbnail = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex: 0.4;

  img {
    width: auto;
    height: 100%;
  }
`;

const Name = styled.h3`
  font-size: 20px;
  color: white;
  margin-left: ;
  display: flex;
  flex: 2;
`;
const Rating = styled.span`
  color: #a1a1a1;
  font-size: 20px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export function TvShow({ thumbnailSrc, name, rating }) {
  return (
    <TvShowMainCard>
      {thumbnailSrc?.original!=undefined && <img src={thumbnailSrc?.original} />}
      <TvShowContainer>
        {thumbnailSrc && (
          <Thumbnail>
            <img src={thumbnailSrc?.medium} />
          </Thumbnail>
        )}
        <Name>{name}</Name>
        {rating !== undefined && <Rating>{rating || "N/A"}</Rating>}
      </TvShowContainer>
    </TvShowMainCard>
  );
}
