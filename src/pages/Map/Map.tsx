import React from "react";
import "./map.scss";
import { DestinationCard } from "./DestinationCard/DestinationCard";
import { newDestinationModel } from "../../redux/Destinations/types";
import { CardMenu } from "../../components/CardMenu/CardMenu";

export class Map extends React.Component {
  render() {
    const destModel = newDestinationModel();
    return (
      <div className="content-wrapper">
        <aside className="map-side-bar">
          <div className="trecipe-header">
            <span>Trecipe Name</span>
            <CardMenu menuItems={[]} editIconColor="#000000" />
          </div>
          <div>
            <ul className="dest-card-list">
              <DestinationCard
                destModel={destModel}
                onClickComplete={() => {}}
                onClickDelete={() => {}}
                isCompleted={true}
                index={0}
              />
              <DestinationCard
                destModel={destModel}
                onClickComplete={() => {}}
                onClickDelete={() => {}}
                isCompleted={true}
                index={1}
              />
              <DestinationCard
                destModel={destModel}
                onClickComplete={() => {}}
                onClickDelete={() => {}}
                isCompleted={true}
                index={2}
              />
              <DestinationCard
                destModel={destModel}
                onClickComplete={() => {}}
                onClickDelete={() => {}}
                isCompleted={true}
                index={3}
              />
            </ul>
          </div>
        </aside>
        <div className="map-container" />
      </div>
    );
  }
}
