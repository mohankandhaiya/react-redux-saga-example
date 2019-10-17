import React from "react";
import {Avatar, Button, Comment, Rate, Tooltip} from "antd";
import {connect} from "react-redux";
import { store } from "./store/index"
import actions from "./constants";
import moment from "moment";

class Test extends React.Component{

    componentDidMount(){
        store.dispatch({type: actions.COMMENTS});
        store.dispatch({type: actions.AVERAGE_RATING});
    }

    topics = x =>
        <div className="comments-container flex">
            <img className="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <div className="child-flex">
                <p className="orange-color">{x.Commentor}</p>
                <p className="comments-content">{x.Comments}</p>
                <p>{x.created}</p>
                <Rate className="comments-rate" style={{ fontSize: 14 }} value={x.Ratings} />
                {/*<p>Posted by <span className="orange-color">{x.Username}</span></p>*/}
            </div>
        </div>;

    rating = x =>
        <div>
            <Rate className="margin-bottom" style={{ fontSize: 18 }} value={x.AverageRatings.data.data.avg} />
            <p className="margin-bottom" >({x} Ratings)</p>
            <p className="margin-bottom" >Average stars given.</p>
        </div>;

    render() {
        const Username = this.props.comments;
        const Ratings = this.props.rate;

        return(

            <div className="body-container">
                <div className="center rate-container">
                    { Ratings &&
                       <div>{ Ratings.map(this.rating) }</div>
                    }

                </div>
                <div>
                    <h3 className="reviews-title"> Reviews </h3>
                    { Username &&
                    <div>{ Username.data.data.map(this.topics) }</div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.data.AverageRatings);
    return {
        comments: state.data.Comments,
        rate: state.data
    }
};

export default connect(mapStateToProps)(Test);

// export default Testing