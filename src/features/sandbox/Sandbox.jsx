import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";
import TestPlaceInput from "./TestInputPlaces";
import TestMap from "./TestMap";
import { decrement, increment } from "./testReducer";

export default function Sandbox() {
  const dispatch = useDispatch();
  const [target, setTarget] = useState(null);
  const data = useSelector((state) => state.test.data);
  const { loading } = useSelector((state) => state.async);

  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  const [mapProps, setMapProps] = useState(defaultProps);

  return (
    <>
      <h1>Testing 123</h1>
      <h3>The data is: {data}</h3>
      <Button
        name='increment'
        loading={loading && target === "increment"}
        onClick={(e) => {
          dispatch(increment(4));
          setTarget(e.target.name);
        }}
        color='green'
        content='Increment'
      />
      <Button
        name='decrement'
        loading={loading && target === "decrement"}
        onClick={(e) => {
          dispatch(decrement(3));
          setTarget(e.target.name);
        }}
        color='red'
        content='Decrement'
      />
      <Button
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", modalProps: { data } }))
        }
        color='teal'
        content='Open Modal'
      />
      <div style={{ marginTop: 15 }}>
        <TestPlaceInput setMapProps={setMapProps} />
        <TestMap mapProps={mapProps} />
      </div>
    </>
  );
}
