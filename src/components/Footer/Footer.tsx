import React from "react";
import "./footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Footer extends React.Component<{}, {}> {
  private static githubLink: string =
    "https://github.com/shizuko-akamoto/Trecipe";

  render() {
    return (
      <footer className="footer">
        <div className="footer-contents">
          <div className="footer-logo">
            <h2>Trecipe</h2>
            <p>CPSC432I(2020S) Team2</p>
          </div>
          <div className="sns">
            <a href={Footer.githubLink} className="github">
              <FontAwesomeIcon icon={["fab", "github"]} fixedWidth />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}
