import React from "react";
import "../styles/About.scss";

const About = () => {
  return (
    <div className="about-community-container">
      
      <div className="about-section">
        <h2 className="about-title">About t2hands</h2>
        <div className="about-content">
          <p>
            In today's throw-away culture, old and unused items are often
            discarded as waste, contributing significantly to environmental
            degradation. At the same time, the cost of living has steadily
            increased, making affordability a critical concern for many.
          </p>
          <p>
            By providing a platform for individuals to sell items they no
            longer need, users can recover a fair portion of their original
            investment while helping reduce waste. Meanwhile, buyers benefit
            from purchasing pre-owned goods at a lower cost than buying new,
            promoting both sustainability and economic savings.
          </p>
        </div>
      </div>

      
      <div className="community-section">
        <div className="community-messages">
            <div className="community-bubble hitori">
                <img src="/avt1.jpg" alt="Hitori" className="community-avatar" />
                <p className="community-text">
                    <strong>Hitori</strong> <br /> Bla bla bla bla bla bla bla bla bla bla bla
                </p>
            </div>
            <div className="community-bubble ryo">
                <img src="/avt2.jpg" alt="Ryo" className="community-avatar" />
                <p className="community-text">
                    <strong>Ryo</strong> <br /> Bla bla bla bla bla bla bla bla bla bla bla
                </p>
            </div>
            <div className="community-bubble nijika">
                <img src="/avt3.jpg" alt="Nijika" className="community-avatar" />
                <p className="community-text">
                    <strong>Nijika</strong> <br /> Bla bla bla bla bla bla bla bla bla bla bla
                </p>
            </div>
            <div className="community-bubble ikuyo">
                <img src="/avt4.jpg" alt="Ikuyo" className="community-avatar" />
                <p className="community-text">
                    <strong>Ikuyo</strong> <br /> Bla bla bla bla bla bla bla bla bla bla bla
                </p>
            </div>
        </div>

        
        <div className="community-info">
            <h2 className="community-title">t2hands community</h2>
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quod
            est dicta deleniti quis esse fuga repellat, temporibus minima
            facere. Voluptate eaque doloremque necessitatibus quae minima id
            dolores totam rerum?
            </p>
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quod
            est dicta deleniti quis esse fuga repellat, temporibus minima
            facere. Voluptate eaque doloremque necessitatibus quae minima id
            dolores totam rerum?
            </p>
        </div>
     
      </div>
    </div>
  );
};

export default About;
