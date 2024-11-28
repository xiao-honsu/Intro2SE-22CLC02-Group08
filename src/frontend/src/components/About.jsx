import React from "react";
import "../styles/About.scss";

const About = () => {
  return (
    <div id="to-about" className="about-community-container">
      
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
                    <strong>A hau 17 Tran Dan Huy</strong> <br /> Products look very new, I have bought items of this shop 3 times

                </p>
            </div>
            <div className="community-bubble ryo">
                <img src="/avt2.jpg" alt="Ryo" className="community-avatar" />
                <p className="community-text">
                    <strong>A sand wall</strong> <br /> OMG, a very cheap but good item!  
                </p>
            </div>
            <div className="community-bubble nijika">
                <img src="/avt3.jpg" alt="Nijika" className="community-avatar" />
                <p className="community-text">
                    <strong>Bao Dai Gia</strong> <br /> It looks so old but by the way, it still works :v
                </p>
            </div>
            <div className="community-bubble ikuyo">
                <img src="/avt4.jpg" alt="Ikuyo" className="community-avatar" />
                <p className="community-text">
                    <strong>Duck</strong> <br /> Nice, hehe :v
                </p>
            </div>
        </div>

        
        <div className="community-info">
            <h2 className="community-title">t2hands community</h2>
            <p>
            Our shop provides a thriving community where users can connect, 
            share experiences, and recommend a wide range of secondhand items.
            From fashion and electronics to home goods and collectibles,
            our community members can share their knowledge and help others 
            find great deals on pre-loved products. By fostering this community, 
            we aim to empower our users to make sustainable choices 
            and discover unique treasures.
            </p>
        </div>
     
      </div>
    </div>
  );
};

export default About;
