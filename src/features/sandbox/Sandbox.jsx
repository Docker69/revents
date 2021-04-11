import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";
import TestPlaceInput from "./TestInputPlaces";
import TestMap from "./TestMap";
import { decrement, increment } from "./testReducer";

export default function Sandbox() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.test.data);
  
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  const [mapProps, setMapProps] = useState(defaultProps);

  return (
    <>
      <h1>Testing 123</h1>
      <h3>The data is: {data}</h3>
      <Button
        onClick={() => dispatch(increment(4))}
        color='green'
        content='Increment'
      />
      <Button
        onClick={() => dispatch(decrement(3))}
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
      <div style={{marginTop: 15}}>
        <TestPlaceInput setMapProps={setMapProps}/>
        <TestMap mapProps={mapProps}/>
      </div>
    </>
  );
}
