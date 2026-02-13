import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  Paper,
  CardActionArea,
  CardMedia,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
  Typography
} from "@material-ui/core";
import image from "./bg.png";
import { DropzoneArea } from "material-ui-dropzone";
import { common } from "@material-ui/core/colors";
import Clear from "@material-ui/icons/Clear";

const axios = require("axios").default;

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    "&:hover": {
      backgroundColor: "#ffffff7a",
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
  },
  media: {
    height: 400,
  },
  gridContainer: {
    justifyContent: "center",
    padding: "2em 1em",
  },
  mainContainer: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100vh",
  },
  imageCard: {
    margin: "auto",
    maxWidth: 400,
    height: 500,
    backgroundColor: "transparent",
    boxShadow: "0px 9px 70px 0px rgb(0 0 0 / 30%) !important",
    borderRadius: "15px",
  },
  imageCardEmpty: {
    height: "auto",
  },
  tableCell: {
    fontSize: "22px",
    border: "none",
    fontWeight: "bolder",
  },
  tableCell1: {
    fontSize: "14px",
    border: "none",
    fontWeight: "bolder",
  },
  detail: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  loader: {
    color: "#be6a77 !important",
  },
}));

export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [imageSelected, setImageSelected] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const sendFile = async () => {
    if (imageSelected) {
      let formData = new FormData();
      formData.append("file", selectedFile);

      let res = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/predict",
        data: formData,
      });

      if (res.status === 200) {
        setData(res.data);
      }
      setIsloading(false);
    }
  };

  const clearData = () => {
    setData(null);
    setImageSelected(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) return;
    setIsloading(true);
    sendFile();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImageSelected(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImageSelected(true);
  };

  let confidence = data
    ? (parseFloat(data.confidence) * 100).toFixed(2)
    : 0;

  return (
    <Container
      maxWidth={false}
      className={classes.mainContainer}
      disableGutters
    >
      <Grid
        className={classes.gridContainer}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Card
            className={`${classes.imageCard} ${
              !imageSelected ? classes.imageCardEmpty : ""
            }`}
          >
            {imageSelected && (
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={preview}
                  component="img"
                />
              </CardActionArea>
            )}

            {!imageSelected && (
              <CardContent>
                <DropzoneArea
                  acceptedFiles={["image/*"]}
                  dropzoneText={
                    "Drag and drop an image of a potato plant leaf to process"
                  }
                  onChange={onSelectFile}
                />
              </CardContent>
            )}

            {data && (
              <CardContent className={classes.detail}>
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableCell1}>
                          Label:
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.tableCell1}
                        >
                          Confidence:
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          {data.class}
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.tableCell}
                        >
                          {confidence}%
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            )}

            {isLoading && (
              <CardContent className={classes.detail}>
                <CircularProgress
                  color="secondary"
                  className={classes.loader}
                />
                <Typography variant="h6">Processing</Typography>
              </CardContent>
            )}
          </Card>
        </Grid>

        {data && (
          <Grid item style={{ maxWidth: "416px", width: "100%" }}>
            <ColorButton
              variant="contained"
              className={classes.clearButton}
              onClick={clearData}
              startIcon={<Clear fontSize="large" />}
            >
              CLEAR
            </ColorButton>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
