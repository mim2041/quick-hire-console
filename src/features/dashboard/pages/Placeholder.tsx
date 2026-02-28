import React from "react";
import { Card, Typography } from "antd";
import { useParams } from "react-router-dom";

const { Title, Paragraph } = Typography;

const Placeholder: React.FC = () => {
  const params = useParams();
  const page = params.page ?? "this section";

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Coming Soon</Title>
      <Card>
        <Paragraph>
          The section <b>{page}</b> is not implemented yet. Use this placeholder
          route to scaffold the feature and replace it with the final page when
          ready.
        </Paragraph>
      </Card>
    </div>
  );
};

export default Placeholder;
