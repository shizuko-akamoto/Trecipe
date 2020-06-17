import React from "react";
import "../Trecipe/Trecipe.scss";
import {
  DestinationCard,
  DestinationCategory,
  DestinationModel,
} from "./DestinationCard/DestinationCard";
import {
  DragDropContext,
  Droppable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import SampleDestImage from "./sample.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Trecipe State
 * destination: destination models in the Trecipe
 * visibleTo: stores the index of destinations in list currently visible (used for "Show More")
 * isInEdit: true if destinations are currently in edit
 */
export interface TrecipeState {
  destinations: Array<DestinationModel>;
  visibleTo: number;
  isInEdit: boolean;
}

export class Trecipe extends React.Component<{}, TrecipeState> {
  private static SAMPLE_DEST: DestinationModel = {
    id: 0,
    name: "Destination Name",
    category: DestinationCategory.Food,
    address: "City, Country",
    rating: 3,
    description: "Some overview on this destination.",
    imgSrc: SampleDestImage,
  };
  private static DEFAULT_VISIBLE = 5;

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      destinations: [],
      visibleTo: Trecipe.DEFAULT_VISIBLE,
      isInEdit: false,
    };
  }

  componentDidMount(): void {
    // TODO: Replace mock dests with destinations actually in Trecipe
    const initialDests = [0, 1, 2, 3, 4, 5].map((index) => {
      const { id, ...rest } = Trecipe.SAMPLE_DEST;
      return { id: index, ...rest };
    });
    this.setState({ destinations: initialDests });
  }

  private onDestDragEnd(result: DropResult, provided: ResponderProvided) {
    if (result.destination) {
      const dests: Array<DestinationModel> = Trecipe.reorder(
        this.state.destinations,
        result.source.index,
        result.destination.index
      );
      this.setState({ destinations: dests });
    }
  }

  private onShowMore() {
    if (!this.state.isInEdit) {
      this.setState((state) => {
        return { visibleTo: state.visibleTo + Trecipe.DEFAULT_VISIBLE };
      });
    }
  }

  private canExpand() {
    return (
      !this.state.isInEdit &&
      this.state.visibleTo < this.state.destinations.length
    );
  }

  private getDestinationsList() {
    if (this.state.isInEdit) {
      return this.state.destinations;
    } else {
      return this.state.destinations.slice(0, this.state.visibleTo);
    }
  }

  private toggleEdit() {
    this.setState((state) => ({ isInEdit: !state.isInEdit }));
  }

  private static reorder(
    list: Array<DestinationModel>,
    startIndex: number,
    endIndex: number
  ): Array<DestinationModel> {
    const listCopy = Array.from(list);
    const [removed] = listCopy.splice(startIndex, 1);
    listCopy.splice(endIndex, 0, removed);
    return listCopy;
  }

  render() {
    return (
      <div>
        <DragDropContext onDragEnd={this.onDestDragEnd.bind(this)}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <ul
                className="destination-cards"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {this.getDestinationsList().map((dest, index) => (
                  <DestinationCard
                    key={dest.id}
                    destModel={dest}
                    index={index}
                    onClickDelete={() => {}}
                    isInEdit={this.state.isInEdit}
                  />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        {this.canExpand() && (
          <button
            className="show-more-btn"
            onClick={this.onShowMore.bind(this)}>
            Show More
            <FontAwesomeIcon id="show-more-icon" icon="chevron-down" />
          </button>
        )}
      </div>
    );
  }
}
