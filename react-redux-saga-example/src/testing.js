import React from "react";
import {Avatar, Button, Comment, Tooltip} from "antd";
import {connect} from "react-redux";
import { store } from "./store/index"
import actions from "./constants";
import moment from "moment";

class Testing extends React.Component{

    // axios.put(`/api/product/update/${id}`,
    //     {
    //     category: newData[index].category,
    //     productname: newData[index].productname,
    //     os: newData[index].os,
    //     serialnumber: newData[index].serialnumber,
    //     model: newData[index].model,
    //     price: newData[index].price,
    //     equipment_condition: newData[index].equipment_condition,
    //     detail: newData[index].detail,
    //     image: newData[index].image
    //     })

// <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
// Edit
// </a>

    person = (x, i) => {
        return  <div key={x.objectId}>
            <h1>
                {x.Developer}
            </h1>
            <h1>
                {x.Description}
            </h1>
            <h1>
                {x.objectId}
            </h1>
        </div>;
    };

    handleSubmit = () => {
        store.dispatch({ type: 'AVERAGE_RATING' });
        return this.props.history.push("/categories/topics/comment/")
    };

    editTopics = () => {
        // this.props.history.push("/categories/topics/comment");
        store.dispatch({type: actions.AVERAGE_RATING});
    };

    topics = x =>
         <div key={x.Username}>
            <p>name:{x.Username}</p>
            <p>age:{x.Comments}</p>;
         </div>;

    username = (x) => {
        return ( { author: x.Username })
    };

    render() {
        const Username = this.props.user;

        return(
            <div>
                <Button onClick={() => (this.editTopics())}>Click me</Button>
                {/*{ Username &&*/}
                {/*<Comment*/}
                {/*    { Username.data.data.map(this.topics) }*/}
                {/*    avatar={*/}
                {/*        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />*/}
                {/*    }*/}
                {/*    // content={Username.data.data.map(this.topics)}*/}
                {/*    datetime={*/}
                {/*        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>*/}
                {/*            <span>{moment().fromNow()}</span>*/}
                {/*        </Tooltip>*/}
                {/*    }*/}
                {/*/>*/}
                {/*}*/}

            </div>
        )

        // return (
        //     <div>
        //     <Button onClick={() => (this.editTopics())}>Click me</Button>
        // { Username &&
        //     <p>
        //         { Username.data.data.map(this.topics) }
        //     </p>
        // }
        //     </div>
        // )
    }
}

const mapStateToProps = state => {
    console.log(state.data.user);
        return {
        user: state.data.user

    }
};

export default connect(mapStateToProps)(Testing);

// export default Testing