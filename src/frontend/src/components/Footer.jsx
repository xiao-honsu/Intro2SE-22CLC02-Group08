import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import '../styles/Footer.scss';

function Footer({ showBanner = true }) {
  return (
    <div className="footer-container">
      {showBanner && (
        <div className="footer-content">
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><a href="#">Sales guidance</a></li>
              <li><a href="#">Buyer protection policy</a></li>
              <li><a href="#">Feedback</a></li>
              <li><a href="#">Operating regulations</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Account</h3>
            <ul>
              <li><a href="#">Sign up</a></li>
              <li><a href="#">Log in</a></li>
              <li><a href="#">Messages</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>About t2hands</h3>
            <ul>
              <li><a href="#to-about">About t2hands</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=100024478702552" target="_blank">Contact us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Policies</h3>
            <ul>
              <li><a href="#">Prohibited items</a></li>
              <li><a href="#">Communication policy</a></li>
              <li><a href="#">Safety guidelines</a></li>
            </ul>
          </div>
        </div>
      )}


        <div className="footer-bottom">
            <div className="logo">t2hands</div>
            <div className="social-icons">
                <a href="https://www.facebook.com/profile.php?id=100024478702552" target="_blank" className="icon facebook">
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="#" className="icon instagram">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#" className="icon twitter">
                    <FontAwesomeIcon icon={faXTwitter} />
                </a>
                <button
                className="scroll-to-top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>▲
            </button>
            </div>
            
        </div>
    </div>
  );
}

export default Footer;
