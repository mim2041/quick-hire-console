import React, { useState, useEffect } from "react";
import { Modal, Typography, Button, Row, Col, Card } from "antd";
import {
  UploadOutlined,
  FormOutlined,
  FileTextOutlined,
  BarChartOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../core/store/rootReducer";
import { routes } from "../../config/routes";

const { Title, Text } = Typography;

interface WelcomeModalProps {
  visible: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ visible, onClose }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  console.log("user", user);
  const [showWelcome, setShowWelcome] = useState(false);

  const userRole = user?.role?.toLowerCase() || "";
  const isReviewer = userRole === "reviewer";
  const isStakeholder = userRole === "stakeholder";
  const isContributor = userRole === "contributor";
  const isAdmin = userRole === "admin";

  // Show welcome modal after a short delay to ensure smooth transition
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowWelcome(false);
    }
  }, [visible]);

  const handleNavigateToFileUpload = () => {
    navigate("/dashboard/upload/file");
    onClose();
  };

  const handleNavigateToManualUpload = () => {
    navigate("/dashboard/upload/manual");
    onClose();
  };

  const handleNavigateToRequests = () => {
    navigate("/dashboard/requests");
    onClose();
  };

  const handleNavigateToExports = () => {
    navigate("/dashboard/exports");
    onClose();
  };

  const handleNavigateToDashboard = () => {
    navigate(routes.dashboard.root);
    onClose();
  };

  const renderDataUploadMethods = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Title level={3} className="mb-2">
          Welcome to Data on Deck! 🎉
        </Title>
        <Text className="text-gray-600 text-base">
          Get started by uploading your data using one of these methods:
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card
            hoverable
            className="h-full border-2 hover:border-primary transition-all duration-200 flex flex-col"
            onClick={handleNavigateToFileUpload}
          >
            <div className="text-center space-y-4 flex flex-col h-full">
              <div className="flex justify-center">
                <UploadOutlined className="text-4xl! text-primary" />
              </div>
              <Title level={4} className="mb-2">
                File Upload
              </Title>
              <Text className="text-gray-600 block flex-grow">
                Upload Excel or CSV files for automated data processing and
                AI-powered mapping
              </Text>
              <Button type="primary" size="large" className="w-full mt-auto">
                Upload File
              </Button>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            hoverable
            className="h-full border-2 hover:border-green-400 transition-all duration-200 flex flex-col"
            onClick={handleNavigateToManualUpload}
          >
            <div className="text-center space-y-4 flex flex-col h-full">
              <div className="flex justify-center">
                <FormOutlined className="text-4xl text-green-500" />
              </div>
              <Title level={4} className="mb-2">
                Manual Entry
              </Title>
              <Text className="text-gray-600 block flex-grow">
                Enter metric data manually through structured forms with
                validation
              </Text>
              <Button type="primary" size="large" className="w-full mt-auto">
                Manual Entry
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderReviewerContent = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Title level={3} className="mb-2">
          Welcome back, Reviewer! 👋
        </Title>
        <Text className="text-gray-600 text-base">
          Here's what you can do to manage metric requests and reviews:
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card
            hoverable
            className="h-full border-2 hover:border-orange-400 transition-all duration-200 flex flex-col"
            onClick={handleNavigateToRequests}
          >
            <div
              className="text-center space-y-4 flex flex-col h-full"
              style={{ minHeight: 260 }}
            >
              <div className="flex justify-center">
                <FileTextOutlined className="text-4xl text-orange-500" />
              </div>
              <Title level={4} className="mb-2">
                Review Requests
              </Title>
              <Text className="text-gray-600 block flex-grow">
                Review and approve metric requests from stakeholders
              </Text>
              <Button type="primary" size="large" className="w-full mt-auto">
                View Requests
              </Button>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            hoverable
            className="h-full border-2 hover:border-purple-400 transition-all duration-200 flex flex-col"
            onClick={handleNavigateToExports}
          >
            <div
              className="text-center space-y-4 flex flex-col h-full"
              style={{ minHeight: 260 }}
            >
              <div className="flex justify-center">
                <BarChartOutlined className="text-4xl text-purple-500" />
              </div>
              <Title level={4} className="mb-2">
                View Exports
              </Title>
              <Text className="text-gray-600 block flex-grow">
                Access export functionality and data analytics
              </Text>
              <Button type="primary" size="large" className="w-full mt-auto">
                Go to Exports
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <CheckCircleOutlined className="text-primary text-lg mt-1" />
          <div>
            <Text className="font-medium text-primary block mb-1">
              Quick Actions Available:
            </Text>
            <ul className="text-primary text-sm space-y-1">
              <li>• Review pending metric requests</li>
              <li>• Approve or reject submissions</li>
              <li>• View submission history and audit trails</li>
              <li>• Export data for reporting</li>
            </ul>
          </div>
        </div>
      </div> */}
    </div>
  );

  const renderGenericWelcome = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Title level={3} className="mb-2">
          Welcome to Data on Deck! 🎉
        </Title>
        <Text className="text-gray-600 text-base">
          You're all set! Here's what you can do next:
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card
            hoverable
            className="h-full border-2 hover:border-primary transition-all duration-200 flex flex-col"
            onClick={handleNavigateToFileUpload}
          >
            <div className="text-center space-y-4 flex flex-col h-full">
              <div className="flex justify-center">
                <UploadOutlined className="text-3xl text-primary" />
              </div>
              <Title level={5} className="mb-2">
                Upload Data
              </Title>
              <Text className="text-gray-600 text-sm block flex-grow">
                Upload your data files
              </Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            hoverable
            className="h-full border-2 hover:border-green-400 transition-all duration-200 flex flex-col"
            onClick={handleNavigateToRequests}
          >
            <div className="text-center space-y-4 flex flex-col h-full">
              <div className="flex justify-center">
                <FileTextOutlined className="text-3xl text-green-500" />
              </div>
              <Title level={5} className="mb-2">
                View Requests
              </Title>
              <Text className="text-gray-600 text-sm block flex-grow">
                Manage metric requests
              </Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            hoverable
            className="h-full border-2 hover:border-purple-400 transition-all duration-200 flex flex-col"
            onClick={handleNavigateToDashboard}
          >
            <div className="text-center space-y-4 flex flex-col h-full">
              <div className="flex justify-center">
                <BarChartOutlined className="text-3xl text-purple-500" />
              </div>
              <Title level={5} className="mb-2">
                Dashboard
              </Title>
              <Text className="text-gray-600 text-sm block flex-grow">
                View analytics
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      <div className="text-center">
        <Button type="primary" size="large" onClick={handleNavigateToDashboard}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );

  const getModalContent = () => {
    if (isReviewer) {
      return renderReviewerContent();
    } else if (isStakeholder || isContributor || isAdmin) {
      return renderDataUploadMethods();
    } else {
      return renderGenericWelcome();
    }
  };

  return (
    <Modal
      title={null}
      open={visible && showWelcome}
      onCancel={onClose}
      footer={null}
      width={800}
      centered
      closable={true}
      closeIcon={<CloseOutlined />}
      className="welcome-modal"
      maskClosable={true}
      destroyOnClose={false}
    >
      <div className="p-2">{getModalContent()}</div>
    </Modal>
  );
};

export default WelcomeModal;
