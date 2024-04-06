import React from "react";
import { Dialog } from "@material-tailwind/react";
import EventForm from "./EventForm";


const CreateEvent = ({open, handleOpen}) => {
    return (
        <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        onScroll={true}
        >
            <EventForm />
        </Dialog>
    );
};

export default CreateEvent;

