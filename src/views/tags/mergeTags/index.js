import * as React from "react";
import { Table, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import {
  fetchTags,
  setGroupBy,
  setMergeUK,
  setMergeUS,
  setTags,
} from "../../../modules/tags/actions";
class MergeTags extends React.Component {
  /**
   * local state
   */
  state = {
    US: [],
    UK: [],
  };


  /**
   * Render to home component
   */
  renderToHome = () => {
    this.props.history.push("/");
  };

  checkSelected = async (region, id, count, tagName) => {
    await this.setState({
      [region]: this.state[region].concat({
        id,
        region,
        count,
        tagName,
      }),
    });
  };

  mergeSelected = async () => {
    const { tags, mergedUS, mergedUK } = this.props;
    const { US, UK } = this.state;

    let prevTags = tags;

    if (US.length > 1) {
      for (var i = 0; i < US.length; i++) {
        for (var j = 0; j < prevTags.length; j++) {
          for (var k = 0; k < prevTags[j].tags.length; k++) {
            if (prevTags[j].tags[k]._id === US[i].id) {
              prevTags[j].tags.splice(k, 1);
            }
          }
        }
      }
      await this.props.setMergeUS(US);
    }

    if (UK.length > 1) {
      for (var a = 0; a < US.length; a++) {
        for (var b = 0; b < prevTags.length; b++) {
          for (var c = 0; c < prevTags[b].tags.length; c++) {
            if (prevTags[b].tags[c]._id === UK[a].id) {
              prevTags[b].tags.splice(c, 1);
            }
          }
        }
      }

      await this.props.setMergeUK(UK);
    }

    setTimeout(() => {
      this.props.setTags(prevTags);
      this.renderToHome();
    }, 300);
  };

  /**
   * renders html
   */
  render() {
    const { tags, groupBy } = this.props;
    return (
      <div
        style={{
          left: "30%",
          right: "30%",
          position: "absolute",
        }}
      >
        <Button onClick={this.renderToHome} variant="primary">
          Back to Home
        </Button>

        <Button
          style={{ right: "3px", position: "absolute" }}
          onClick={this.mergeSelected}
          variant="primary"
        >
          Merge Selected
        </Button>

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
                    <th></th>
                    <th>Keywords</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {tag.tags !== undefined &&
                    tag.tags.map((item, j) => (
                      <tr key={j}>
                        <td>
                          <Form.Group controlId="formBasicCheckbox">
                            <Form.Check
                              type="checkbox"
                              onChange={() =>
                                this.checkSelected(
                                  tag.region,
                                  item._id,
                                  item.count,
                                  item.tagName
                                )
                              }
                            />
                          </Form.Group>
                        </td>
                        <td>{item.tagName}</td>
                        <td>{item.count}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          ))}
        {groupBy === "tags" && (
          <div>This view is available when group by websites selected.</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tags: state.tags.tags,
  groupBy: state.tags.groupBy,
  mergedUS: state.tags.mergedUS,
  mergedUK: state.tags.mergedUK,
});

export default connect(mapStateToProps, {
  fetchTags,
  setGroupBy,
  setMergeUS,
  setMergeUK,
  setTags,
})(MergeTags);
