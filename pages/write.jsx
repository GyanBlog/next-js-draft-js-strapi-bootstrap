import SimpleLayout from '../components/layout/simple'
import React, { Component } from 'react'
import EditArticle from '../components/editor/editArticle'

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      body: null
    };
  }

  render() {
    return (
      <SimpleLayout>
      <div className="row">
        <div className="col-8">
          <EditArticle 
            article={this.state}
          />
        </div>
        <div className="col-4">
          Another col
        </div>
      </div>
    </SimpleLayout>
    )
  }
}
export default Write;

