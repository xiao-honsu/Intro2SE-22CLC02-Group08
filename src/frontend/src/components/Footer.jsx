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
              <li><a href="/SupportPageSeller#toSalesguidance">Sales guidance</a></li>
              <li><a href="/SupportPageSeller#to-protectionpolicy">Buyer protection policy</a></li>
              <li><a href="/SupportPageSeller#to-feedback">Feedback</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Account</h3>
            <ul>
              <li><a href="/SignUp">Sign up</a></li>
              <li><a href="/login">Log in</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>About t2hands</h3>
            <ul>
              <li><a href="#to-about">About t2hands</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61569666026415" target="_blank">Contact us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Policies</h3>
            <ul>
              <li><a href="/PoliciesPageSeller#to-Prohibiteditems">Prohibited items</a></li>
              <li><a href="/PoliciesPageSeller#to-communication">Communication policy</a></li>
              <li><a href="/PoliciesPageSeller#to-safety">Safety guidelines</a></li>
            </ul>
          </div>
        </div>
      )}


        <div className="footer-bottom">
            <div className="logo">t2hands</div>
            <div className="social-icons">
                <a href="https://www.facebook.com/profile.php?id=61569666026415" target="_blank" className="icon facebook">
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="https://www.instagram.com/t2hands_/" target="_blank" className="icon instagram">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://x.com/T2Hands_" target="_blank" className="icon twitter">
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
