import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Stars extends React.Component {
  constructor(){
    super()
    this.addStars = this.addStars.bind(this);
    this.addScore = this.addScore.bind(this);
  }
  state={
    stars: false
  }

  addStars(event){
    this.setState({stars:event.target.value})
  }

  async addScore(){
    const { id } = this.props;
    const url = 'http://localhost:5000/method/score/' + id;
    const {userId} = this.props;
    const score = this.state.stars;
    await fetch(url, { 
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ userId, score })
    })
    this.props.history.push(`/method/${id}`);
  }

  render() {
    return (
      <>
        <form class="rating" onSubmit={this.addScore}>
          <div>
          <label>
            <input type="radio" name="stars" value="1" onChange={this.addStars}/>
            <span class="icon">★</span>
          </label>
          <label>
            <input type="radio" name="stars" value="2" onChange={this.addStars}/>
            <span class="icon">★</span>
            <span class="icon">★</span>
          </label>
          <label>
            <input type="radio" name="stars" value="3" onChange={this.addStars}/>
            <span class="icon">★</span>
            <span class="icon">★</span>
            <span class="icon">★</span>
          </label>
          <label>
            <input type="radio" name="stars" value="4"  onChange={this.addStars}/>
            <span class="icon">★</span>
            <span class="icon">★</span>
            <span class="icon">★</span>
            <span class="icon">★</span>
          </label>
          <label>
            <input type="radio" name="stars" value="5"  onChange={this.addStars}/>
            <span class="icon">★</span>
            <span class="icon">★</span>
            <span class="icon">★</span>
            <span class="icon">★</span>
            <span class="icon">★</span>
          </label>
          </div>
          { this.state.stars && <button type="submit" className="edit">Оценить</button> }
        </form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.userId
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Stars));
