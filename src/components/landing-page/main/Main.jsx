import axios from 'axios';
import './main.css';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { BACKEND_URL, setLoggedInUserIdAction, AppContext } from '../../../store.jsx';
import firebase from '../../../Firebase.js';

export default function Main() {
  const [email, setEmail] = useState('alvin@gmail.com');
  const [password, setPassword] = useState('alvin');
  const { dispatch } = useContext(AppContext);
  const [creds, setCreds] = useState({ email: 'alvin@gmail.com', name: 'alvin', userId: 1 });
  const ref = firebase.database().ref('users/');
  const history = useHistory();

  const loginOnClickHandler = () => {
    axios.post(`${BACKEND_URL}/login`, { email, password }, { withCredentials: true }).then((result) => {
      // if user logged in successfully,
      if (result.data.userId) {
        // set the logged in user's id in the app provider
        dispatch(setLoggedInUserIdAction(result.data.userId));

        // take the user to home route
        // console.log(result.data.userName);
        const userIdData = result.data.userId;
        const userNameData = result.data.userName;
        ref.orderByChild('email').equalTo(creds.email).once('value', (snapshot) => {
          if (snapshot.exists()) {
            localStorage.setItem('email', creds.email);
            localStorage.setItem('name', userNameData);
            localStorage.setItem('userId', userIdData);
            history.push('/home');
          } else {
            const newUser = firebase.database().ref('users/').push();
            newUser.set({ name: userNameData, userid: userIdData, email: creds.email });
            localStorage.setItem('name', userNameData);
            localStorage.setItem('userId', userIdData);
            localStorage.setItem('email', creds.email);
            history.push('/home');
          }
        });
      }
    });
  };
  return (
    <div>
      <main>
        <section id="about" className="about">
          <img src="./logo.png" alt="" />
          <div>
            <p>
              Find like-minded friends and save together!
              <br />
              Hangouts? is designed to help ordinary people to
              <br />
              {' '}
              <strong>find new people</strong>
              {' '}
              based on interest to socialise with
              <br />
              {' '}
              and to
              {' '}
              <strong>save more</strong>
              {' '}
              while doing so!
            </p>
            <button type="button" className=" btn btn-success-outline btn">
              {' '}
              <a href="https://youtu.be/s2XQCLUK3yQ"> View App Presentation </a>
            </button>
            {' '}
            <button type="button" className="btn-primary btn" onClick={loginOnClickHandler}> Demo Login </button>
          </div>
        </section>

        <div>
          <div className="services">
            <div className="service__one justify-content-center">
              <p className="service__icon">
                <i className="fas fa-users" />
              </p>
              <p className="service__title">Connect</p>
              <p className="service_title_description">
                Increase your network of friends by joining or creating an activity!
                <br />
                {' '}
                Sometimes a simple activity can lead to endless opportunities and a lifetime of friendship!
              </p>
            </div>
            <div className="service_two">
              <p className="service__icon"><i className="fas fa-comment" /></p>
              <p className="service__title">Discover</p>
              <p className="service_title_description">
                Discover and exchange insights with people who have the same interests, hobbies or beliefs as you!
              </p>
            </div>
            <div className="service__three">
              <p className="service__icon"><i className="fas fa-money-bill-wave" /></p>
              <p className="service__title">Save</p>
              <p className="service_title_description">
                Everyone loves saving money while having a good time!
                <br />
                {' '}
                Use our app today!
              </p>
            </div>
          </div>
        </div>
        <section id="vision">
          <h2>Our Vision</h2>
          <div>
            <p>
              To revolutionize the discovery experience by reinventing community driven platforms by creating sustainable, value-driven ecosystems that connect businesses and people through technology.
            </p>
          </div>
        </section>
        <div id="portofolio" className="gallery">
          <div className="gallery__item__one" />
          <div className="gallery__item__two" />
          <div className="gallery__item__three" />
          <div className="gallery__item__four" />
          <div className="gallery__item__five" />
          <div className="gallery__item__six" />
        </div>
      </main>
    </div>
  );
}
