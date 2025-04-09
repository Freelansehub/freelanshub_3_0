import LogTheClient from "./LogTheClient";
import LogTheFreelanser from "./LogTheFreelanser";
import LogToCatHouse from "./LinkToCatHouse";

export default function Home() : React.ReactElement {
    return (
        <div data-testid="home-page" className="home">
            <div className="container py-4">
    <LogTheClient />

    <div className="row align-items-md-stretch">
     <LogTheFreelanser />
     <LogToCatHouse /> 
    </div>

    
  </div>
        </div>
    );
}