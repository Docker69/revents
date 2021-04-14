import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";

export default function ErrorComponent() {
  const { error } = useSelector((state) => state.async);
  return (
    <Segment placeholder>
      <Header
        textAlign='center'
        content={error?.message || "We have a small problem"}
      />
      <Button
        primary
        as={Link}
        to='/events'
        style={{ marginTop: 20 }}
        content='Back to Events'
      />
    </Segment>
  );
}
