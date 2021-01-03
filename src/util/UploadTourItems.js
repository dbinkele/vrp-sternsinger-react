import React, {createRef, Fragment, useCallback} from 'react';
import {useDropzone} from "react-dropzone";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {refreshTourItemAction} from "../modules/tourItemsActions";

const Upload = () => {

    const dispatch = useDispatch();
    //const items = useSelector(state => state.tourItemsReducer.tourItems);

    const dropzoneRef = createRef();
    const openDialog = () => {
        // Note that the ref is set async,
        // so it might be null at some point
        if (dropzoneRef.current) {
            dropzoneRef.current.open()
        }
    };
    const maxSize = 1048576;

    const onDrop = useCallback(acceptedFiles => {
        const reader = new FileReader()
        reader.onloadend =  (file) => {
            let content = reader.result;
            console.log("-------> result");
            console.log(content);
            dispatch(refreshTourItemAction(JSON.parse(content)));
        };
        reader.readAsText(acceptedFiles[0])
    }, []);

    const {isDragActive, getRootProps, getInputProps, isDragReject, acceptedFiles, rejectedFiles} = useDropzone({
        onDrop,
        accept: 'application/json',
        minSize: 0,
        maxSize,
    });

    const isFileTooLarge = !!rejectedFiles && rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

    return (
        <div className="upload-dropzone">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>
                    {!isDragActive && 'Click here or drop a file to upload!'}
                    {isDragActive && !isDragReject && "Drop it like it's hot!"}
                    {isDragReject && "File type not accepted, sorry!"}
                    {isFileTooLarge && (
                        <div className="text-danger mt-2">
                            File is too large.
                        </div>
                    )}
                </p>
                <Button
                    color="secondary"
                    variant="outlined"
                    onClick={openDialog}
                >
                    Open File Dialog
                </Button>
            </div>
        </div>)
}

export default Upload;