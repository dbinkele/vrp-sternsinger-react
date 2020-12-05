import React, { memo } from "react";
import { Button, Grid } from "@material-ui/core";

const AddTodo = memo(props => (

    <Grid container>
      <Grid xs={2} md={1} item>
        <Button
          fullWidth
          color="secondary"
          variant="outlined"
          onClick={props.onButtonClick}
        >
          Add
        </Button>
      </Grid>
    </Grid>
));

export default AddTodo;
