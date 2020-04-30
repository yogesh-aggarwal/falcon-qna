import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import * as tools from "../../tools";
import { gql } from "apollo-boost";

class NewQuestionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      tags: [],
      titleError: false,
      titleFocus: false,
      titleBlur: false,
      bodyError: false,
      blurFocus: false,
      blurBlur: false,
      tagOptions: ["FirstQuestion", "FirstQuesstion", "FirsstQuestion"],
      showFormErrorSnackbar: false,
      showQuestionErrorSnackbar: false,
      showQuestionSubmitingSnackbar: false,
      showQuestionSubmitedSnackbar: false,
    };
  }

  submitQuestion() {
    this.setState({ showQuestionSubmitingSnackbar: true });
    this.setState({ tags: this.state.tags.map((tag) => `"${tag}"`) });
    tools.client
      .mutate({
        mutation: gql`
          mutation {
            createQuestion(
              args: {
                title: "${this.state.title}"
                body: "${this.state.body}"
                tags: "${this.state.tags}"
                owner: "${tools.currentUser._id}"
              }
            )
          }
        `,
      })
      .then(({ loading, error, data }) => {
        if (error) this.setState({ showQuestionSubmitedSnackbar: true });
        else if (data) {
          this.setState({ showQuestionSubmitingSnackbar: false });
          this.setState({ showQuestionSubmitedSnackbar: false });
          this.props.history.push(`/questions/${data["createQuestion"]}`);
        }
      })
      .catch((err) => {
        this.setState({ showQuestionSubmitingSnackbar: false });
        this.setState({ showQuestionErrorSnackbar: true });
      });

    // useHistory().push("/question");
  }

  formErrorSnackbar() {
    return (
      <Snackbar
        open={this.state.showFormErrorSnackbar}
        autoHideDuration={5000}
        onClose={() => {
          this.setState({ showFormErrorSnackbar: false });
        }}
      >
        <Alert elevation={4} severity="error">
          Please fill your question details correctly.
        </Alert>
      </Snackbar>
    );
  }

  questionErrorSnackbar() {
    return (
      <Snackbar
        open={this.state.showQuestionErrorSnackbar}
        autoHideDuration={5000}
        onClose={() => {
          this.setState({ showQuestionErrorSnackbar: false });
        }}
      >
        <Alert elevation={4} severity="error">
          Your Question was not submited.
        </Alert>
      </Snackbar>
    );
  }

  questionSubmitingSnackbar() {
    return (
      <Snackbar
        open={this.state.showQuestionSubmitingSnackbar}
        onClose={() => {
          this.setState({ showQuestionSubmitingSnackbar: false });
        }}
      >
        <Alert elevation={4} severity="info">
          Submitting your question
        </Alert>
      </Snackbar>
    );
  }

  questionSubmitedSnackbar() {
    return (
      <Snackbar
        open={this.state.showQuestionSubmitedSnackbar}
        onClose={() => {
          this.setState({ showQuestionSubmitedSnackbar: false });
        }}
      >
        <Alert elevation={4} severity="success">
          Your Question is Live now
        </Alert>
      </Snackbar>
    );
  }

  render() {
    return (
      <Container size="sm" style={{ marginTop: "2rem" }}>
        <Typography variant="h5">
          <Box fontWeight={800}>ASK YOUR QUESTION</Box>
        </Typography>
        <TextField
          error={this.state.titleError}
          id="outlined-multiline-flexible"
          label="Your Question"
          variant="outlined"
          fullWidth
          autoFocus
          autoCapitalize
          autoCorrect
          onChange={(e) => {
            this.setState({ title: e.target.value });
          }}
          onFocus={() => {
            this.setState({ titleFocus: true });
          }}
          onBlur={(e) => {
            e.target.value.replace(" ", "")
              ? this.setState({ titleError: false })
              : this.setState({ titleError: true });
          }}
          style={{ marginTop: "2rem" }}
        />
        <TextField
          error={this.state.bodyError}
          id="outlined-multiline-flexible"
          label="Describe your question in detail"
          multiline
          variant="outlined"
          fullWidth
          autoCapitalize
          autoCorrect
          onChange={(e) => {
            this.setState({ body: e.target.value });
          }}
          onFocus={() => {
            this.setState({ bodyFocus: true });
          }}
          onBlur={(e) => {
            e.target.value.replace(" ", "")
              ? this.setState({ bodyError: false })
              : this.setState({ bodyError: true });
          }}
          style={{ marginTop: "1.5rem" }}
        />
        <Autocomplete
          multiple
          options={this.state.tagOptions}
          onChange={(event, value) => this.setState({ tags: value })}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Attach tags for best answers"
              placeholder="Question topics"
            />
          )}
          style={{ marginTop: "1.5rem" }}
        />
        <Button
          color="primary"
          style={{ marginTop: "2rem" }}
          variant="contained"
          onClick={() => {
            if (this.state.titleError || this.state.bodyError)
              this.setState({ showFormErrorSnackbar: true });
            else {
              this.submitQuestion();
            }
          }}
        >
          Ask from public
        </Button>
        {this.formErrorSnackbar()}
        {this.questionErrorSnackbar()}
        {this.questionSubmitingSnackbar()}
        {this.questionSubmitedSnackbar()}
      </Container>
    );
  }
}

export default NewQuestionComponent;
