import React from "react";
import DefaultLayout from "../layout/DefaultLayout";
import EventForm from "../components/produitEvent/EventForm";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";

const UpdateEvent = ()=>{
    return(
        <DefaultLayout>
            <EventForm>
                <Breadcrumb pageName="Modifier l'évènement" />
            </EventForm>
        </DefaultLayout>
    )
}

export default UpdateEvent;