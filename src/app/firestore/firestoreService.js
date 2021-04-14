import cuid from "cuid";
import firebase from "../config/firebase";

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();
  return {
    ...data,
    id: snapshot.id,
    date:
      data["date"] instanceof firebase.firestore.Timestamp
        ? data["date"].toDate()
        : null,
  };
}

export function listenToEventsFromFirestore() {
  return db.collection("events").orderBy("date");
}

export function listenToEventFromFirestore(eventId) {
  return db.collection("events").doc(eventId);
}

export function addEventToFirestore(event) {
  return db.collection("events").add({
    ...event,
    hostedBy: "Diana",
    hostPhotoURL: "https://randomuser.me/api/portraits/women/20.jpg",
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: cuid(),
      displayName: "Diana",
      photoURL: "https://randomuser.me/api/portraits/women/20.jpg",
    }),
  });
}

export function updateEventInFirestore(event) {
  return db.collection("events").doc(event.id).update(event);
}

export function deleteEventInFirestore(eventId) {
  return db.collection("events").doc(eventId).delete();
}

export function cancelEventToggle(event) {
  return db.collection("events").doc(event.id).update({
    isCancelled: !event.isCancelled,
  });
}
