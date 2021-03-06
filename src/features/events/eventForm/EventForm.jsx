/* global google */
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Confirm, Header, Segment } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { listenToSelectedEvent, clearSelectedEvent } from "../eventActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MytextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyPlaceInput from "../../../app/common/form/MyPlaceInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {
  addEventToFirestore,
  listenToEventFromFirestore,
  updateEventInFirestore,
  cancelEventToggle,
} from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";

export default function EventForm({ match, history, location }) {
  const dispatch = useDispatch();
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { selectedEvent } = useSelector((state) => state.event);
  const { loading, error } = useSelector((state) => state.async);

  useEffect(() => {
    if (location.pathname !== '/createEvent') return;
    dispatch(clearSelectedEvent());
  }, [dispatch, location.pathname])

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: { address: "", latLng: null },
    venue: { address: "", latLng: null },
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Event title must be provided"),
    category: Yup.string().required("Event category must be provided"),
    description: Yup.string().required("Event description must be provided"),
    city: Yup.object().shape({
      address: Yup.string().required("Event city must be provided"),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required("Event venue must be provided"),
    }),
    date: Yup.string().required("Event date must be provided"),
  });

  async function handleCancelToggle(event) {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(false);
      toast.error(error.message);
    }
  }

  useFirestoreDoc({
    shouldExecute: match.params.id !== selectedEvent?.id && location.pathname !== '/createEvent',
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToSelectedEvent(event)),
    deps: [match.params.id, dispatch],
  });

  if (loading) return <LoadingComponent content='Loading event ...' />;

  if (error) return <Redirect to='/error' />;

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("==> handleFormSubmit");

          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : addEventToFirestore(values);
            setSubmitting(false);
            history.push("/events");
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className='ui form'>
            <Header sub color='teal' content='Event Details' />
            <MyTextInput name='title' placeholder='Event title' />
            <MySelectInput
              name='category'
              placeholder='Event category'
              options={categoryData}
            />
            <MyTextArea
              name='description'
              placeholder='Event description'
              rows={3}
            />
            <Header sub color='teal' content='Event Location Details' />
            <MyPlaceInput name='city' placeholder='Event city' />
            <MyPlaceInput
              name='venue'
              disabled={!values.city.latLng}
              placeholder='Event venue'
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                type: ["establishment"],
              }}
            />
            <MyDateInput
              name='date'
              placeholderText='Event date'
              timeFormat='HH:mm'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm a'
              autoComplete='off'
            />
            {selectedEvent && (
              <Button
                loading={loadingCancel}
                type='button'
                floated='left'
                color={selectedEvent.isCancelled ? "green" : "red"}
                content={
                  selectedEvent.isCancelled
                    ? "Reactivate Event"
                    : "Cancel Event"
                }
                onClick={() => setConfirmOpen(true)}
              />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              positive
              floated='right'
              content='Submit'
            />
            <Button
              as={Link}
              to='/events'
              type='submit'
              floated='right'
              content='Cancel'
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
      <Confirm
        content={
          selectedEvent?.isCancelled
            ? "Reactivate the Event?"
            : "Cancel the Event?"
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
  );
}
