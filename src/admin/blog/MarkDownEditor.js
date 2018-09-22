import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup } from 'reactstrap';

class MarkDownEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPreview: false
    };

    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(event) {
    const text = event.target.value;
    this.props.onChangeValue(text);
  }

  handlePreview(state) {
    this.setState({ showPreview: state });
  }

  render() {
    return (
      <main style={{ border: '1px solid #a9a9a9' }}>
        <div className="toolbar" style={{ height: '40px', padding: '5px' }}>
          <p className="float-left">
            <FormattedMessage
              id="format_text_with"
              defaultMessage="Format the text with"
            />{' '}
            <Link to="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">
              Markdown
            </Link>
          </p>
          <div className="tabs float-right">
            <ButtonGroup>
              <Button
                active={!this.state.showPreview}
                onClick={e => this.handlePreview(false)}
              >
                <FormattedMessage id="editor" defaultMessage="Editor" />
              </Button>
              <Button
                active={this.state.showPreview}
                onClick={e => this.handlePreview(true)}
              >
                <FormattedMessage id="preview" defaultMessage="Preview" />
              </Button>
            </ButtonGroup>
          </div>
        </div>
        {!this.state.showPreview ? (
          <section>
            <textarea
              style={{
                border: '1px solid rgba(0,0,0, 0.2)',
                margin: '10px',
                width: '98%',
                height: '200px'
              }}
              value={this.props.text}
              onInput={this.handleEdit}
            />
          </section>
        ) : (
          <section>
            <div
              style={{
                border: '1px solid rgba(0,0,0, 0.2)',
                margin: '10px',
                width: '98%',
                height: '200px'
              }}
            >
              <ReactMarkdown source={this.props.text} escapeHtml={true} />
            </div>
          </section>
        )}
      </main>
    );
  }
}

export default MarkDownEditor;
