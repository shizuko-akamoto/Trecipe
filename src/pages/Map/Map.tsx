import React from "react";
import "./map.scss";
import { DestinationCard } from "./DestinationCard/DestinationCard";
import { newDestinationModel } from "../../redux/Destinations/types";
import { CardMenu } from "../../components/CardMenu/CardMenu";
import { MenuItem } from "../../components/Menu/Menu";

export class Map extends React.Component {
  private trecipeEditMenuItems: MenuItem[] = [
    {
      id: 1,
      text: "Edit",
      icon: "edit",
      onClick: () => {},
    },
    {
      id: 2,
      text: "Duplicate",
      icon: "copy",
      onClick: () => {},
    },
    {
      id: 3,
      text: "Delete",
      icon: ["far", "trash-alt"],
      onClick: () => {},
    },
  ];

  render() {
    const destModel = newDestinationModel();
    return (
      <div className="content-wrapper">
        <aside className="map-side-bar">
          <div className="trecipe-header">
            <span>Trecipe Name</span>
            <CardMenu
              menuItems={this.trecipeEditMenuItems}
              editIconColor="#000000"
            />
          </div>
          <div>
            <ul className="dest-card-list">
              <DestinationCard
                destModel={destModel}
                onClickComplete={() => {}}
                onClickDelete={() => {}}
                isCompleted={false}
                index={0}
              />
              <DestinationCard
                destModel={destModel}
                onClickComplete={() => {}}
                onClickDelete={() => {}}
                isCompleted={false}
                index={1}
              />
              <DestinationCard
                destModel={destModel}
                onClickComplete={() => {}}
                onClickDelete={() => {}}
                isCompleted={false}
                index={2}
              />
              <DestinationCard
                destModel={destModel}
                onClickComplete={() => {}}
                onClickDelete={() => {}}
                isCompleted={false}
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
