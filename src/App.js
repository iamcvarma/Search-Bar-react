import styled from 'styled-components';
import SearchBar from './components/SearchBar/SearchBar'

const AppContainer = styled.div`
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  margin-top:7rem;
`;

function App() {
  return (
    <div className="App">
      <AppContainer>
       <SearchBar />
      </AppContainer>
    </div>
  );
}

export default App;
