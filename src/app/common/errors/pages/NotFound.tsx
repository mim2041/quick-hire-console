import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <div className="flex gap-4">
            <Button type="primary" onClick={() => navigate('/dashboard')}>
              Back to Home
            </Button>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        }
      />
    </div>
  );
};

export default NotFound;
