import React from 'react';
import DispProfile from '../common/dispProfile/DispProfile';
import DispComment from '../common/dispComments/DispComment';
import Spinner from '../common/spinner/Spinner';
import RatingStar from '../common/rating/RatingStar'
import uuid from 'uuid/v4';
import axios from 'axios';

class ThankYou extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userComments: [],
        fetched: false,
        ratings: 0,
        registrationDate: "",
        expirationDate: "",
        phishtankStatus: "",
        etherscamDb: "",
        trustworthiness: {
          color: "",
          value: ""
        },
        userCommentsToShow: []
      };
    }


    setAnalysisData = data => {
        this.setState({
          userComments: (((data || {}).wot || {}).payload || {}).comments
            ? [...data.wot.payload.comments]
            : [],
          userCommentsToShow: (((data || {}).wot || {}).payload || {}).comments
            ? [...data.wot.payload.comments.slice(0, 2)]
            : [],
          ratings: (
            (((data || {}).general_analysis || {}).payload || {}).ratings || {}
          ).watchdog
            ? ((((data || {}).general_analysis || {}).payload || {}).ratings || {})
                .watchdog
            : "Nothing Found",
    
          registrationDate: (
            (((data || {}).whois || {}).payload || {}).registration || {}
          ).value
            ? ((((data || {}).whois || {}).payload || {}).registration || {}).value
            : "Nothing found",
    
          expirationDate: (
            (((data || {}).whois || {}).payload || {}).expiration || {}
          ).value
            ? ((((data || {}).whois || {}).payload || {}).expiration || {}).value
            : "Nothing found",
    
          phishtankStatus: (
            (((data || {}).phishtank || {}).payload || {}).status || {}
          ).value
            ? ((((data || {}).phishtank || {}).payload || {}).status || {}).value
            : "Nothing found",
          etherscamDb: ((((data || {}).etherscam || {}).payload || {}).status || {})
            .value
            ? ((((data || {}).etherscam || {}).payload || {}).status || {}).value
            : "Nothing found",
    
          trustworthiness: {
            color: ((((data || {}).wot || {}).payload || {}).trust || {}).color
              ? ((((data || {}).wot || {}).payload || {}).trust || {}).color
              : "golden",
            value: ((((data || {}).wot || {}).payload || {}).trust || {}).value
              ? ((((data || {}).wot || {}).payload || {}).trust || {}).value
              : 0
          },
          fetched: true
        });
      };
    
      componentDidMount() {
        axios
          .post("https://watchdog-api-v1.cryptopolice.com/api/verify", {
            domain: this.props.website
          })
          .then(res => {
            this.setAnalysisData(res.data.response);
          })
          .catch(err => {
            this.setState({ fetched: true });
            console.log(err);
          });
      }

      renderProfileCard = () => {
        return (
          <div className="row">
            <div className="col-md-12">
              <DispProfile {...this.props} />
            </div>
          </div>
        );
      };
    
      renderUserComments = () => {
        const { fetched, userCommentsToShow } = this.state;
        return userCommentsToShow.length > 0 ? (
          userCommentsToShow.map(commentData => {
            return (
              <div className="col-md-12 my-2" key={uuid()}>
                <DispComment commentData={commentData} />
              </div>
            );
          })
        ) : !fetched ? (
          <div className="col-md-12 text-center">loading...</div>
        ) : (
          <div className="col-md-12 text-center">No user comments found</div>
        );
      };
    
      renderDomainAdditionalInfo = () => {
        return (
          <div className="row">
            <div className="col-md-6 d-flex">
              <div>
                <p>Domain registration date : {this.state.registrationDate}</p>
                <p>Domain expiration date : {this.state.expirationDate}</p>
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
              <div>
                <p>Phishtank status : {this.state.phishtankStatus}</p>
                <p>Etherscam DB : {this.state.etherscamDb}</p>
              </div>
            </div>
          </div>
        );
      };
    
      renderRatingIndicator = () => {
        return this.state.fetched ? (
          <RatingStar
            rating={Number(this.state.ratings)}
            starRatedColor={this.state.trustworthiness.color}
            starDimension="40px"
            starSpacing="5px"
            numberOfStars={5}
            name="rating"
          />
        ) : null;
      }; 
    
      renderSpinner = () => {
        return (
          <div className="row my-5">
            <div className="col-md-12 text-center">
              <Spinner />
              <Spinner />
              <Spinner />
            </div>
          </div>
        );
      };
    
      renderShowMoreBtn = () => {
        return this.state.userComments.length > 0 ? (
          <div className="row my-2 text-center">
            <div className="col-md-12">
              <div>
                <a
                  href="/"
                  alt="show more"
                  onClick={e => {
                    this.handleShowMoreBtnClick(e);
                  }}
                >
                  {this.state.userComments.length ===
                  this.state.userCommentsToShow.length
                    ? null
                    : "Show more"}
                </a>
              </div>
            </div>
          </div>
        ) : null;
      };
    
      handleShowMoreBtnClick = e => {
        e.preventDefault();
        const { userCommentsToShow, userComments } = this.state;
        const userCommentsLength = userComments.length;
        const userCommentsToShowLength = userCommentsToShow.length;
        if (userCommentsToShowLength === 2) {
          this.setState({
            userCommentsToShow: [
              ...userCommentsToShow,
              ...userComments.slice(
                userCommentsToShowLength,
                userCommentsLength < 10 ? userCommentsLength : 10
              )
            ]
          });
        } else if (userCommentsToShowLength > 2) {
          this.setState({
            userCommentsToShow: [
              ...userCommentsToShow,
              ...userComments.slice(
                userCommentsToShowLength,
                userCommentsLength < userCommentsToShowLength + 10
                  ? userCommentsLength
                  : userCommentsToShowLength + 10
              )
            ]
          });
        }
      };
    
      renderAnalysesInfo = () => {
        return (
          <>
            <div className="text-center mt-3">
              <h5 className="mb-2">
                {this.state.ratings > 2 ? "Low Risk" : "High Risk"}
              </h5>
              {this.renderRatingIndicator()}
            </div>
            {this.renderDomainAdditionalInfo()}
    
            <div className="row">
              <div className="col-md-12 text-center">
                <h4>
                  Trustworthiness:{" "}
                  {this.state.trustworthiness.value !== "Nothing found"
                    ? this.state.trustworthiness.value + " / 5.0"
                    : this.state.trustworthiness.value}
                </h4>
              </div>
            </div>
            <div className="row my-4">{this.renderUserComments()}</div>
            {this.renderShowMoreBtn()}
          </>
        );
      };
    
      render() {
        return (
          <div className="">
            <div className="row">
              <div className="col-md-12">
                <h3 className="text-center mb-4" >
                  Thank you!
                </h3>
              </div>
            </div>
            {this.renderProfileCard(this.props)}
            <div className="row mt-5">
              <div className="col-md-12">
                <div className="text-center">
                  <h4>Your website {this.props.website} analysis</h4>
                </div>
              </div>
            </div>
            <div>
              {this.state.fetched
                ? this.renderAnalysesInfo()
                : this.renderSpinner()}
            </div>
          </div>
        );
      }
    


}

export default ThankYou;