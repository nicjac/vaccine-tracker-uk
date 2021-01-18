import React from "react";
import { Card, Icon } from "semantic-ui-react";

const GenericContainer = ({
  ChildComponent,
  title,
  description,
  dateUpdated,
}) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{description}</Card.Meta>
        <Card.Description>{ChildComponent}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="database" />
        Data Source: Public Health England (Updated {dateUpdated})
      </Card.Content>
    </Card>
  );
};

export default GenericContainer;
