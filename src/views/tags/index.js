import * as React from "react";
import { Table, Form, Button } from "react-bootstrap";

import { connect } from "react-redux";
import { fetchTags, setGroupBy } from "../../modules/tags/actions";
class Tag extends React.Component {
  /**
   * local state
   */
  state = {};

  /**
   * Component mounts
   */
  async componentDidMount() {
    await this.props.fetchTags();
  }

  updateGroupBy = async (e) => {
    await this.props.setGroupBy(e.target.value);
    await this.props.fetchTags();
  };

  /**
   * Render to merge component
   */
  renderToMerge = () => {
    this.props.history.push("/mergeTags");
  }

  /**
   * renders html
   */
  render() {
    const { tags, groupBy, mergedUS } = this.props;
    return (
      <div
        style={{
          left: "30%",
          right: "30%",
          position: "absolute",
        }}
      >
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Group By</Form.Label>
          <Form.Control as="select" value={groupBy} onChange={this.updateGroupBy}>
            <option value="webSites">Websites</option>
            <option value="tags">Tags</option>
          </Form.Control>
        </Form.Group>
        <Button onClick={this.renderToMerge} variant="primary">Go to Merge Screen</Button>

        <br />
        {groupBy === "webSites" &&
          tags.length > 0 &&
          tags.map((tag, i) => (
            <div key={i}>
              <span>
                <strong>{tag.region}</strong>
              </span>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Keywords</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {tag.tags !== undefined &&
                    tag.tags.map((item, j) => (
                      <tr key={j}>
                        <td>{item.tagName}</td>
                        <td>{item.count}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          ))}
        {groupBy === "tags" && tags.length > 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Keywords</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag, i) => (
                <tr key={i}>
                  <td>{tag.tagName}</td>
                  <td>{tag.count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {mergedUS.length > 0 && (
          <div>
            <span>
                <strong>US Merge</strong>
            </span>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Keywords</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {mergedUS.map((tag, i) => (
                <tr key={i}>
                  <td>{tag.tagName}</td>
                  <td>{tag.count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tags: state.tags.tags,
  groupBy: state.tags.groupBy,
  mergedUS: state.tags.mergedUS
});

export default connect(mapStateToProps, { fetchTags, setGroupBy })(Tag);
