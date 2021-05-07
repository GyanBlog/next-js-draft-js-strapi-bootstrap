import React, { Component } from 'react'
import apiClient from '../api/api_client'
import { Form, Button, Card } from 'react-bootstrap';
import { withRouter } from 'next/router'
import ArticleEditor from '../editor/editor'

class EditArticle extends Component {
  constructor(props) {
    super(props);
    console.log('editarticle', props);
    this.state = {
      id: props.article.id || null,
      title: props.article.title || "",
      body: props.article.body || null,
      isNew: props.article.body ? false : true,

      // this is to make sure we dont do stringify again
      articleUpdated: false
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleInputs = (event) => {
    let {name, value} = event.target
    this.setState({
      [name]: value
    });
  }
  handleEditorContent = (content) => {
    this.setState({
      body: content,
      articleUpdated: true
    });
  }

  submitForm = async (event) => {
    event.preventDefault()
    let article;
    if (this.state.isNew) {
      article = await apiClient.saveArticle({
        title: this.state.title,
        body: JSON.stringify(this.state.body)
      })
    }
    else {
      let articleContent = this.state.body;
      if (this.state.articleUpdated) {
        articleContent = JSON.stringify(articleContent);
      }
      article = await apiClient.updateArticle({
        id: this.state.id,
        title: this.state.title,
        body: articleContent
      })
    }
    this.props.router.push(`/articles/${article.slug}`);
  }

  render() {
    return (
        <Form onSubmit={this.submitForm}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Headline</Form.Label>
            <Form.Control type="text" 
              name="title"
              value={this.state.title}
              onChange={this.handleInputs} />
            <Form.Text className="text-muted">
              Give a nice title to your article
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea2">
            <Form.Label>Body</Form.Label>
            <Card className="p-2">
              <ArticleEditor 
                handleContent={this.handleEditorContent}
                initialContent={this.state.body}
                />
            </Card>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
    )
  }
}

export default withRouter(EditArticle);