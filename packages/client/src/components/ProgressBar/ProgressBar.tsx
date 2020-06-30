import React, { CSSProperties } from "react";
import "./progressBar.scss";

export interface ProgressBarProps {
  total: number;
  completed: number;
  showText: boolean;
  barStyle?: CSSProperties;
  fillerStyle?: CSSProperties;
}

export class ProgressBar extends React.Component<ProgressBarProps> {
  private calcPercentage() {
    return this.props.total === 0
      ? 0
      : (this.props.completed / this.props.total) * 100;
  }

  render() {
    const barStyle = this.props.barStyle ? this.props.barStyle : {};
    const fillerStyle = this.props.fillerStyle ? this.props.fillerStyle : {};
    return (
      <div>
        {this.props.showText && (
          <div className="progress-bar-text">
            {this.props.completed}/{this.props.total} completed
          </div>
        )}
        <div className="progress-bar" style={barStyle}>
          <div
            className="progress-bar-filler"
            style={{
              width: this.calcPercentage.bind(this)() + "%",
              ...fillerStyle,
            }}
          />
        </div>
      </div>
    );
  }
}
