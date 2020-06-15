import React from "react";
import "./components/fontawesome";
import "./App.scss";
import ModalContainer from "./components/Modal/ModalContainer";
import {
  DestinationCard,
  DestinationCategory,
} from "./pages/Trecipe/DestinationCard/DestinationCard";
import SampleDestImage from "./pages/Trecipe/sample.jpg";

function App() {
  return (
    <div className="App">
      <DestinationCard
        index={1}
        destModel={{
          id: 0,
          name: "Destination Name",
          category: DestinationCategory.Food,
          address: "City, Country",
          rating: 5,
          description: "Some overview on this destination.",
          imgSrc: SampleDestImage,
        }}
        onClickDelete={() => {}}
      />
      <ModalContainer />
    </div>
  );
}

export default App;
